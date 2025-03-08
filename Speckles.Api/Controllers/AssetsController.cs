using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Speckles.Api.BodyModels;
using Speckles.Api.Dto;
using Speckles.Api.Lib;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class AssetsController : Controller
{
    private readonly DatabaseService _database;
    
    public AssetsController(DatabaseService database)
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
    // [ProducesResponseType(typeof(ApiResponse<List<AssetShortDto>>), 200)]
    [HttpGet(ApiEndpoints.Assets.GET_ASSETS)]
    public IActionResult GetAssets([FromQuery] int? limit, [FromQuery] int? offset)
    {
        var assets = _database.GetAssets(limit ?? SearchController.PAGINATION_LIMIT);
        var response = new ApiResponse(assets);
        
        return Ok(response);
    }

    /// <summary>
    /// Retrieves asset in default form.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves an asset in its default form.
    /// </remarks>
    /// <returns>Retrieves asset in default form.</returns>
    /// <response code="200">Retrieves asset in default form.</response>
    /// <response code="404">Asset was not found.</response>
    // [ProducesResponseType(typeof(ApiResponse<List<AssetDto>>), 200)]
    // [ProducesResponseType(typeof(ApiError), 404)]
    [HttpGet(ApiEndpoints.Assets.GET_ASSET)]
    public IActionResult GetAsset(string assetId, [FromQuery] string? userId)
    {
        var assetExists = _database.AssetExists(assetId);
        
        if (!assetExists)
            return NotFound(new ApiError("Asset", assetId));

        if (!string.IsNullOrWhiteSpace(userId))
        {
            var userExists = _database.UserExists(userId);
            
            if (!userExists)
                return NotFound(new ApiError("User", userId));
        }

        var asset = _database.GetAsset(assetId, userId);

        var response = new ApiResponse(asset);
        
        return Ok(response);
    }

    /// <summary>
    /// Creates asset.
    /// </summary>
    /// <remarks>
    /// This endpoint creates an asset.
    /// </remarks>
    /// <returns>Creates asset.</returns>
    /// <response code="201">Creates asset.</response>
    // [ProducesResponseType(201)]
    [HttpPost(ApiEndpoints.Assets.POST_ASSET)]
    public IActionResult CreateAsset([FromBody, Required] PostAssetBody body)
    {
        _database.CreateAsset(body);
        
        return NoContent();
    }
    
    /// <summary>
    /// Updates asset.
    /// </summary>
    /// <remarks>
    /// This endpoint updates an asset.
    /// </remarks>
    /// <returns>Updates asset.</returns>
    /// <response code="204">Updates asset.</response>
    /// <response code="404">Asset was not found.</response>
    // [ProducesResponseType(204)]
    // [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPut(ApiEndpoints.Assets.PUT_ASSET)]
    public IActionResult UpdateAsset(string assetId, [FromBody, Required] PutAssetBody body)
    {
        var assetExists = _database.AssetExists(assetId);
        
        if (!assetExists)
            return NotFound(new ApiError("Asset", assetId));
        
        _database.UpdateAsset(assetId, body);
        
        return NoContent();
    }
    
    /// <summary>
    /// Deletes asset.
    /// </summary>
    /// <remarks>
    /// This endpoint deletes an asset.
    /// </remarks>
    /// <returns>Deletes asset.</returns>
    /// <response code="204">Deletes asset.</response>
    /// <response code="404">Asset was not found.</response>
    // [ProducesResponseType(204)]
    // [ProducesResponseType(typeof(ApiError), 404)]
    [HttpDelete(ApiEndpoints.Assets.DELETE_ASSET)]
    public IActionResult DeleteAsset(string assetId)
    {
        var assetExists = _database.AssetExists(assetId);
        
        if(!assetExists)
            return NotFound(new ApiError("Asset", assetId));

        _database.DeleteAsset(assetId);
        
        return NoContent();
    }
}