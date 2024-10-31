using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Api.Lib;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class AssetController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public AssetController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [HttpGet(ApiEndpoints.Assets.GET_ASSETS)]
    public IActionResult GetAssets([FromQuery] string? format)
    {
        var assets = _database.Assets
            .Include(x => x.CustomLicense)
            .Include(x => x.Images)
            .Include(x => x.Currency)
            .Include(x => x.License)
            .Include(x => x.Studio)
            .Include(x => x.Comments)
            .Include(x => x.Files)
            .Include(x => x.Tags)
            .ThenInclude(x => x.Tag)
            .ToList();

        ApiResponse response;
        
        if (format == "short")
        {
            response = new ApiResponse(assets.Adapt<List<ShortAssetDto>>());
        }
        else
        {
            response = new ApiResponse(assets.Adapt<List<AssetDto>>());
        }
        
        return Ok(response);
    }

    [HttpGet(ApiEndpoints.Assets.GET_ASSET)]
    public IActionResult GetAsset(string assetId, [FromQuery] string? format)
    {
        var assetExists = _database.Assets.FirstOrDefault(x => x.AssetId == assetId);
        
        if (assetExists == null)
        {
            return NotFound();
        }

        var asset = _database.Assets
            .Include(x => x.CustomLicense)
            .Include(x => x.Images)
            .Include(x => x.Currency)
            .Include(x => x.License)
            .Include(x => x.Studio)
            .Include(x => x.Comments)
                .ThenInclude(x => x.Member)
            .Include(x => x.Files)
            .Include(x => x.Tags)
                .ThenInclude(x => x.Tag)
            .FirstOrDefault(x => x.AssetId == assetId);

        ApiResponse response = new ApiResponse(asset.Adapt<AssetDto>());
        
        return Ok(response);
    }
}