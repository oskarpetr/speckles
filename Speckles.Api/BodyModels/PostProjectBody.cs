namespace Speckles.Api.BodyModels;

public class PostProjectBody
{
    public string slug { get; set; }
    public string projectId { get; set; }
    public string name { get; set; }
    public string description { get; set; }
    public bool personal { get; set; }
    public string client { get; set; }
    public string thumbnailId { get; set; }
    public List<ImageBody> images { get; set; }
}