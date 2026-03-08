namespace alina_backend.Modules.profiles;

public interface IImageStorageService
{
    /// <summary>
    /// Uploads a profile image (avatar, cover) and returns its relative storage key.
    /// Profile images are always PUBLIC — served via CDN with permanent clean URLs.
    /// </summary>
    Task<string> UploadImageAsync(Stream imageStream, string fileName, string folder, string? userId = null);

    Task DeleteImageAsync(string imageKeyOrUrl);
    Task<bool> ValidateImageAsync(Stream imageStream, long maxSizeBytes = 5242880);

    /// <summary>
    /// Returns the public URL for a stored key.
    /// Local dev: direct HTTP URL. Production: permanent CDN URL (media.aqlaan.cloud).
    /// This is synchronous — no presigned URLs, no expiry, no async needed.
    /// </summary>
    string GetPublicUrl(string key);
}

// ---------------------------------------------------------------------------
// Local file storage (development only)
// ---------------------------------------------------------------------------
public class LocalImageStorageService : IImageStorageService
{
    private readonly string _uploadPath;
    private readonly ILogger<LocalImageStorageService> _logger;
    private readonly string _baseUrl;

    public LocalImageStorageService(IWebHostEnvironment env, IConfiguration configuration, ILogger<LocalImageStorageService> logger)
    {
        _uploadPath = Path.Combine(env.ContentRootPath, "uploads");
        // Prefer CdnBaseUrl so dev machines pointing at real S3 get correct CDN URLs
        _baseUrl = (configuration["AppSettings:CdnBaseUrl"] ?? configuration["AppSettings:BaseUrl"] ?? "http://localhost:5602").TrimEnd('/');
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

            var key = userId != null
                ? $"public/{userId}/{folder}/{uniqueFileName}"
                : $"public/{folder}/{uniqueFileName}";

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
                relativePath = uri.AbsolutePath.TrimStart('/').Replace("public/", "");
            }
            else
            {
                relativePath = imageKeyOrUrl.Replace("public/", "");
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
        await imageStream.ReadAsync(buffer.AsMemory(0, 8));
        imageStream.Position = 0;

        if (buffer[0] == 0xFF && buffer[1] == 0xD8 && buffer[2] == 0xFF) return true; // JPEG
        if (buffer[0] == 0x89 && buffer[1] == 0x50 && buffer[2] == 0x4E && buffer[3] == 0x47) return true; // PNG
        if (buffer[0] == 0x47 && buffer[1] == 0x49 && buffer[2] == 0x46) return true; // GIF
        if (buffer[0] == 0x52 && buffer[1] == 0x49 && buffer[2] == 0x46 && buffer[3] == 0x46) return true; // WebP

        _logger.LogWarning("Invalid image format");
        return false;
    }

    // Local dev: serve directly from the backend's static files
    public string GetPublicUrl(string key)
    {
        if (key.StartsWith("http://") || key.StartsWith("https://")) return key;
        return $"{_baseUrl}/{key}";
    }
}

// ---------------------------------------------------------------------------
// S3-backed image storage (production)
// Profile images are public — stored under "public/" prefix, served via CloudFront.
// ---------------------------------------------------------------------------
public class S3ImageStorageService : IImageStorageService
{
    private readonly Amazon.S3.IAmazonS3 _s3Client;
    private readonly string _bucketName;
    private readonly string _cdnBaseUrl;
    private readonly ILogger<S3ImageStorageService> _logger;

    public S3ImageStorageService(Amazon.S3.IAmazonS3 s3Client, IConfiguration configuration, ILogger<S3ImageStorageService> logger)
    {
        _s3Client = s3Client;
        _bucketName = configuration["AWS:BucketName"] ?? throw new ArgumentNullException("AWS:BucketName not configured");
        _cdnBaseUrl = (configuration["AppSettings:CdnBaseUrl"] ?? throw new ArgumentNullException("AppSettings:CdnBaseUrl not configured")).TrimEnd('/');
        _logger = logger;
    }

    public async Task<string> UploadImageAsync(Stream imageStream, string fileName, string folder, string? userId = null)
    {
        try
        {
            var extension = Path.GetExtension(fileName).ToLowerInvariant();
            var safeExtension = extension is ".jpg" or ".jpeg" or ".png" or ".gif" or ".webp" ? extension : ".jpg";

            // Always stored under "public/" — CloudFront serves this prefix
            var key = userId != null
                ? $"public/{userId}/{folder}/{Guid.NewGuid()}{safeExtension}"
                : $"public/{folder}/{Guid.NewGuid()}{safeExtension}";

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
                // No CannedACL — bucket policy grants CloudFront OAC read access to public/ prefix
            };

            await _s3Client.PutObjectAsync(request);
            _logger.LogInformation("S3 public image uploaded: {Key}", key);
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
            var key = imageKeyOrUrl.StartsWith("http://") || imageKeyOrUrl.StartsWith("https://")
                ? new Uri(imageKeyOrUrl).AbsolutePath.TrimStart('/')
                : imageKeyOrUrl;

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
        await imageStream.ReadAsync(buffer.AsMemory(0, 8));
        imageStream.Position = 0;

        if (buffer[0] == 0xFF && buffer[1] == 0xD8 && buffer[2] == 0xFF) return true; // JPEG
        if (buffer[0] == 0x89 && buffer[1] == 0x50 && buffer[2] == 0x4E && buffer[3] == 0x47) return true; // PNG
        if (buffer[0] == 0x47 && buffer[1] == 0x49 && buffer[2] == 0x46) return true; // GIF
        if (buffer[0] == 0x52 && buffer[1] == 0x49 && buffer[2] == 0x46 && buffer[3] == 0x46) return true; // WebP

        _logger.LogWarning("Invalid image format");
        return false;
    }

    /// <summary>
    /// Returns the permanent CDN URL — no AWS calls, no expiry, no async.
    /// Example: "public/uuid/avatars/abc.jpg" → "https://media.aqlaan.cloud/public/uuid/avatars/abc.jpg"
    /// </summary>
    public string GetPublicUrl(string key)
    {
        if (key.StartsWith("http://") || key.StartsWith("https://")) return key; // legacy pass-through
        return $"{_cdnBaseUrl}/{key}";
    }
}
