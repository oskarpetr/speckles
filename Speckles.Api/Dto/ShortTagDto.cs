namespace Speckles.Api.Dto;

public class TagDto
{
    public string TagId { get; set; }
    public string Name { get; set; }
    public List<ShortAssetDto> Assets { get; set; }
}