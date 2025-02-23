namespace Speckles.Api.BodyModels;

public class PostCommentBody
{
    public string assetId { get; set; }
    public string text { get; set; }
    public string userId { get; set; }
}