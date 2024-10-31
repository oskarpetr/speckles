using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Api.Lib;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class OrderController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public OrderController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [HttpGet(ApiEndpoints.Orders.GET_ORDER)]
    public IActionResult GetOrder(string orderId)
    {
        var orderExists = _database.Orders.FirstOrDefault(x => x.OrderId == orderId);
        
        if(orderExists == null)
        {
            return NotFound();
        }

        var order = _database.Orders
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
            .FirstOrDefault(x => x.OrderId == orderId);
        
        ApiResponse response = new ApiResponse(order.Adapt<OrderDto>());
        
        return Ok(response);
    }
}