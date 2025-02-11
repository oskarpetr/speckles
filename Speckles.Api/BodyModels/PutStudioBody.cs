using Speckles.Database.Tables;

namespace Speckles.Api.BodyModels;

public class PutStudioBody
{
    public string? Name { get; set; }
    public string? ContactEmail { get; set; }
    public string? Slug { get; set; }
    public string? About { get; set; }
    public Address? Address { get; set; }
    public List<Project>? Projects { get; set; }
}