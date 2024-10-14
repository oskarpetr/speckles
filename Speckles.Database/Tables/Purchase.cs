namespace Speckles.Database.Tables;

public class Purchase
{
    public string PurchaseId { get; set; } = Guid.NewGuid().ToString();
    public DateTimeOffset Date { get; set; } = DateTimeOffset.UtcNow;
    public string PaymentMethod { get; set; }
    
    public string AssetId { get; set; }
    public virtual Asset Asset { get; set; }
    
    public string MemberId { get; set; }
    public virtual Member Member { get; set; }
}