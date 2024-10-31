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
    public ShortStudioDto Studio { get; set; }
    public CustomLicense? CustomLicense { get; set; }
    public List<ImageDto> Images { get; set; }
    public List<FileDto> Files { get; set; }
    public List<Tag> Tags { get; set; }
    public List<CommentDto> Comments { get; set; }
}