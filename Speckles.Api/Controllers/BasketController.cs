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
                .ThenInclude(x => x.Thumbnail)
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
    
    [HttpPost(ApiEndpoints.Members.POST_BASKET)]
    public IActionResult PostBasket([FromRoute] string memberId, [FromBody] SavedBody savedBody)
    {
        var assetId = savedBody.assetId;
        
        var memberExists = _database.Members.FirstOrDefault(x => x.MemberId == memberId);
        var assetExists = _database.Assets.FirstOrDefault(x => x.AssetId == assetId);
        
        if(memberExists == null || assetExists == null)
        {
            return NotFound();
        }
        
        var basketExists = _database.BasketAssets.FirstOrDefault(x => x.MemberId == memberId && x.AssetId == assetId);

        if (basketExists != null)
        {
            _database.BasketAssets.Remove(basketExists);
        }
        else
        {
            _database.BasketAssets.Add(new BasketAsset()
            {
                MemberId = memberId,
                AssetId = assetId
            });
        }
        
        _database.SaveChanges();

        return Ok();
    }
}