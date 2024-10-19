using System.Text.Json.Serialization;

namespace Speckles.Database.Tables;

public class Studio
{
    public string StudioId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string ContactEmail { get; set; }
    public string Slug { get; set; }
    public Address Address { get; set; }
    public Portfolio Portfolio { get; set; }
    
    public ICollection<StudioMember> Members { get; set; }
    public ICollection<Asset> Assets { get; set; }
}