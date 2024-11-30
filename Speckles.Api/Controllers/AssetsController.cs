using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Api.Lib;
using Speckles.Database;
using Speckles.Database.Tables;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class AssetsController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public AssetController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [HttpGet(ApiEndpoints.Assets.GET_ASSETS)]
    public IActionResult GetAssets([FromQuery] int? limit, [FromQuery] int? offset)
    {
        var orders = _database.Orders;

        var assetIds = orders
            .Select(x => x.AssetId)
            .GroupBy(x => x)
            .Select(x => x.First());
        
        if (offset != null)
            assetIds = assetIds.Skip(offset.Value);
        
        if (limit != null)
            assetIds = assetIds.Take(limit.Value);

        var assets = new List<Asset>();
        foreach (var assetId in assetIds)
        {
            var asset = _database.Assets
                .Include(x => x.Thumbnail)
                .Include(x => x.Currency)
                .Include(x => x.Tags)
                    .ThenInclude(x => x.Tag)
                .FirstOrDefault(x => x.AssetId == assetId);
            assets.Add(asset);
        }

        var assetsDto = assets.Adapt<List<ShortAssetDto>>();
        var response = new ApiResponse(assetsDto);
        
        return Ok(response);
    }

    [ProducesResponseType(typeof(List<AssetDto>), 200)]
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
}