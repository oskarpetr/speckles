using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Speckles.Api.Dto;
using Speckles.Api.Lib;

namespace Speckles.Api.Controllers;

/// <remarks>
/// Manages operations related to assets.
/// </remarks>
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
    [ProducesResponseType(typeof(ApiResponse<List<ShortAssetDto>>), 200)]
    [HttpGet(ApiEndpoints.Assets.GET_ASSETS)]
    public IActionResult GetAssets([FromQuery] int? limit, [FromQuery] int? offset)
    {
        var orders = _database.GetOrders();

        var assetIds = orders.Select(x => x.AssetId).Distinct().ToList();
        
        if (offset != null)
            assetIds = assetIds.Skip(offset.Value).ToList();
        
        if (limit != null)
            assetIds = assetIds.Take(limit.Value).ToList();

        var assets = _database.GetAssets(assetIds);
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
    [ProducesResponseType(typeof(ApiResponse<List<AssetDto>>), 200)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpGet(ApiEndpoints.Assets.GET_ASSET)]
    public IActionResult GetAsset(string assetId, [FromQuery] string? memberId)
    {
        var assetExists = _database.AssetExists(assetId);
        
        if (!assetExists)
            return NotFound(new ApiError("Asset", assetId));

        if (!string.IsNullOrWhiteSpace(memberId))
        {
            var memberExists = _database.MemberExists(memberId);
            
            if (!memberExists)
                return NotFound(new ApiError("Member", memberId));
        }

        var asset = _database.GetAsset(assetId, memberId);

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
    [ProducesResponseType(201)]
    [HttpPost(ApiEndpoints.Assets.POST_ASSET)]
    public IActionResult CreateAsset()
    {
        return Ok();
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
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPut(ApiEndpoints.Assets.PUT_ASSET)]
    public IActionResult UpdateAsset(string assetId)
    {
        var assetExists = _database.AssetExists(assetId);
        
        if (!assetExists)
            return NotFound(new ApiError("Asset", assetId));
        
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
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpDelete(ApiEndpoints.Assets.DELETE_ASSET)]
    public IActionResult DeleteAsset(string assetId)
    {
        var assetExists = _database.AssetExists(assetId);
        
        if(!assetExists)
            return NotFound(new ApiError("Asset", assetId));

        _database.DeleteAsset(assetId);
        
        return Ok();
    }
}