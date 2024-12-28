namespace Speckles.Database.Tables;

public class Promotion
{
    public string PromotionId { get; set; } = Guid.NewGuid().ToString();
    public string Description { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset EndDate { get; set; }
}