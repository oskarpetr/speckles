using Mapster;
using Speckles.Database.Tables;

namespace Speckles.Api.Dto;

public class ShortAssetDto
{
    public string AssetId { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public Currency Currency { get; set; }
    public ImageDto Thumbnail { get; set; }
    public List<ShortTagDto> Tags { get; set; }
}