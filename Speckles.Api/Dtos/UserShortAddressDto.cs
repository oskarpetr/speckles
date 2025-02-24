using Speckles.Database.Tables;

namespace Speckles.Api.Dto;

public class UserShortAddressDto
{
    public string UserId { get; set; }
    public string FullName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public Address Address { get; set; }
}