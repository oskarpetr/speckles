namespace Speckles.Database.Tables;

public class AssetTag
{
    public string AssetTagId { get; set; } = Guid.NewGuid().ToString();
    
    public string AssetId { get; set; }
    public virtual Asset Asset { get; set; }
    
    public string TagId { get; set; }
    public virtual Tag Tag { get; set; }
}