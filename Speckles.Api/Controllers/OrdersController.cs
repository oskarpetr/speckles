using System.ComponentModel.DataAnnotations;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Api.Lib;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class OrdersController : Controller
{
    private readonly ApplicationDbContext _database;
    private readonly DatabaseService _databaseService;
    
    public OrdersController(ApplicationDbContext database, DatabaseService databaseService)
    {
        _database = database;
        _databaseService = databaseService;
    }
    
    /// <summary>
    /// Retrieves all orders in short form by user id.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all orders in their short form by a user id.
    /// </remarks>
    /// <returns>Retrieves all orders in short form by user id.</returns>
    /// <response code="200">Retrieves all orders in short form by user id.</response>
    /// <response code="404">User was not found.</response>
    [ProducesResponseType(typeof(ApiResponse<List<OrderShortDto>>), 200)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpGet(ApiEndpoints.Orders.GET_ORDERS)]
    public IActionResult GetOrders([FromQuery, Required] string userId, [FromQuery] string? format, [FromQuery] int? limit, [FromQuery] int? offset)
    {
        var userExists = _database.Users.Any(x => x.UserId == userId);
        
        if(!userExists)
            return NotFound(new ApiError("User", userId));

        var orders = _database.Orders
            .Include(x => x.Asset).ThenInclude(x => x.Thumbnail)
            .Include(x => x.Asset).ThenInclude(x => x.Currency)
            .Include(x => x.Asset).ThenInclude(x => x.Tags).ThenInclude(x => x.Tag)
            .Where(x => x.UserId == userId)
            .ToList();

        var totalCount = orders.Count;
        
        if(offset != null)
            orders = orders.Skip(offset.Value).ToList();
        
        if(limit != null)
            orders = orders.Take(limit.Value).ToList();

        ApiResponse response;
        
        if (format == "count")
        {
            var count = new ApiCount(orders);
            response = new ApiResponse(count);
        }
        else
        {
            var shortOrdersDto = orders.Adapt<List<OrderShortDto>>();
            response = new ApiResponse(shortOrdersDto, totalCount);
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
    [ProducesResponseType(typeof(ApiResponse<OrderDto>), 200)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpGet(ApiEndpoints.Orders.GET_ORDER)]
    public IActionResult GetOrder([FromRoute] string orderId)
    {
        var orderExists = _database.Orders.Any(x => x.OrderId == orderId);
        
        if(!orderExists)
            return NotFound(new ApiError("Order", orderId));

        var order = _database.Orders
            .Include(x => x.Asset).ThenInclude(x => x.CustomLicense)
            .Include(x => x.Asset).ThenInclude(x => x.Images)
            .Include(x => x.Asset).ThenInclude(x => x.Currency)
            .Include(x => x.Asset).ThenInclude(x => x.License)
            .Include(x => x.Asset).ThenInclude(x => x.Studio)
            .Include(x => x.Asset).ThenInclude(x => x.Files)
            .FirstOrDefault(x => x.OrderId == orderId);
        // return Ok(new {order, orderExists, orderId});
        var orderDto = order.Adapt<OrderDto>();
        var response = new ApiResponse(orderDto);
        
        return Ok(response);
    }
    
    /// <summary>
    /// Creates order.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a order.
    /// </remarks>
    /// <returns>Creates order.</returns>
    /// <response code="201">Creates order.</response>
    [ProducesResponseType(201)]
    [HttpPost(ApiEndpoints.Orders.POST_ORDER)]
    public IActionResult PostOrder()
    {
        return Ok();
    }
}