using System.ComponentModel.DataAnnotations;

namespace alina_backend.Modules.marketplace;

public record PaginationParams(
    [Range(1, int.MaxValue)] int PageNumber = 1,
    [Range(1, 100)] int PageSize = 10);

public record PagedResponse<T>(
    IEnumerable<T> Items,
    int TotalCount,
    int PageNumber,
    int PageSize)
{
    public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
}

public record Money(decimal Amount, string Currency);

public record CategoryDto(
    Guid Id, 
    string Name, 
    string NameAr, 
    string? Description, 
    string? DescriptionAr, 
    string? Icon, 
    Guid? ParentId,
    List<CategoryDto>? SubCategories = null);

public record CreateCategoryDto(
    [Required] string Name, 
    [Required] string NameAr, 
    string? Description, 
    string? DescriptionAr, 
    string? Icon, 
    Guid? ParentId);

public record GigDto(
    Guid Id,
    string Title,
    string Description,
    string? MainImage,
    List<string> GalleryImages,
    Guid CategoryId,
    string CategoryName,
    Guid SellerId,
    string SellerName,
    string SellerLevel,
    List<PackageDto> Packages,
    int DeliveryTimeInDays,
    double AverageRating,
    int ReviewCount,
    bool IsActive = true);

public record CreateGigDto(
    [Required][StringLength(150, MinimumLength = 10)] string Title,
    [Required][StringLength(5000, MinimumLength = 30)] string Description,
    [Required] Guid CategoryId,
    [Range(0.01, 999999.99)] decimal StartingPrice,
    [Range(1, 365)] int DeliveryTimeInDays,
    string? MainImage,
    List<string>? GalleryImages);

// --- Orders ---

public record OrderDto(
    Guid Id,
    Guid? GigId,
    string Title,
    Guid BuyerId,
    string BuyerName,
    Guid SellerId,
    string SellerName,
    Money Amount,
    string Status,
    DateTime? Deadline,
    string? DeliveryMessage,
    List<string>? AttachmentUrls,
    DateTime CreatedAt,
    decimal? PlatformFeePercentage,
    decimal? SellerReceives);

public record CreateOrderDto(
    [Required] Guid GigId,
    [Required] string PackageName,
    string? Requirements);

public record UpdateOrderStatusDto(
    [Required] OrderStatus Status);

public record DeliverOrderDto(
    string? DeliveryMessage,
    List<string>? AttachmentUrls);

public record CancelOrderDto(
    string? Reason);

// --- Reviews ---

public record ReviewDto(
    Guid Id,
    Guid? GigId,
    Guid OrderId,
    Guid ReviewerId,
    string ReviewerName,
    int Rating,
    string? Comment,
    DateTime CreatedAt);

public record CreateReviewDto(
    [Required] Guid OrderId,
    [Range(1, 5)] int Rating,
    string? Comment);

// --- User Tasks (Jobs) ---

public record UserTaskDto(
    Guid Id,
    string Title,
    string Description,
    string Type,
    string? Location,
    Money Budget,
    DateTime Deadline,
    string Status,
    Guid PosterId,
    string PosterName,
    Guid CategoryId,
    string CategoryName,
    Guid? AssignedTaskerId,
    int OfferCount,
    DateTime CreatedAt);

public record CreateUserTaskDto(
    [Required] string Title,
    [Required] string Description,
    TaskType Type,
    string? Location,
    decimal Budget,
    DateTime Deadline,
    Guid CategoryId);

// --- Offers (Bids) ---

public record OfferDto(
    Guid Id,
    Guid TaskId,
    Guid TaskerId,
    string TaskerName,
    Money Price,
    string Message,
    string Status,
    DateTime CreatedAt);

public record CreateOfferDto(
    [Required] Guid TaskId,
    [Required] decimal Price,
    [Required] string Message);

// --- Media ---

public record MediaDto(
    Guid Id,
    string FileName,
    string Url,
    string FileType,
    long FileSize,
    string UploadedBy,
    DateTime CreatedAt);

// --- Search Analytics ---

public record SearchAnalyticsDto(
    [Required] string SearchTerm);

public record TrendingSearchDto(
    string Term,
    int SearchCount,
    DateTime LastSearchedAt);

// --- Packages ---

public record PackageDto(
    Guid Id,
    string Name,
    string Description,
    Money Price,
    int DeliveryTimeInDays);

public record CreatePackageDto(
    [Required][StringLength(100, MinimumLength = 2)] string Name,
    [Required][StringLength(1000, MinimumLength = 10)] string Description,
    [Range(0.01, 999999.99)] decimal Price,
    string Currency = "USD",
    [Range(1, 365)] int DeliveryTimeInDays = 1);

public record UpdatePackageDto(
    [Required][StringLength(100, MinimumLength = 2)] string Name,
    [Required][StringLength(1000, MinimumLength = 10)] string Description,
    [Range(0.01, 999999.99)] decimal Price,
    string Currency = "USD",
    [Range(1, 365)] int DeliveryTimeInDays = 1);

// --- Gig Status Update ---

public record UpdateGigStatusDto(
    [Required] bool IsActive);

public enum GigStatus
{
    Draft = 0,
    Published = 1,
    Paused = 2,
    Deleted = 3
}
