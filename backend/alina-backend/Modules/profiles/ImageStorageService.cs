namespace alina_backend.Modules.profiles;

public interface IImageStorageService
{
    Task<string> UploadImageAsync(Stream imageStream, string fileName, string folder, string? userId = null);
    Task DeleteImageAsync(string imageKeyOrUrl);
    Task<bool> ValidateImageAsync(Stream imageStream, long maxSizeBytes = 5242880); // 5MB default

    /// <summary>
    /// Returns a usable URL for the given key.
    /// Local: returns a direct HTTP URL. S3: returns a short-lived pre-signed URL.
    /// </summary>
    Task<string> GetPresignedUrlAsync(string key, int expiryMinutes = 60);
}

// ---------------------------------------------------------------------------
// Local file storage implementation (for development)
// In production, IImageStorageService is resolved to S3ImageStorageService.
// ---------------------------------------------------------------------------
public class LocalImageStorageService : IImageStorageService
{
    private readonly string _uploadPath;
    private readonly ILogger<LocalImageStorageService> _logger;
    private readonly string _baseUrl;

    public LocalImageStorageService(IWebHostEnvironment env, IConfiguration configuration, ILogger<LocalImageStorageService> logger)
    {
        _uploadPath = Path.Combine(env.ContentRootPath, "uploads");
        _baseUrl = configuration["AppSettings:BaseUrl"] ?? "http://localhost:5602";
        _logger = logger;

        if (!Directory.Exists(_uploadPath))
            Directory.CreateDirectory(_uploadPath);
    }

    public async Task<string> UploadImageAsync(Stream imageStream, string fileName, string folder, string? userId = null)
    {
        try
        {
            var subPath = userId != null ? Path.Combine(userId, folder) : folder;
            var folderPath = Path.Combine(_uploadPath, subPath);

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            var uniqueFileName = $"{Guid.NewGuid()}{extension}";
            var filePath = Path.Combine(folderPath, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
                await imageStream.CopyToAsync(fileStream);

            // Return relative key (same pattern as S3)
            var key = userId != null
                ? $"uploads/{userId}/{folder}/{uniqueFileName}"
                : $"uploads/{folder}/{uniqueFileName}";

            _logger.LogInformation("Local image saved: {Key}", key);
            return key;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to save local image: {FileName}", fileName);
            throw;
        }
    }

    public async Task DeleteImageAsync(string imageKeyOrUrl)
    {
        try
        {
            string relativePath;
            if (imageKeyOrUrl.StartsWith("http://") || imageKeyOrUrl.StartsWith("https://"))
            {
                var uri = new Uri(imageKeyOrUrl);
                relativePath = uri.AbsolutePath.TrimStart('/').Replace("uploads/", "");
            }
            else
            {
                relativePath = imageKeyOrUrl.Replace("uploads/", "");
            }

            var filePath = Path.Combine(_uploadPath, relativePath);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                _logger.LogInformation("Local image deleted: {Path}", filePath);
            }

            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to delete local image: {Key}", imageKeyOrUrl);
        }
    }

    public async Task<bool> ValidateImageAsync(Stream imageStream, long maxSizeBytes = 5242880)
    {
        if (imageStream.Length > maxSizeBytes)
        {
            _logger.LogWarning("Image size {Size} exceeds maximum {MaxSize}", imageStream.Length, maxSizeBytes);
            return false;
        }

        imageStream.Position = 0;
        var buffer = new byte[8];
        await imageStream.ReadAsync(buffer, 0, 8);
        imageStream.Position = 0;

        if (buffer[0] == 0xFF && buffer[1] == 0xD8 && buffer[2] == 0xFF) return true; // JPEG
        if (buffer[0] == 0x89 && buffer[1] == 0x50 && buffer[2] == 0x4E && buffer[3] == 0x47) return true; // PNG
        if (buffer[0] == 0x47 && buffer[1] == 0x49 && buffer[2] == 0x46) return true; // GIF
        if (buffer[0] == 0x52 && buffer[1] == 0x49 && buffer[2] == 0x46 && buffer[3] == 0x46) return true; // WebP

        _logger.LogWarning("Invalid image format");
        return false;
    }

    public Task<string> GetPresignedUrlAsync(string key, int expiryMinutes = 60)
    {
        // Local dev: just return the base URL + key as a direct URL
        var url = key.StartsWith("http") ? key : $"{_baseUrl}/{key}";
        return Task.FromResult(url);
    }
}

// ---------------------------------------------------------------------------
// S3-backed image storage service (Production)
// ---------------------------------------------------------------------------
public class S3ImageStorageService : IImageStorageService
{
    private readonly Amazon.S3.IAmazonS3 _s3Client;
    private readonly string _bucketName;
    private readonly string _region;
    private readonly ILogger<S3ImageStorageService> _logger;

    public S3ImageStorageService(Amazon.S3.IAmazonS3 s3Client, IConfiguration configuration, ILogger<S3ImageStorageService> logger)
    {
        _s3Client = s3Client;
        _bucketName = configuration["AWS:BucketName"] ?? throw new ArgumentNullException("AWS:BucketName not configured");
        _region = configuration["AWS:Region"] ?? "me-central-1";
        _logger = logger;
    }

    public async Task<string> UploadImageAsync(Stream imageStream, string fileName, string folder, string? userId = null)
    {
        try
        {
            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            var safeExtension = extension is ".jpg" or ".jpeg" or ".png" or ".gif" or ".webp" ? extension : ".jpg";

            // Organized S3 key: uploads/{userId}/{folder}/{uuid}.ext
            var key = userId != null
                ? $"uploads/{userId}/{folder}/{Guid.NewGuid()}{safeExtension}"
                : $"uploads/{folder}/{Guid.NewGuid()}{safeExtension}";

            var request = new Amazon.S3.Model.PutObjectRequest
            {
                BucketName = _bucketName,
                Key = key,
                InputStream = imageStream,
                ContentType = safeExtension switch
                {
                    ".jpg" or ".jpeg" => "image/jpeg",
                    ".png"            => "image/png",
                    ".gif"            => "image/gif",
                    ".webp"           => "image/webp",
                    _                 => "application/octet-stream"
                }
                // No CannedACL — public access is managed via the bucket policy
            };

            await _s3Client.PutObjectAsync(request);

            // Return only the relative key — not the full URL.
            // The frontend requests /api/media/image?key={key} which generates a pre-signed URL.
            _logger.LogInformation("S3 image uploaded: {Key}", key);
            return key;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to upload image to S3: {FileName}", fileName);
            throw;
        }
    }

    public async Task DeleteImageAsync(string imageKeyOrUrl)
    {
        try
        {
            string key;
            if (imageKeyOrUrl.StartsWith("http://") || imageKeyOrUrl.StartsWith("https://"))
            {
                var uri = new Uri(imageKeyOrUrl);
                key = uri.AbsolutePath.TrimStart('/');
            }
            else
            {
                key = imageKeyOrUrl;
            }

            await _s3Client.DeleteObjectAsync(_bucketName, key);
            _logger.LogInformation("S3 image deleted: {Key}", key);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to delete S3 image: {KeyOrUrl}", imageKeyOrUrl);
        }
    }

    public async Task<bool> ValidateImageAsync(Stream imageStream, long maxSizeBytes = 5242880)
    {
        if (imageStream.Length > maxSizeBytes)
        {
            _logger.LogWarning("Image size {Size} exceeds maximum {MaxSize}", imageStream.Length, maxSizeBytes);
            return false;
        }

        imageStream.Position = 0;
        var buffer = new byte[8];
        await imageStream.ReadAsync(buffer, 0, 8);
        imageStream.Position = 0;

        if (buffer[0] == 0xFF && buffer[1] == 0xD8 && buffer[2] == 0xFF) return true; // JPEG
        if (buffer[0] == 0x89 && buffer[1] == 0x50 && buffer[2] == 0x4E && buffer[3] == 0x47) return true; // PNG
        if (buffer[0] == 0x47 && buffer[1] == 0x49 && buffer[2] == 0x46) return true; // GIF
        if (buffer[0] == 0x52 && buffer[1] == 0x49 && buffer[2] == 0x46 && buffer[3] == 0x46) return true; // WebP

        _logger.LogWarning("Invalid image format");
        return false;
    }

    public Task<string> GetPresignedUrlAsync(string key, int expiryMinutes = 60)
    {
        var request = new Amazon.S3.Model.GetPreSignedUrlRequest
        {
            BucketName = _bucketName,
            Key = key,
            Expires = DateTime.UtcNow.AddMinutes(expiryMinutes),
            Verb = Amazon.S3.HttpVerb.GET
        };

        var url = _s3Client.GetPreSignedURL(request);
        _logger.LogInformation("Pre-signed URL generated for key: {Key}", key);
        return Task.FromResult(url);
    }
}
