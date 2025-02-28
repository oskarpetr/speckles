namespace Speckles.Api.BodyModels;

public class PostAssetBody
{
    public string slug { get; set; }
    public string assetId { get; set; }
    public string name { get; set; }
    public string description { get; set; }
    public decimal price { get; set; }
    public string currencyId { get; set; }
    public string licenseId { get; set; }
    public IEnumerable<FileBody> files { get; set; }
    public IEnumerable<ImageBody> images { get; set; }
    public IEnumerable<TagBody> tags { get; set; }
    public string thumbnailId { get; set; }
}