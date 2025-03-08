using Microsoft.AspNetCore.Mvc;
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
    
    /// <summary>
    /// Retrieves all licenses.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all licenses.
    /// </remarks>
    /// <returns>Retrieves all licenses.</returns>
    /// <response code="200">Retrieves all licenses.</response>
    // [ProducesResponseType(typeof(ApiResponse<List<License>>), 200)]
    [HttpGet(ApiEndpoints.Licenses.GET_LICENSES)]
    public IActionResult GetLicenses()
    {
        var licences = _database.GetLicenses();
        var response = new ApiResponse(licences);
        
        return Ok(response);
    }
}