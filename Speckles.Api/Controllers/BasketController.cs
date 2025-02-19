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
public class BasketController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public BasketController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    /// <summary>
    /// Retrieves all basket assets in short form by user id.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all basket assets in their short form by a user id.
    /// </remarks>
    /// <returns>Retrieves all basket assets in short form by user id.</returns>
    /// <response code="200">Retrieves all basket assets in short form by user id.</response>
    /// <response code="404">User was not found.</response>
    [ProducesResponseType(typeof(ApiResponse<List<AssetShortDto>>), 200)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpGet(ApiEndpoints.Basket.GET_BASKET)]
    public IActionResult GetBasket([FromQuery, Required] string userId, [FromQuery] string? format, [FromQuery] int? limit, [FromQuery] int? offset)
    {
        var userExists = _database.Users.Any(x => x.UserId == userId);
        
        if (!userExists)
            return NotFound(new ApiError("User", userId));

        var basketAssets = _database.BasketAssets
            .Include(x => x.Asset).ThenInclude(x => x.Thumbnail)
            .Include(x => x.Asset).ThenInclude(x => x.Currency)
            .Include(x => x.Asset).ThenInclude(x => x.Tags).ThenInclude(x => x.Tag)
            .Where(x => x.UserId == userId)
            .Select(x => x.Asset).ToList();

        if(offset != null)
            basketAssets = basketAssets.Skip(offset.Value).ToList();
            
        if(limit != null)
            basketAssets = basketAssets.Take(limit.Value).ToList();
        
        ApiResponse response;
        
        if (format == "count")
        {
            var count = new ApiCount(basketAssets);
            response = new ApiResponse(count);
        }
        else
        {
            var basketAssetsDto = basketAssets.Adapt<List<AssetShortDto>>();
            response = new ApiResponse(basketAssetsDto);
        }
        
        return Ok(response);
    }
    
    /// <summary>
    /// Creates basket asset for user id.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a basket asset for user id.
    /// </remarks>
    /// <returns>Creates basket asset for user id.</returns>
    /// <response code="201">Creates basket asset for user id.</response>
    /// <response code="404">User or asset was not found.</response>
    [ProducesResponseType(201)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPost(ApiEndpoints.Basket.POST_BASKET)]
    public IActionResult PostBasket([FromQuery, Required] string userId, [FromBody] PostAssetBody body)
    {
        var assetId = body.assetId;
        
        var userExists = _database.Users.Any(x => x.UserId == userId);
        var assetExists = _database.Assets.Any(x => x.AssetId == assetId);
        
        if(!userExists)
            return NotFound(new ApiError("User", userId));

        if (!assetExists)
            return NotFound(new ApiError("Asset", assetId));
        
        var basket = _database.BasketAssets.FirstOrDefault(x => x.UserId == userId && x.AssetId == assetId);

        if (basket != null)
        {
            _database.BasketAssets.Remove(basket);
        }
        else
        {
            _database.BasketAssets.Add(new BasketAsset()
            {
                UserId = userId,
                AssetId = assetId
            });
        }
        
        _database.SaveChanges();

        return Ok();
    }
}