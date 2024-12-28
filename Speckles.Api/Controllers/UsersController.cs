using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Api.Lib;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class UsersController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public UsersController(ApplicationDbContext database)
    {
        _database = database;
    }

    /// <summary>
    /// Retrieves user in short form.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a user in their short form.
    /// </remarks>
    /// <returns>Retrieves user in short form.</returns>
    /// <response code="200">Retrieves user in short form.</response>
    [ProducesResponseType(typeof(ApiResponse<UserShortDto>), 200)]
    [HttpGet(ApiEndpoints.Users.GET_USER)]
    public IActionResult GetUser([FromRoute] string username)
    {
        var userExists = _database.Users.Any(x => x.Username == username);
        
        if (!userExists)
            return NotFound(new ApiError("User", username));
        
        var user = _database.Users
            .Include(x => x.Following).ThenInclude(x => x.Studio)
            .Include(x => x.Studios).ThenInclude(x => x.Studio)
            .Include(x => x.Address)
            
            // Search user by username
            .FirstOrDefault(x => x.Username == username)
            
            // User -> UserDto
            .Adapt<UserDto>();
        
        var response = new ApiResponse(user);
        
        return Ok(response);
    }
}
