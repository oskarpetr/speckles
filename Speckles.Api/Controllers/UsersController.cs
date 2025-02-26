using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Speckles.Api.BodyModels;
using Speckles.Api.Dto;
using Speckles.Api.Lib;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class UsersController : Controller
{
    private readonly DatabaseService _database;
    
    public UsersController(DatabaseService database)
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
    [ProducesResponseType(typeof(ApiResponse<UserDto>), 200)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpGet(ApiEndpoints.Users.GET_USER)]
    public IActionResult GetUser([FromRoute] string username)
    {
        var userExists = _database.UserUsernameExists(username);
        
        if (!userExists)
            return NotFound(new ApiError("User", username));

        var user = _database.GetUser(username);
        var response = new ApiResponse(user);
        
        return Ok(response);
    }
    
    /// <summary>
    /// Updates user.
    /// </summary>
    /// <remarks>
    /// This endpoint updates a user.
    /// </remarks>
    /// <returns>Updates user.</returns>
    /// <response code="200">Updates user.</response>
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPut(ApiEndpoints.Users.PUT_USER)]
    public IActionResult PutUser([FromRoute] string username, [FromBody, Required] PutUserBody body)
    {
        var userExists = _database.UserUsernameExists(username);
        
        if (!userExists)
            return NotFound(new ApiError("User", username));
        
        _database.UpdateUser(username, body);
        
        return NoContent();
    }
    
    /// <summary>
    /// Deletes user.
    /// </summary>
    /// <remarks>
    /// This endpoint deletes a user.
    /// </remarks>
    /// <returns>Deletes user.</returns>
    /// <response code="200">Deletes user.</response>
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpDelete(ApiEndpoints.Users.DELETE_USER)]
    public IActionResult DeleteUser([FromRoute] string username)
    {
        var userExists = _database.UserUsernameExists(username);
        
        if (!userExists)
            return NotFound(new ApiError("User", username));
        
        _database.DeleteUser(username);
        
        return NoContent();
    }
}
