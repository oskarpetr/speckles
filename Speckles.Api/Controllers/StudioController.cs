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
public class StudioController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public StudioController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [HttpGet(ApiEndpoints.Studios.GET_STUDIOS)]
    public IActionResult GetStudios()
    {
        var studios = _database.Studios;

        ApiResponse response = new ApiResponse(studios.Adapt<List<ShortStudioDto>>());
        
        return Ok(response);
    }

    [HttpGet(ApiEndpoints.Studios.GET_STUDIO)]
    public IActionResult GetStudio(string slug)
    {
        var studioExists = _database.Studios.FirstOrDefault(x => x.Slug == slug);
        
        if (studioExists == null)
        {
            return NotFound();
        }
        
        var studio = _database.Studios
            .Include(x => x.Portfolio)
                .ThenInclude(x => x.Projects)
            .Include(x => x.Address)
            .Include(x => x.Assets)
                .ThenInclude(x => x.Images)
            .Include(x => x.Assets)
                .ThenInclude(x => x.Currency)
            .Include(x => x.Members)
                .ThenInclude(x => x.Member)
            .FirstOrDefault(x => x.Slug == slug);

        ApiResponse response = new ApiResponse(studio.Adapt<StudioDto>());
        
        return Ok(response);
    }
    
    [HttpGet]
    [Route(ApiEndpoints.Studios.GET_STUDIO_EARNING)]
    public IActionResult GetEarnings(string slug, [FromQuery] string timeInterval)
    {
        var studioExists = _database.Studios.FirstOrDefault(x => x.Slug == slug);
        
        if (studioExists == null)
        {
            return NotFound();
        }

        var orders = _database.Orders
            .Include(x => x.Asset)
                .ThenInclude(x => x.Currency)
            .Include(x => x.Asset)
                .ThenInclude(x => x.Images)
            .Where(x => x.Asset.Studio.Slug == slug);

        var ordersWithinInterval = orders;
        
        DateTime today = DateTime.Today;
        if (timeInterval == "1d")
        {
            ordersWithinInterval = orders.Where(x => x.Date == DateTime.Today);
        } else if (timeInterval == "1w")
        {
            DateTime interval7 = today.AddDays(-7);

            ordersWithinInterval = orders.Where(x => x.Date >= interval7 && x.Date <= today);
        } else if (timeInterval == "1m")
        {
            DateTime interval30 = today.AddDays(-30);

            ordersWithinInterval = orders.Where(x => x.Date >= interval30 && x.Date <= today);
        } else if (timeInterval == "1y")
        {
            DateTime interval365 = today.AddDays(-365);

            ordersWithinInterval = orders.Where(x => x.Date >= interval365 && x.Date <= today);
        } else if (timeInterval == "all time")
        {
            ordersWithinInterval = orders;
        }
        
        var earnings = ordersWithinInterval
            .GroupBy(p => p.Asset.Name)
            .Select(g => new EarningDto()
            {
                AssetName = g.Key,
                Ordered = g.Count(),
                Asset = g.First().Asset.Adapt<ShortAssetDto>(),
                TotalAmount = g.Sum(p => p.Asset.Price)
            });
        
        ApiResponse response = new ApiResponse(earnings);
        
        return Ok(response);
    }

    [HttpGet]
    [Route("gen")]
    public IActionResult Generate()
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

        string memberId = "0f44ee84-dcf2-483c-a084-102712b6b19e";

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
                MemberId = memberId,
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
                MemberId = memberId,
                PaymentMethod = randomPaymentMethod
            });
        }

        _database.SaveChanges();

        return Ok();
    }
}