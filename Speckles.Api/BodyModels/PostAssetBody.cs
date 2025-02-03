using Speckles.Api.Dto;
using Speckles.Database.Tables;
using File = Speckles.Database.Tables.File;

namespace Speckles.Api.BodyModels;

public class PostAssetBody
{
    public string name { get; set; }
    public string description { get; set; }
    public int price { get; set; }
    public string currencyId { get; set; }
    public string licenseId { get; set; }
    public IEnumerable<FileDto> files { get; set; }
    public IEnumerable<ImageDto> images { get; set; }

    public IEnumerable<string> tags { get; set; }
    public IEnumerable<string> customTags { get; set; }
    public Image thumbnail { get; set; }
}