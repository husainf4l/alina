namespace alina_backend.Modules.profiles;

public interface IImageStorageService
{
    Task<string> UploadImageAsync(Stream imageStream, string fileName, string folder);
    Task DeleteImageAsync(string imageUrl);
    Task<bool> ValidateImageAsync(Stream imageStream, long maxSizeBytes = 5242880); // 5MB default
}

// Local file storage implementation (for development)
// In production, replace with AWS S3, Azure Blob Storage, or Cloudinary
public class LocalImageStorageService : IImageStorageService
{
    private readonly string _uploadPath;
    private readonly ILogger<LocalImageStorageService> _logger;
    private readonly string _baseUrl;

    public LocalImageStorageService(IWebHostEnvironment env, IConfiguration configuration, ILogger<LocalImageStorageService> logger)
    {
        _uploadPath = Path.Combine(env.ContentRootPath, "uploads");
        _baseUrl = configuration["AppSettings:BaseUrl"] ?? "http://0.0.0.0:5601";
        _logger = logger;

        // Create uploads directory if it doesn't exist
        if (!Directory.Exists(_uploadPath))
        {
            Directory.CreateDirectory(_uploadPath);
        }
    }

    public async Task<string> UploadImageAsync(Stream imageStream, string fileName, string folder)
    {
        try
        {
            // Create folder if doesn't exist
            var folderPath = Path.Combine(_uploadPath, folder);
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }

            // Generate unique filename
            var extension = Path.GetExtension(fileName);
            var uniqueFileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(folderPath, uniqueFileName);

            // Save file
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageStream.CopyToAsync(fileStream);
            }

            // Return public URL
            var imageUrl = $"{_baseUrl}/uploads/{folder}/{uniqueFileName}";
            _logger.LogInformation("Image uploaded successfully: {ImageUrl}", imageUrl);

            return imageUrl;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to upload image: {FileName}", fileName);
            throw;
        }
    }

    public async Task DeleteImageAsync(string imageUrl)
    {
        try
        {
            // Extract file path from URL
            var uri = new Uri(imageUrl);
            var relativePath = uri.AbsolutePath.TrimStart('/');
            var filePath = Path.Combine(_uploadPath, relativePath.Replace("uploads/", ""));

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                _logger.LogInformation("Image deleted successfully: {ImageUrl}", imageUrl);
            }

            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to delete image: {ImageUrl}", imageUrl);
            // Don't throw - deletion failures shouldn't break the app
        }
    }

    public async Task<bool> ValidateImageAsync(Stream imageStream, long maxSizeBytes = 5242880)
    {
        try
        {
            // Check file size
            if (imageStream.Length > maxSizeBytes)
            {
                _logger.LogWarning("Image size {Size} exceeds maximum {MaxSize}", imageStream.Length, maxSizeBytes);
                return false;
            }

            // Check if it's a valid image (read header)
            imageStream.Position = 0;
            var buffer = new byte[8];
            await imageStream.ReadAsync(buffer, 0, 8);
            imageStream.Position = 0;

            // Check for common image format signatures
            // JPEG: FF D8 FF
            if (buffer[0] == 0xFF && buffer[1] == 0xD8 && buffer[2] == 0xFF)
                return true;

            // PNG: 89 50 4E 47
            if (buffer[0] == 0x89 && buffer[1] == 0x50 && buffer[2] == 0x4E && buffer[3] == 0x47)
                return true;

            // GIF: 47 49 46
            if (buffer[0] == 0x47 && buffer[1] == 0x49 && buffer[2] == 0x46)
                return true;

            // WebP: 52 49 46 46 ... 57 45 42 50
            if (buffer[0] == 0x52 && buffer[1] == 0x49 && buffer[2] == 0x46 && buffer[3] == 0x46)
                return true;

            _logger.LogWarning("Invalid image format");
            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating image");
            return false;
        }
    }
}
