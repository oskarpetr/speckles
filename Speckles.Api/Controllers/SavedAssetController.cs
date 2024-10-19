using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route("api/saved")]
public class SavedAssetController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public SavedAssetController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [HttpGet]
    [Route("{memberId}")]
    public IActionResult GetSavedAssets(string memberId, [FromQuery] string? format)
    {
        var memberExists = _database.Members.FirstOrDefault(x => x.MemberId == memberId);
        
        if(memberExists == null)
        {
            return NotFound();
        }

        var savedAssets = _database.SavedAssets
            .Include(x => x.Asset)
            .ThenInclude(x => x.CustomLicense)

            .Include(x => x.Asset)
            .ThenInclude(x => x.Images)

            .Include(x => x.Asset)
            .ThenInclude(x => x.Currency)

            .Include(x => x.Asset)
            .ThenInclude(x => x.License)

            .Include(x => x.Asset)
            .ThenInclude(x => x.Studio)

            .Include(x => x.Asset)
            .ThenInclude(x => x.Comments)

            .Include(x => x.Asset)
            .ThenInclude(x => x.Tags)
            .ThenInclude(x => x.Tag)
            .Where(x => x.MemberId == memberId)
            .Select(x => x.Asset);

        if (format == "short")
        {
            return Ok(savedAssets.Adapt<List<ShortAssetDto>>());
        }
        
        return Ok(savedAssets.Adapt<List<AssetDto>>());
    }
}