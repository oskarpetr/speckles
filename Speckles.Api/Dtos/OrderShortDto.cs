using Speckles.Database.Tables;

namespace Speckles.Api.Dto;

public class OrderShortDto
{
    public string OrderId { get; set; }
    public DateTimeOffset Date { get; set; }
    public AssetShortDto Asset { get; set; }
}