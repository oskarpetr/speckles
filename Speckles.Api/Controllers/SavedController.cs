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
    /// Retrieves all saved assets in short form by member id.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all saved assets in their short form by a member id.
    /// </remarks>
    /// <returns>Retrieves all saved assets in short form by member id.</returns>
    /// <response code="200">Retrieves all saved assets in short form by member id.</response>
    /// <response code="404">Member was not found.</response>
    [ProducesResponseType(typeof(ApiResponse<List<ShortAssetDto>>), 200)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpGet(ApiEndpoints.Saved.GET_SAVED)]
    public IActionResult GetSaved([FromQuery, Required] string memberId, [FromQuery] string? format, [FromQuery] int? limit, [FromQuery] int? offset)
    {
        var memberExists = _database.Members.Any(x => x.MemberId == memberId);
        
        if(!memberExists)
            return NotFound(new ApiError("Member", memberId));

        var savedAssets = _database.SavedAssets
            .Include(x => x.Asset).ThenInclude(x => x.Thumbnail)
            .Include(x => x.Asset).ThenInclude(x => x.Currency)
            .Include(x => x.Asset).ThenInclude(x => x.Tags).ThenInclude(x => x.Tag)
            .Where(x => x.MemberId == memberId)
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
            var savedAssetsDto = savedAssets.Adapt<List<ShortAssetDto>>();
            response = new ApiResponse(savedAssetsDto);
        }
        
        return Ok(response);
    }
    
    /// <summary>
    /// Creates saved asset for member id.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a saved asset for member id.
    /// </remarks>
    /// <returns>Creates saved asset for member id.</returns>
    /// <response code="201">Creates saved asset for member id.</response>
    /// <response code="404">Member or asset was not found.</response>
    [ProducesResponseType(201)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPost(ApiEndpoints.Saved.POST_SAVED)]
    public IActionResult PostSaved([FromQuery, Required] string memberId, [FromBody] SavedBody savedBody)
    {
        var assetId = savedBody.assetId;
        
        var memberExists = _database.Members.Any(x => x.MemberId == memberId);
        var assetExists = _database.Assets.Any(x => x.AssetId == assetId);
        
        if(!memberExists)
            return NotFound(new ApiError("Member", memberId));
        
        if(!assetExists)
            return NotFound(new ApiError("Asset", assetId));
        
        var saved = _database.SavedAssets.FirstOrDefault(x => x.MemberId == memberId && x.AssetId == assetId);

        if (saved != null)
        {
            _database.SavedAssets.Remove(saved);
        }
        else
        {
            _database.SavedAssets.Add(new SavedAsset()
            {
                MemberId = memberId,
                AssetId = assetId
            });
        }
        
        _database.SaveChanges();

        return Ok();
    }
}