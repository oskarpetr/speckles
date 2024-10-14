namespace Speckles.Database.Tables;

public class Recommendation
{
    public string RecommendationId { get; set; } = Guid.NewGuid().ToString();
    public float Rate { get; set; }
    
    public string TagId { get; set; }
    public virtual Tag Tag { get; set; }
}