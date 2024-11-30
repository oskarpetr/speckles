using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Api.Lib;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class AssetsController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public AssetsController(ApplicationDbContext database)
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
    [ProducesResponseType(typeof(List<ShortAssetDto>), 200)]
    [HttpGet(ApiEndpoints.Assets.GET_ASSETS)]
    public IActionResult GetAssets([FromQuery] int? limit, [FromQuery] int? offset)
    {
        var orders = _database.Orders;

        var assetIds = orders.Select(x => x.AssetId).Distinct();
        
        if (offset != null)
            assetIds = assetIds.Skip(offset.Value);
        
        if (limit != null)
            assetIds = assetIds.Take(limit.Value);

        var assets = _database.Assets
            .Where(x => assetIds.Contains(x.AssetId))
            .Include(x => x.Thumbnail)
            .Include(x => x.Currency)
            .Include(x => x.Tags)
                .ThenInclude(x => x.Tag)
            .ToList();

        var assetsDto = assets.Adapt<List<ShortAssetDto>>();
        var response = new ApiResponse(assetsDto);
        
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
    [ProducesResponseType(typeof(List<AssetDto>), 200)]
    [ProducesResponseType(404)]
    [HttpGet(ApiEndpoints.Assets.GET_ASSET)]
    public IActionResult GetAsset(string assetId, [FromQuery] string memberId)
    {
        var assetExists = _database.Assets.Any(x => x.AssetId == assetId);
        
        if (!assetExists)
            return NotFound();

        var asset = _database.Assets
            .Include(x => x.CustomLicense)
            .Include(x => x.Thumbnail)
            .Include(x => x.Images)
            .Include(x => x.Currency)
            .Include(x => x.License)
            .Include(x => x.Studio)
            .Include(x => x.Comments)
                .ThenInclude(x => x.Member)
            .Include(x => x.Comments)
                .ThenInclude(x => x.LikedBy)
                    .ThenInclude(x => x.Member)
            .Include(x => x.Files)
            .Include(x => x.Tags)
                .ThenInclude(x => x.Tag)
            .FirstOrDefault(x => x.AssetId == assetId);

        var assetDto = asset.Adapt<AssetDto>();

        var savedExists =
            _database.SavedAssets.FirstOrDefault(x => x.MemberId == memberId && x.AssetId == assetId);
        
        var basketExists =
            _database.BasketAssets.FirstOrDefault(x => x.MemberId == memberId && x.AssetId == assetId);
        
        for (int i = 0; i < assetDto.Comments.Count; i++)
        {
            var liked = asset?.Comments.ToList()[i].LikedBy.Any(x => x.MemberId == memberId);
            assetDto.Comments[i].Liked = liked ?? false;
        }
        
        assetDto.Saved = savedExists != null;
        assetDto.InBasket = basketExists != null;

        var response = new ApiResponse(assetDto);
        
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
    [ProducesResponseType(404)]
    [HttpPut(ApiEndpoints.Assets.PUT_ASSET)]
    public IActionResult UpdateAsset()
    {
        return Ok();
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
    [ProducesResponseType(404)]
    [HttpDelete(ApiEndpoints.Assets.DELETE_ASSET)]
    public IActionResult DeleteAsset(string assetId)
    {
        var asset = _database.Assets.FirstOrDefault(x => x.AssetId == assetId);
        
        if(asset == null)
            return NotFound();
        
        _database.Assets.Remove(asset);
        _database.SaveChanges();
        
        return Ok();
    }
}