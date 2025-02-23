using Mapster;
using Speckles.Database.Tables;

namespace Speckles.Api.Dto;

public class AssetShortDto
{
    public string AssetId { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public Currency Currency { get; set; }
    public ImageDto Thumbnail { get; set; }
    public StudioShortDto Studio { get; set; }
    public List<TagShortDto> Tags { get; set; }
}