namespace Speckles.Database.Tables;

public class SavedAsset
{
    public string SavedAssetId { get; set; } = Guid.NewGuid().ToString();
    
    public string AssetId { get; set; }
    public virtual Asset Asset { get; set; }
    
    public string MemberId { get; set; }
    public virtual Member Member { get; set; }
}