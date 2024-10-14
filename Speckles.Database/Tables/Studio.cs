namespace Speckles.Database.Tables;

public class Studio
{
    public string StudioId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string ContactEmail { get; set; }
    public Address Address { get; set; }
    public Portfolio Portfolio { get; set; }
    public Image Logo { get; set; }
    
    public ICollection<StudioMember> Members { get; set; }
    public ICollection<Asset> Assets { get; set; }
}