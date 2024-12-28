using Microsoft.AspNetCore.Mvc;
using Speckles.Api.Lib;
using Speckles.Database;
using Speckles.Database.Tables;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class PromotionsController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public PromotionsController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    /// <summary>
    /// Retrieves promotion in default form.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a current promotion in their default form.
    /// </remarks>
    /// <returns>Retrieves promotion in default form</returns>
    /// <response code="200">Retrieves promotion in default form</response>
    [ProducesResponseType(typeof(ApiResponse<Promotion>), 200)]
    [HttpGet(ApiEndpoints.Promotions.GET_PROMOTION)]
    public IActionResult GetPromotion()
    {
        var promotions = _database.Promotions.ToList();
        var now = DateTimeOffset.Now;
        
        var promotion = promotions.FirstOrDefault(x => x.StartDate <= now && x.EndDate >= now);
        var response = new ApiResponse(promotion);
        
        return Ok(response);
    }
}
