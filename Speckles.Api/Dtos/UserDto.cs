using Speckles.Database.Tables;

namespace Speckles.Api.Dto;

public class UserDto
{
    public string UserId { get; set; }
    public string Username { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public List<StudioShortDto> Studios { get; set; }
    public List<StudioShortDto> Following { get; set; }
    public Address Address { get; set; }
}