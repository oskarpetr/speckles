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
public class StudiosController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public StudioController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    /// <summary>
    /// Retrieves all studios in short form.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all studios in their short form.
    /// </remarks>
    /// <returns>Retrieves all studios in short form.</returns>
    /// <response code="200">Retrieves all studios in short form.</response>
    [ProducesResponseType(typeof(List<ShortStudioDto>), 200)]
    [HttpGet(ApiEndpoints.Studios.GET_STUDIOS)]
    public IActionResult GetStudios()
    {
        var studios = _database.Studios;
        var studiosDto = studios.Adapt<List<ShortStudioDto>>();

        var response = new ApiResponse(studiosDto);
        
        return Ok(response);
    }

    /// <summary>
    /// Retrieves studio in default form.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a studio in its default form.
    /// </remarks>
    /// <returns>Retrieves studio in default form.</returns>
    /// <response code="200">Retrieves studio in default form.</response>
    /// <response code="404">Studio was not found.</response>
    [ProducesResponseType(typeof(StudioDto), 200)]
    [ProducesResponseType(404)]
    [HttpGet(ApiEndpoints.Studios.GET_STUDIO)]
    public IActionResult GetStudio(string slug)
    {
        var studioExists = _database.Studios.Any(x => x.Slug == slug);
        
        if (!studioExists)
            return NotFound();
        
        var studio = _database.Studios
            .Include(x => x.Portfolio)
                .ThenInclude(x => x.Projects)
            .Include(x => x.Address)
            .Include(x => x.Assets)
                .ThenInclude(x =>x.Thumbnail)
            .Include(x => x.Assets)
                .ThenInclude(x => x.Images)
            .Include(x => x.Assets)
                .ThenInclude(x => x.Tags)
                    .ThenInclude(x => x.Tag)
            .Include(x => x.Assets)
                .ThenInclude(x => x.Currency)
            .Include(x => x.Members)
                .ThenInclude(x => x.Member)
            .FirstOrDefault(x => x.Slug == slug);

        var studioDto = studio.Adapt<StudioDto>();
        var response = new ApiResponse(studioDto);
        
        return Ok(response);
    }
    
    /// <summary>
    /// Creates studio.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a studio.
    /// </remarks>
    /// <returns>Creates studio.</returns>
    /// <response code="201">Creates studio.</response>
    [ProducesResponseType(201)]
    [HttpPost(ApiEndpoints.Studios.POST_STUDIO)]
    public IActionResult PostStudio()
    {
        return Ok();
    }
    
    /// <summary>
    /// Updates studio.
    /// </summary>
    /// <remarks>
    /// This endpoint updates a studio.
    /// </remarks>
    /// <returns>Updates studio.</returns>
    /// <response code="204">Updates studio.</response>
    /// <response code="404">Studio was not found.</response>
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    [HttpPost(ApiEndpoints.Studios.PUT_STUDIO)]
    public IActionResult UpdateStudio()
    {
        return Ok();
    }
    
    /// <summary>
    /// Deletes studio.
    /// </summary>
    /// <remarks>
    /// This endpoint deletes a studio.
    /// </remarks>
    /// <returns>Deletes studio.</returns>
    /// <response code="204">Deletes studio.</response>
    /// <response code="404">Studio was not found.</response>
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    [HttpPost(ApiEndpoints.Studios.DELETE_STUDIO)]
    public IActionResult DeleteStudio()
    {
        return Ok();
    }
    
    /// <summary>
    /// Retrieves studio's earnings.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a studio's earnings.
    /// </remarks>
    /// <returns>Retrieves studio's earnings.</returns>
    /// <response code="200">Retrieves studio's earnings.</response>
    /// <response code="404">Studio was not found.</response>
    [ProducesResponseType(typeof(List<EarningDto>), 200)]
    [ProducesResponseType(404)]
    [HttpGet(ApiEndpoints.Studios.GET_STUDIO_EARNINGS)]
    public IActionResult GetStudioEarnings(string slug, [FromQuery] string timeInterval)
    {
        var studioExists = _database.Studios.Any(x => x.Slug == slug);
        
        if (!studioExists) 
            return NotFound();

        var orders = _database.Orders
            .Include(x => x.Asset)
                .ThenInclude(x => x.Currency)
            .Include(x => x.Asset)
                .ThenInclude(x => x.Thumbnail)
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

    [HttpGet("gen")]
    public IActionResult Gen()
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