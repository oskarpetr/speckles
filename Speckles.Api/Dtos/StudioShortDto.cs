using Speckles.Database.Tables;

namespace Speckles.Api.Dto;

public class StudioShortDto
{
    public string StudioId { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
    public string ContactEmail { get; set; }
    public string PaymentEmail { get; set; }
}