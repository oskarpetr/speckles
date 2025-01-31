using System.ComponentModel.DataAnnotations;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Speckles.Api.Dto;
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
    
    [HttpGet(ApiEndpoints.Currencies.GET_CURRENCIES)]
    public IActionResult GetCurrencies()
    {
        var currencies = _database.GetCurrencies();
        var response = new ApiResponse(currencies);
        
        return Ok(response);
    }
}