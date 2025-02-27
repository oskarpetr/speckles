namespace Speckles.Api.Dto;

public class ProjectDto
{
    public string ProjectId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public bool Personal { get; set; }
    public string? Client { get; set; }
    public ImageDto Thumbnail {get;set;}
    public List<ImageDto> Images { get; set; }
}