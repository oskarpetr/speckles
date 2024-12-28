using Mapster;
using Microsoft.AspNetCore.Mvc;
using Speckles.Api.BodyModels;
using Speckles.Api.Dto;
using Speckles.Api.Lib;
using Speckles.Database;
using Speckles.Database.Tables;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class AuthController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public AuthController(ApplicationDbContext database)
    {
        _database = database;
    }

    /// <summary>
    /// Creates user.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a user.
    /// </remarks>
    /// <returns>This endpoint creates a user.</returns>
    /// <response code="201">This endpoint creates a user.</response>
    /// <response code="409">User with that username or email already exists.</response>
    [ProducesResponseType(201)]
    [ProducesResponseType(typeof(ApiError), 409)]
    [HttpPost(ApiEndpoints.Auth.REGISTER)]
    public IActionResult Register([FromBody] RegisterBody registerBody)
    {
        var usernameExists = _database.Users.Any(x => x.Username == registerBody.username);
        
        if (!usernameExists)
            return Conflict(new ApiError("Username", registerBody.username, 409));
        
        var emailExists = _database.Users.Any(x => x.Email == registerBody.email);
        
        if (!emailExists)
            return Conflict(new ApiError("Email", registerBody.email, 409));

        var address = new Address()
        {
            Country = registerBody.country,
            State = registerBody.state,
            Street = registerBody.street,
            City = registerBody.city,
            Zip = registerBody.zip
        };
            
        var user = new User()
        {
            FullName = registerBody.fullName,
            Email = registerBody.email,
            Username = registerBody.username,
            Password = registerBody.password,
            AddressId = address.AddressId
        };

        _database.Addresses.Add(address);
        _database.Users.Add(user);

        _database.SaveChanges();
        
        return Ok();
    }
    
    /// <summary>
    /// Validates user.
    /// </summary>
    /// <remarks>
    /// This endpoint validates a user.
    /// </remarks>
    /// <returns>This endpoint validates a user.</returns>
    /// <response code="201">This endpoint validates a user.</response>
    /// <response code="401">User's email or password is incorrect.</response>
    [ProducesResponseType(typeof(ApiResponse<UserShortDto>), 201)]
    [ProducesResponseType(typeof(ApiError), 401)]
    [HttpPost(ApiEndpoints.Auth.LOGIN)]
    public IActionResult Login([FromBody] LoginBody loginBody)
    {
        var user = _database.Users.FirstOrDefault(x => x.Email == loginBody.email);
        
        if (user == null)
            return Unauthorized();
        
        if(user.Password != loginBody.password)
            return Unauthorized();

        var shortUserDto = user.Adapt<UserShortDto>();
        var response = new ApiResponse(shortUserDto);
        
        return Ok(response);
    }
}