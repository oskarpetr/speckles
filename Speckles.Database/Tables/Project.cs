namespace Speckles.Database.Tables;

public class Project
{
    public string ProjectId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string Description { get; set; }
    public bool Personal { get; set; }
    public string? Client { get; set; }

    public ICollection<Image> Images { get; set; }
}