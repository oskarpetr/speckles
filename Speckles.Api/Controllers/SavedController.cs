using System.ComponentModel.DataAnnotations;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.BodyModels;
using Speckles.Api.Dto;
using Speckles.Api.Lib;
using Speckles.Database;
using Speckles.Database.Tables;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class SavedController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public SavedController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    /// <summary>
    /// Retrieves all saved assets in short form by user id.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all saved assets in their short form by a user id.
    /// </remarks>
    /// <returns>Retrieves all saved assets in short form by user id.</returns>
    /// <response code="200">Retrieves all saved assets in short form by user id.</response>
    /// <response code="404">User was not found.</response>
    [ProducesResponseType(typeof(ApiResponse<List<AssetShortDto>>), 200)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpGet(ApiEndpoints.Saved.GET_SAVED)]
    public IActionResult GetSaved([FromQuery, Required] string userId, [FromQuery] string? format, [FromQuery] int? limit, [FromQuery] int? offset)
    {
        var userExists = _database.Users.Any(x => x.UserId == userId);
        
        if(!userExists)
            return NotFound(new ApiError("User", userId));

        var savedAssets = _database.SavedAssets
            .Include(x => x.Asset).ThenInclude(x => x.Thumbnail)
            .Include(x => x.Asset).ThenInclude(x => x.Currency)
            .Include(x => x.Asset).ThenInclude(x => x.Tags).ThenInclude(x => x.Tag)
            .Where(x => x.UserId == userId)
            .Select(x => x.Asset).ToList();
        
        if(offset != null)
            savedAssets = savedAssets.Skip(offset.Value).ToList();
            
        if(limit != null)
            savedAssets = savedAssets.Take(limit.Value).ToList();

        ApiResponse response;
        
        if (format == "count")
        {
            var count = new ApiCount(savedAssets);
            response = new ApiResponse(count);
        }
        else
        {
            var savedAssetsDto = savedAssets.Adapt<List<AssetShortDto>>();
            response = new ApiResponse(savedAssetsDto);
        }
        
        return Ok(response);
    }
    
    /// <summary>
    /// Creates saved asset for user id.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a saved asset for user id.
    /// </remarks>
    /// <returns>Creates saved asset for user id.</returns>
    /// <response code="201">Creates saved asset for user id.</response>
    /// <response code="404">User or asset was not found.</response>
    [ProducesResponseType(201)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPost(ApiEndpoints.Saved.POST_SAVED)]
    public IActionResult PostSaved([FromQuery, Required] string userId, [FromBody] SavedBody savedBody)
    {
        var assetId = savedBody.assetId;
        
        var userExists = _database.Users.Any(x => x.UserId == userId);
        var assetExists = _database.Assets.Any(x => x.AssetId == assetId);
        
        if(!userExists)
            return NotFound(new ApiError("User", userId));
        
        if(!assetExists)
            return NotFound(new ApiError("Asset", assetId));
        
        var saved = _database.SavedAssets.FirstOrDefault(x => x.UserId == userId && x.AssetId == assetId);

        if (saved != null)
        {
            _database.SavedAssets.Remove(saved);
        }
        else
        {
            _database.SavedAssets.Add(new SavedAsset()
            {
                UserId = userId,
                AssetId = assetId
            });
        }
        
        _database.SaveChanges();

        return Ok();
    }
}