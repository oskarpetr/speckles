namespace Speckles.Api.Dto;

public class UserDto
{
    public string MemberId { get; set; }
    public string Username { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public List<ShortStudioDto> Studios { get; set; }
    public List<ShortStudioDto> Following { get; set; }
    public ShortAddressDto ShortAddress { get; set; }
}