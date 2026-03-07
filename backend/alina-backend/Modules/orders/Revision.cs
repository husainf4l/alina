using System.ComponentModel.DataAnnotations;
using alina_backend.Modules.users;

namespace alina_backend.Modules.orders;

public enum RevisionStatus
{
    Requested,
    Accepted,
    Rejected,
    Completed
}

public class Revision
{
    public int Id { get; set; }

    [Required]
    public int OrderId { get; set; }

    [Required]
    public Guid RequesterId { get; set; }
    public User? Requester { get; set; }

    [Required]
    public string Description { get; set; } = string.Empty;

    public string? Attachments { get; set; } // JSON array of attachment URLs

    public RevisionStatus Status { get; set; } = RevisionStatus.Requested;

    public string? ResolutionMessage { get; set; }

    public string? ResolutionAttachments { get; set; } // JSON array of resolution attachment URLs

    public DateTime RequestedAt { get; set; } = DateTime.UtcNow;

    public DateTime? RespondedAt { get; set; }
}