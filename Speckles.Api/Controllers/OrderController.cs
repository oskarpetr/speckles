using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route("api/orders")]
public class OrderController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public OrderController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [HttpGet]
    [Route("{memberId}")]
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
            .ThenInclude(x => x.Tags)
            .ThenInclude(x => x.Tag)
            .Where(x => x.MemberId == memberId);

        if (format == "short")
        {
            return Ok(orders.Adapt<List<ShortOrderDto>>());
        }
        
        return Ok(orders.Adapt<List<OrderDto>>());
    }
}