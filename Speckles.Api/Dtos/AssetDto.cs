using Mapster;
using Speckles.Database.Tables;

namespace Speckles.Api.Dto;

public class AssetDto
{
    public string AssetId { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public Currency Currency { get; set; }
    public string Description { get; set; }
    public License License { get; set; }
    public StudioDto Studio { get; set; }
    public CustomLicenseDto? CustomLicense { get; set; }
    public ImageDto Thumbnail { get; set; }
    public List<ImageDto> Images { get; set; }
    public List<FileDto> Files { get; set; }
    public List<TagShortDto> Tags { get; set; }
    public List<CommentDto> Comments { get; set; }
    public bool Saved { get; set; }
    public bool InBasket { get; set; }
}