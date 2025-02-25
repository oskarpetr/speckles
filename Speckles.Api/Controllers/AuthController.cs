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
    private readonly DatabaseService _database;
    
    public AuthController(DatabaseService database)
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
    public IActionResult Register([FromBody] PostRegisterBody body)
    {
        var usernameExists = _database.UserUsernameExists(body.username);
        
        if (usernameExists)
            return Conflict(new ApiError("Username", body.username, 409));

        var emailExists = _database.UserEmailExists(body.email);
        
        if (emailExists)
            return Conflict(new ApiError("Email", body.email, 409));

        _database.CreateUser(body);
        
        return NoContent();
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
    public IActionResult Login([FromBody] PostLoginBody body)
    {
        var user = _database.GetUserByEmail(body.email);
        
        if (user == null)
            return Unauthorized();
        
        var shortUserPasswordDto = user.Adapt<UserShortPasswordDto>();
        var response = new ApiResponse(shortUserPasswordDto);
        
        return Ok(response);
    }
}