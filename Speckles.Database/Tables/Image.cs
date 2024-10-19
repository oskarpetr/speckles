namespace Speckles.Database.Tables;

public class Image
{
    public string ImageId { get; set; } = Guid.NewGuid().ToString();
    public string Alt { get; set; }
    
    public string? AssetId { get; set; }
    public virtual Asset? Asset { get; set; }
    
    public string? ProjectId { get; set; }
    public virtual Project? Project { get; set; }
}