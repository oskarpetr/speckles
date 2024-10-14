namespace Speckles.Database.Tables;

public class Asset
{
    public string AssetId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Currency { get; set; }
    public string Description { get; set; }
    public CustomLicense? CustomLicense { get; set; }

    public ICollection<Image> Images { get; set; }
    public ICollection<Comment> Comments { get; set; }
    
    public string LicenseId { get; set; }
    public virtual License License { get; set; }
    
    public string StudioId { get; set; }
    public virtual Studio Studio { get; set; }
}