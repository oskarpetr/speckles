namespace Speckles.Database.Tables;

public class Studio
{
    public string StudioId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string ContactEmail { get; set; }
    public string PaymentEmail { get; set; }
    public string Slug { get; set; }
    public string About { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public Address Address { get; set; }
    
    public ICollection<Project> Projects { get; set; }
    public ICollection<StudioMember> Members { get; set; } = new List<StudioMember>();
    public ICollection<Asset> Assets { get; set; } = new List<Asset>();
}