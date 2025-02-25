using Speckles.Database.Tables;

namespace Speckles.Api.BodyModels;

public class PutStudioBody
{
    public string? Name { get; set; }
    public string? ContactEmail { get; set; }
    public string? Slug { get; set; }
    public string? About { get; set; }
    public string? country { get; set; }
    public string? state { get; set; }
    public string? city { get; set; }
    public string? zip { get; set; }
    public string? street { get; set; }
    public List<Project>? Projects { get; set; }
}