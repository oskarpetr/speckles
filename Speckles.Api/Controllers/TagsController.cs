using Microsoft.AspNetCore.Mvc;
using Speckles.Api.Lib;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class TagsController : Controller
{
    private readonly DatabaseService _database;
    
    public TagsController(DatabaseService database)
    {
        _database = database;
    }
    
    /// <summary>
    /// Retrieves all assets in short form by tag id.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all assets in their short form by a tag id.
    /// </remarks>
    /// <returns>Retrieves all assets in short form by tag id.</returns>
    /// <response code="200">Retrieves all assets in short form by tag id.</response>
    /// <response code="404">Tag was not found.</response>
    // [ProducesResponseType(typeof(ApiResponse<TagDto>), 200)]
    // [ProducesResponseType(typeof(ApiError), 404)]
    [HttpGet(ApiEndpoints.Tags.GET_ASSETS)]
    public IActionResult GetAssetsByTag([FromRoute] string tagId, [FromQuery] int? limit, [FromQuery] int? offset)
    {
        var tagExists = _database.TagExists(tagId);
        
        if (!tagExists)
            return NotFound(new ApiError("Tag", tagId));
        
        var tag = _database.GetTag(tagId);
        var totalCount = tag.Assets.Count;

        if(offset != null)
            tag.Assets = tag.Assets.Skip(offset.Value).ToList();
            
        if(limit != null)
            tag.Assets = tag.Assets.Take(limit.Value).ToList();
        
        var response = new ApiResponse(tag, totalCount);
        
        return Ok(response);
    }
}