using Speckles.Database.Tables;

namespace Speckles.Api.Dto;

public class StudioDto
{
    public string StudioId { get; set; }
    public string Name { get; set; }
    public string ContactEmail { get; set; }
    public string Slug { get; set; }
    public Address Address { get; set; }
    public Portfolio Portfolio { get; set; }
    public List<ShortMemberDto> Members { get; set; }
    public List<ShortAssetDto> Assets { get; set; }
}