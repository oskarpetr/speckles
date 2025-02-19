using Speckles.Api.Dto;
using Speckles.Database.Tables;

namespace Speckles.Api.BodyModels;

public class PostAssetBody
{
    public string slug { get; set; }
    public string assetId { get; set; }
    public string name { get; set; }
    public string description { get; set; }
    public int price { get; set; }
    public string currencyId { get; set; }
    public string licenseId { get; set; }
    public IEnumerable<FileBody> files { get; set; }
    public IEnumerable<ImageBody> images { get; set; }

    public IEnumerable<TagBody> tags { get; set; }
    public string thumbnailId { get; set; }
}

public class FileBody
{
    public string fileId { get; set; }
    public string name { get; set; }
    public string fileName { get; set; }
    public long size { get; set; }
}

public class ImageBody
{
    public string imageId { get; set; }
    public string alt { get; set; }
}

public class TagBody
{
    public string tagId { get; set; }
    public string name { get; set; }
}