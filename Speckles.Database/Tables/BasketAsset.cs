namespace Speckles.Database.Tables;

public class BasketAsset
{
    public string BasketAssetId { get; set; } = Guid.NewGuid().ToString();
    
    public string AssetId { get; set; }
    public virtual Asset Asset { get; set; }

    public string MemberId { get; set; }
    public virtual Member Member { get; set; }
}