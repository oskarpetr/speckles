using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
public class StudioController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public StudioController(ApplicationDbContext database)
    {
        _database = database;
    }

    // [EnableCors("ApiCors")]
    [HttpGet("api/studios")]
    public IActionResult GetStudios()
    {
        return Json(_database.Studios.Include(x => x.Address).Include(x => x.Portfolio).ToList());
    }
}