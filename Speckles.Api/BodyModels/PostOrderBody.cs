namespace Speckles.Api.BodyModels;

public class PostOrderBody
{
    public List<string> assetIds { get; set; }
    public string userId { get; set; }
    public string paymentMethod { get; set; }
}