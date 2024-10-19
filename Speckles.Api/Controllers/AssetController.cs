using Mapster;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route("api/assets")]
public class AssetController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public AssetController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [HttpGet]
    public IActionResult GetAssets([FromQuery] string? format)
    {
        var assets = _database.Assets
            .Include(x => x.CustomLicense)
            .Include(x => x.Images)
            .Include(x => x.Currency)
            .Include(x => x.License)
            .Include(x => x.Studio)
            .Include(x => x.Comments)
            .Include(x => x.Tags)
            .ThenInclude(x => x.Tag)
            .ToList();
        
        if (format == "short")
        {
            return Ok(assets.Adapt<List<ShortAssetDto>>());
        }
        
        return Ok(assets.Adapt<List<AssetDto>>());
    }

    [HttpGet("{assetId}")]
    public IActionResult GetAsset(string assetId)
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
            .Include(x => x.Tags)
                .ThenInclude(x => x.Tag)
            .FirstOrDefault(x => x.AssetId == assetId)
            .Adapt<AssetDto>();

        return Ok(asset);
    }
}