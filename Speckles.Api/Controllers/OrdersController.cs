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
    
    /// <summary>
    /// Retrieves all orders in short form by member id.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all orders in their short form by a member id.
    /// </remarks>
    /// <returns>Retrieves all orders in short form by member id.</returns>
    /// <response code="200">Retrieves all orders in short form by member id.</response>
    /// <response code="404">Member was not found.</response>
    [ProducesResponseType(typeof(List<ShortOrderDto>), 200)]
    [ProducesResponseType(404)]
    [HttpGet(ApiEndpoints.Orders.GET_ORDERS)]
    public IActionResult GetOrders([FromQuery] string memberId, [FromQuery] string? format, [FromQuery] int? limit, [FromQuery] int? offset)
    {
        var memberExists = _database.Members.Any(x => x.MemberId == memberId);
        
        if(!memberExists)
            return NotFound();

        var orders = _database.Orders
            .Include(x => x.Asset)
                .ThenInclude(x => x.Thumbnail)
            .Include(x => x.Asset)
                .ThenInclude(x => x.Currency)
            .Include(x => x.Asset)
                .ThenInclude(x => x.Tags)
                    .ThenInclude(x => x.Tag)
            .Where(x => x.MemberId == memberId);

        if(offset != null)
            orders = orders.Skip(offset.Value);
        
        if(limit != null)
            orders = orders.Take(limit.Value);

        ApiResponse response;
        
        if (format == "count")
        {
            response = new ApiResponse(orders, true);
        }
        else
        {
            var shortOrdersDto = orders.Adapt<List<ShortOrderDto>>();
            response = new ApiResponse(shortOrdersDto);
        }
        
        return Ok(response);
    }
    
    /// <summary>
    /// Retrieves order in default form.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a order in its default form.
    /// </remarks>
    /// <returns>Retrieves order in default form.</returns>
    /// <response code="200">Retrieves order in default form.</response>
    /// <response code="404">Order was not found.</response>
    [ProducesResponseType(typeof(OrderDto), 200)]
    [ProducesResponseType(404)]
    [HttpGet(ApiEndpoints.Orders.GET_ORDER)]
    public IActionResult GetOrder([FromRoute] string orderId)
    {
        var orderExists = _database.Orders.Any(x => x.OrderId == orderId);
        
        if(!orderExists)
            return NotFound();

        var order = _database.Orders
            .Include(x => x.Asset).ThenInclude(x => x.CustomLicense)
            .Include(x => x.Asset).ThenInclude(x => x.Thumbnail)
            .Include(x => x.Asset).ThenInclude(x => x.Images)
            .Include(x => x.Asset).ThenInclude(x => x.Currency)
            .Include(x => x.Asset).ThenInclude(x => x.License)
            .Include(x => x.Asset).ThenInclude(x => x.Studio)
            .Include(x => x.Asset).ThenInclude(x => x.Comments)
            .Include(x => x.Asset).ThenInclude(x => x.Files)
            .Include(x => x.Asset).ThenInclude(x => x.Tags).ThenInclude(x => x.Tag)
            .FirstOrDefault(x => x.OrderId == orderId);
        
        var orderDto = order.Adapt<OrderDto>();
        var response = new ApiResponse(orderDto);
        
        return Ok(response);
    }
}