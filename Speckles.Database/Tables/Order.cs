namespace Speckles.Database.Tables;

public class Order
{
    public string OrderId { get; set; } = Guid.NewGuid().ToString();
    public DateTimeOffset Date { get; set; } = DateTimeOffset.UtcNow;
    public string PaymentMethod { get; set; }
    
    public string AssetId { get; set; }
    public virtual Asset Asset { get; set; }
    
    public string MemberId { get; set; }
    public virtual Member Member { get; set; }
}