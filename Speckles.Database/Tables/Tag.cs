namespace Speckles.Database.Tables;

public class Tag
{
    public string TagId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public ICollection<AssetTag> Assets { get; set; } = new List<AssetTag>();
}