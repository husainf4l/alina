namespace alina_backend.Modules.media;

public interface IStorageService
{
    /// <summary>
    /// Uploads a PUBLIC file (avatars, gig images, cover photos).
    /// Returns a relative key stored under the "public/" S3 prefix.
    /// The CDN (media.aqlaan.cloud) serves these as permanent, clean URLs — no expiry, SEO-friendly.
    /// </summary>
    Task<string> UploadPublicFileAsync(Stream fileStream, string fileName, string contentType, string folder);

    /// <summary>
    /// Uploads a PRIVATE file (order attachments, invoices, custom offer docs).
    /// Returns a relative key stored under the "private/" S3 prefix.
    /// These are served via short-lived presigned URLs — never exposed publicly.
    /// </summary>
    Task<string> UploadPrivateFileAsync(Stream fileStream, string fileName, string contentType, string folder);

    /// <summary>Deletes a file by its storage key or legacy full URL.</summary>
    Task DeleteFileAsync(string keyOrUrl);

    /// <summary>
    /// Returns a short-lived presigned URL for a PRIVATE key.
    /// Never call this for public keys — use the CDN URL instead.
    /// </summary>
    Task<string> GetPresignedUrlAsync(string key, int expiryMinutes = 60);

    /// <summary>
    /// Returns the permanent CDN URL for a PUBLIC key.
    /// Format: https://media.aqlaan.cloud/{key}
    /// </summary>
    string GetPublicUrl(string key);
}
