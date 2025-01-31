using System.ComponentModel.DataAnnotations;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Speckles.Api.Dto;
using Speckles.Api.Lib;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class LicensesController : Controller
{
    private readonly DatabaseService _database;
    
    public LicensesController(DatabaseService database)
    {
        _database = database;
    }
    
    [HttpGet(ApiEndpoints.Licenses.GET_LICENSES)]
    public IActionResult GetLicenses()
    {
        var licences = _database.GetLicenses();
        var response = new ApiResponse(licences);
        
        return Ok(response);
    }
}