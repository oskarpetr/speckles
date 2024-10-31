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
public class MemberController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public MemberController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [HttpGet(ApiEndpoints.Members.GET_ORDERS)]
    public IActionResult GetOrders(string memberId, [FromQuery] string? format)
    {
        var memberExists = _database.Members.FirstOrDefault(x => x.MemberId == memberId);
        
        if(memberExists == null)
        {
            return NotFound();
        }

        var orders = _database.Orders
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
            .ThenInclude(x => x.Files)

            .Include(x => x.Asset)
            .ThenInclude(x => x.Tags)
            .ThenInclude(x => x.Tag)
            .Where(x => x.MemberId == memberId);

        ApiResponse response;
        
        if (format == "short")
        {
            response = new ApiResponse(orders.Adapt<List<ShortOrderDto>>());
        }
        else
        {
            response = new ApiResponse(orders.Adapt<List<OrderDto>>());
        }
        
        return Ok(response);
    }
    
    [HttpGet(ApiEndpoints.Members.GET_BASKET)]
    public IActionResult GetBasket(string memberId, [FromQuery] string? format)
    {
        var memberExists = _database.Members.FirstOrDefault(x => x.MemberId == memberId);
        
        if (memberExists == null)
        {
            return NotFound();
        }

        var basketAssets = _database.BasketAssets
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
            .ThenInclude(x => x.Files)
            
            .Include(x => x.Asset)
            .ThenInclude(x => x.Tags)
            .ThenInclude(x => x.Tag)
            .Where(x => x.MemberId == memberId)
            .Select(x => x.Asset);

        ApiResponse response;
        
        if (format == "short")
        {
            response = new ApiResponse(basketAssets.Adapt<List<ShortAssetDto>>());
        }
        else if (format == "count")
        {
            response = new ApiResponse(new
            {
                basketCount = basketAssets.Count()
            });
        }
        else
        {
            response = new ApiResponse(basketAssets.Adapt<List<AssetDto>>());
        }
        
        return Ok(response);
    }

    [HttpGet(ApiEndpoints.Members.GET_SAVED)]
    public IActionResult GetSaved(string memberId, [FromQuery] string? format)
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
            .ThenInclude(x => x.Files)
            
            .Include(x => x.Asset)
            .ThenInclude(x => x.Tags)
            .ThenInclude(x => x.Tag)
            .Where(x => x.MemberId == memberId)
            .Select(x => x.Asset);

        ApiResponse response;
        
        if (format == "short")
        {
            response = new ApiResponse(savedAssets.Adapt<List<ShortAssetDto>>());
        }
        else
        {
            response = new ApiResponse(savedAssets.Adapt<List<AssetDto>>());
        }
        
        return Ok(response);
    }
    
    [HttpPost(ApiEndpoints.Members.POST_SAVED)]
    public IActionResult PostSaved([FromQuery] string memberId, [FromBody] SavedBody savedBody)
    {
        var assetId = savedBody.assetId;
        
        var memberExists = _database.Members.FirstOrDefault(x => x.MemberId == memberId);
        var assetExists = _database.Assets.FirstOrDefault(x => x.AssetId == assetId);
        
        if(memberExists == null || assetExists == null)
        {
            return NotFound();
        }
        
        var savedAsset = _database.SavedAssets.FirstOrDefault(x => x.MemberId == memberId && x.AssetId == assetId);

        if (savedAsset != null)
        {
            _database.SavedAssets.Remove(savedAsset);
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