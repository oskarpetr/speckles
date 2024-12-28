namespace Speckles.Api.Dto;

public class EarningDto
{
    public string AssetName { get; set; }
    public AssetShortDto Asset { get; set; }
    public decimal TotalAmount { get; set; }
    public int Ordered { get; set; }
}