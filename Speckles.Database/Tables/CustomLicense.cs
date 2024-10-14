namespace Speckles.Database.Tables;

public class CustomLicense
{
    public string CustomLicenseId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string Description { get; set; }
    
    public string AssetId { get; set; }
    public virtual Asset Asset { get; set; }
}