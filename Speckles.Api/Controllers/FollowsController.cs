using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Speckles.Api.BodyModels;
using Speckles.Api.Lib;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class FollowsController : Controller
{
    private readonly DatabaseService _database;
    
    public FollowsController(DatabaseService database)
    {
        _database = database;
    }
    
    /// <summary>
    /// Creates user follow for user id.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a user follow for user id.
    /// </remarks>
    /// <returns>Creates user follow for user id.</returns>
    /// <response code="201">Creates user follow for user id.</response>
    /// <response code="404">User or studio was not found.</response>
    // [ProducesResponseType(201)]
    // [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPost(ApiEndpoints.Follow.POST_FOLLOW)]
    public IActionResult PostFollow([FromBody, Required] PostFollowBody body)
    {
        var userExists = _database.UserExists(body.userId);
        
        if (!userExists)
            return NotFound(new ApiError("User", body.userId));
        
        var studioExists = _database.StudioExists(body.slug);
        
        if (!studioExists)
            return NotFound(new ApiError("Studio", body.slug));

        _database.ToggleUserFollow(body);

        return NoContent();
    }
}