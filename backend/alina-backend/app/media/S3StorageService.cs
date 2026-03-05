using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using Microsoft.Extensions.Options;

namespace alina_backend.app.media;

public class S3StorageService : IStorageService
{
    private readonly IAmazonS3 _s3Client;
    private readonly string _bucketName;
    private readonly string _region;

    public S3StorageService(IAmazonS3 s3Client, IConfiguration configuration)
    {
        _s3Client = s3Client;
        _bucketName = configuration["AWS:BucketName"] ?? throw new ArgumentNullException("AWS:BucketName not configured");
        _region = configuration["AWS:Region"] ?? "me-central-1";
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType)
    {
        var key = $"{Guid.NewGuid()}-{fileName}";
        
        var uploadRequest = new TransferUtilityUploadRequest
        {
            InputStream = fileStream,
            Key = key,
            BucketName = _bucketName,
            ContentType = contentType
        };

        var fileTransferUtility = new TransferUtility(_s3Client);
        await fileTransferUtility.UploadAsync(uploadRequest);

        // Construct the public URL (Simplified - assuming public bucket or CloudFront prefix can be added here)
        return $"https://{_bucketName}.s3.{_region}.amazonaws.com/{key}";
    }

    public async Task DeleteFileAsync(string fileUrl)
    {
        var key = fileUrl.Split('/').Last();
        
        var deleteRequest = new DeleteObjectRequest
        {
            BucketName = _bucketName,
            Key = key
        };

        await _s3Client.DeleteObjectAsync(deleteRequest);
    }
}
