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
    
    private const int SEARCH_PROMPTS_LIMIT = 5;
    public const int PAGINATION_LIMIT = 9;
    public const int PAGINATION_OFFSET = 0; 
    
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
    public IActionResult GetSearchPrompts([FromQuery] string query, [FromQuery] int? limit)
    {
        var assets = _database.GetSearchPrompts(query, limit ?? SEARCH_PROMPTS_LIMIT);
        var response = new ApiResponse(assets);
        
        return Ok(response);
    }
    
    /// <summary>
    /// Retrieves all assets in short form.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all assets in their short form.
    /// </remarks>
    /// <returns>Retrieves all assets in short form.</returns>
    /// <response code="200">Retrieves all assets in short form.</response>
    [ProducesResponseType(typeof(ApiResponse<List<AssetShortDto>>), 200)]
    [HttpGet(ApiEndpoints.Search.GET_SEARCH)]
    public IActionResult GetSearch([FromQuery] string query, [FromQuery] int? limit, [FromQuery] int? offset)
    {
        var assets = _database.GetSearch(query,
            limit ?? PAGINATION_LIMIT,
            offset ?? PAGINATION_OFFSET);
        var response = new ApiResponse(assets);
        
        return Ok(response);
    }
}