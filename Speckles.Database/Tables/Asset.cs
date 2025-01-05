namespace Speckles.Database.Tables;

public class Asset
{
    public string AssetId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Description { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public Studio Studio { get; set; }
    public CustomLicense? CustomLicense { get; set; }
    public ICollection<Image> Images { get; set; } = new List<Image>();
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    public ICollection<AssetTag> Tags { get; set; } = new List<AssetTag>();
    public ICollection<File> Files { get; set; } = new List<File>();
    
    public string CurrencyId { get; set; }
    public Currency Currency { get; set; }
    
    public string LicenseId { get; set; }
    public virtual License License { get; set; }
    public string ThumbnailId { get; set; }
    public virtual Image Thumbnail { get; set; }
}