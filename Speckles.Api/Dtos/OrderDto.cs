using Speckles.Database.Tables;

namespace Speckles.Api.Dto;

public class OrderDto
{
    public string OrderId { get; set; }
    public DateTimeOffset Date { get; set; }
    public string PaymentMethod { get; set; }
    public AssetDto Asset { get; set; }
    public UserShortDto User { get; set; }
}