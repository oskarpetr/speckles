using Microsoft.AspNetCore.Mvc;
using Speckles.Api.Dto;
using Speckles.Api.Lib;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class SearchController : Controller
{
    private readonly DatabaseService _database;
    
    public SearchController(DatabaseService database)
    {
        _database = database;
    }
    
    /// <summary>
    /// Retrieves all assets in short form.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all assets in their short form.
    /// </remarks>
    /// <returns>Retrieves all assets in short form.</returns>
    /// <response code="200">Retrieves all assets in short form.</response>
    [ProducesResponseType(typeof(ApiResponse<List<string>>), 200)]
    [HttpGet(ApiEndpoints.Search.GET_SEARCH_PROMPTS)]
    public IActionResult GetSearchPrompts([FromQuery] string query, [FromQuery] int? take)
    {
        var assets = _database.GetSearchPrompts(query, take ?? 5);
        var response = new ApiResponse(assets);
        
        return Ok(response);
    }
}