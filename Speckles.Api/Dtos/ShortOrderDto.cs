using Speckles.Database.Tables;

namespace Speckles.Api.Dto;

public class ShortOrderDto
{
    public string OrderId { get; set; }
    public DateTimeOffset Date { get; set; }
    public ShortAssetDto Asset { get; set; }
}