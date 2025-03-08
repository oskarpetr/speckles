using Microsoft.AspNetCore.Mvc;
using Speckles.Api.Lib;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class CurrenciesController : Controller
{
    private readonly DatabaseService _database;
    
    public CurrenciesController(DatabaseService database)
    {
        _database = database;
    }
    
    /// <summary>
    /// Retrieves all currencies.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all currencies.
    /// </remarks>
    /// <returns>Retrieves all currencies.</returns>
    /// <response code="200">Retrieves all currencies.</response>
    // [ProducesResponseType(typeof(ApiResponse<List<Currency>>), 200)]
    [HttpGet(ApiEndpoints.Currencies.GET_CURRENCIES)]
    public IActionResult GetCurrencies()
    {
        var currencies = _database.GetCurrencies();
        var response = new ApiResponse(currencies);
        
        return Ok(response);
    }
}