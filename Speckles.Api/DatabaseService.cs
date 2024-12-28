using Mapster;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Api.Models;
using Speckles.Database;
using Speckles.Database.Tables;

namespace Speckles.Api;

public class DatabaseService
{
    private readonly ApplicationDbContext _database;
    
    public DatabaseService(ApplicationDbContext database)
    {
        _database = database;
    }
    
    public void DeleteAsset(string assetId)
    {
        var asset = _database.Assets.FirstOrDefault(x => x.AssetId == assetId);
        
        if (asset == null)
            return;
        
        _database.Assets.Remove(asset);
        _database.SaveChanges();
    }

    public bool UserExists(string memberId)
    {
        return _database.Users.Any(x => x.UserId == memberId);
    }
    
    public bool StudioExists(string slug)
    {
        return _database.Studios.Any(x => x.Slug == slug);
    }
    
    public List<Order> GetStudioEarnings(string slug)
    {
        return _database.Orders
            .Include(x => x.Asset).ThenInclude(x => x.Currency)
            .Include(x => x.Asset).ThenInclude(x => x.Thumbnail)
            .Include(x => x.Asset).ThenInclude(x => x.Images)
            .Where(x => x.Asset.Studio.Slug == slug)
            .ToList();
    }
    
    public List<StudioShortDto> GetStudios()
    {
        return _database.Studios
            .ToList()
            
            // Studio -> ShortStudioDto
            .Adapt<List<StudioShortDto>>();
    }
    
    public List<StudioShortDto> GetMemberStudios(string memberId) {
        return _database.Studios
            .Include(x => x.Members)
            
            // Search studios by memberId
            .Where(x => x.Members.Any(y => y.UserId == memberId))
            .ToList()
            
            // Studio -> ShortStudioDto
            .Adapt<List<StudioShortDto>>();
    }
    
    public StudioDto GetStudio(string slug)
    {
        return _database.Studios
            .Include(x => x.Portfolio).ThenInclude(x => x.Projects)
            .Include(x => x.Address)
            .Include(x => x.Assets).ThenInclude(x => x.Thumbnail)
            .Include(x => x.Assets).ThenInclude(x => x.Images)
            .Include(x => x.Assets).ThenInclude(x => x.Tags).ThenInclude(x => x.Tag)
            .Include(x => x.Assets).ThenInclude(x => x.Currency)
            .Include(x => x.Members).ThenInclude(x => x.User)
            
            // Search studio by slug
            .FirstOrDefault(x => x.Slug == slug)
            
            // Studio -> StudioDto
            .Adapt<StudioDto>();
    }
    
    public bool TagExists(string tagId)
    {
        return _database.Tags.Any(x => x.TagId == tagId);
    }

    public TagDto GetTag(string tagId)
    {
        return _database.Tags
            .Include(x => x.Assets).ThenInclude(x => x.Asset).ThenInclude(x => x.Thumbnail)
            .Include(x => x.Assets).ThenInclude(x => x.Asset).ThenInclude(x => x.Currency)
            .Include(x => x.Assets).ThenInclude(x => x.Asset).ThenInclude(x => x.Tags).ThenInclude(x => x.Tag)
            
            // Search tag by tagId
            .FirstOrDefault(x => x.TagId == tagId)
            
            // Tag -> TagDto
            .Adapt<TagDto>();
    }

    public List<Order> GetOrders()
    {
        return _database.Orders.ToList();
    }
    
    public List<AssetShortDto> GetAssets(List<string> assetIds)
    {
        return _database.Assets
            .Where(x => assetIds.Contains(x.AssetId))
            .Include(x => x.Thumbnail)
            .Include(x => x.Currency)
            .Include(x => x.Tags).ThenInclude(x => x.Tag)
            .ToList()
            
            // Asset -> ShortAssetDto
            .Adapt<List<AssetShortDto>>();
    }
    
    public bool AssetExists(string assetId)
    {
        return _database.Assets.Any(x => x.AssetId == assetId);
    }
    
    public AssetDto GetAsset(string assetId, string? memberId)
    {
        var asset = _database.Assets
            .Include(x => x.CustomLicense)
            .Include(x => x.Thumbnail)
            .Include(x => x.Images)
            .Include(x => x.Currency)
            .Include(x => x.License)
            .Include(x => x.Studio).ThenInclude(x => x.Members).ThenInclude(x => x.User)
            .Include(x => x.Studio).ThenInclude(x => x.Address)
            .Include(x => x.Studio).ThenInclude(x => x.Portfolio).ThenInclude(x => x.Projects)
            .Include(x => x.Comments).ThenInclude(x => x.Author)
            .Include(x => x.Comments).ThenInclude(x => x.LikedBy).ThenInclude(x => x.User)
            .Include(x => x.Files)
            .Include(x => x.Tags).ThenInclude(x => x.Tag)
            
            // Search asset by assetId
            .FirstOrDefault(x => x.AssetId == assetId)

            // Asset -> AssetDto
            .Adapt<AssetDto>();
        
        if (string.IsNullOrEmpty(memberId))
            return asset;
        
        var assetInteraction = AssetInteraction(assetId, memberId);

        foreach (var comment in asset.Comments)
            comment.Liked = assetInteraction.LikedComments.Contains(comment.CommentId);
        
        asset.Saved = assetInteraction.Saved;
        asset.InBasket = assetInteraction.InBasket;

        return asset;
    }

    AssetInteraction AssetInteraction(string assetId, string memberId)
    {
        var asset = _database.Assets
            .Include(x => x.Comments).ThenInclude(x => x.LikedBy)
            
            // Search asset by assetId
            .FirstOrDefault(x => x.AssetId == assetId);
        
        if(asset == null)
            return new AssetInteraction();
        
        var savedExists =
            _database.SavedAssets.FirstOrDefault(x =>
                x.UserId == memberId && x.AssetId == assetId);
        
        var basketExists =
            _database.BasketAssets.FirstOrDefault(x =>
                x.UserId == memberId && x.AssetId == assetId);

        var likedComments = new List<string>();
        foreach (var comment in asset.Comments)
        {
            var liked = comment.LikedBy.Any(x => x.UserId == memberId);
            if (liked) likedComments.Add(comment.CommentId);
        }
        
        return new AssetInteraction()
        {
            LikedComments = likedComments,
            Saved = savedExists != null,
            InBasket = basketExists != null
        };
    }
    
    public void Gen()
    {
        string[] assetIds = new string[]
        {
            "87d14f19-69e7-4340-b80d-152e6006d178",
            "dea96a97-8511-4782-b005-57b60f05b551",
            "198fc68b-dc01-4158-9ab3-b1e84a259c73"
        };
    
        string[] paymentMethods = new string[]
        {
            "Stripe",
            "PayPal"
        };
    
        string userId = "0f44ee84-dcf2-483c-a084-102712b6b19e";
    
        // Starting date: 100 days ago from today
        DateTime startDate = DateTime.Today.AddDays(-400);
    
        // Generate 100 entries, one for each day
        for (int i = 0; i < 400; i++)
        {
            // Calculate the date for each entry
            DateTime orderDate = startDate.AddDays(i);
    
            // Alternate between the AssetIds and PaymentMethods
            string randomAssetId = assetIds[i % assetIds.Length];  // Cycle through assetIds
            string randomPaymentMethod = paymentMethods[i % paymentMethods.Length];  // Cycle through paymentMethods
    
            // Create and add the new order to the database
            _database.Orders.Add(new Order()
            {
                Date = orderDate,
                AssetId = randomAssetId,
                UserId = userId,
                PaymentMethod = randomPaymentMethod
            });
        }
        
        DateTime startDate2 = DateTime.Today.AddDays(-400);
    
        // Generate 100 entries, one for each day
        for (int i = 0; i < 400; i++)
        {
            // Calculate the date for each entry
            DateTime orderDate = startDate2.AddDays(i);
    
            // Alternate between the AssetIds and PaymentMethods
            string randomAssetId = assetIds[i % assetIds.Length];  // Cycle through assetIds
            string randomPaymentMethod = paymentMethods[i % paymentMethods.Length];  // Cycle through paymentMethods
    
            // Create and add the new order to the database
            _database.Orders.Add(new Order()
            {
                Date = orderDate,
                AssetId = randomAssetId,
                UserId = userId,
                PaymentMethod = randomPaymentMethod
            });
        }
    
        _database.SaveChanges();
    }
}