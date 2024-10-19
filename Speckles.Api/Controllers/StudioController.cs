using Mapster;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Database;
using Speckles.Database.Tables;

namespace Speckles.Api.Controllers;

[ApiController]
[Route("api/studios")]
public class StudioController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public StudioController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [HttpGet]
    public IActionResult GetStudios()
    {
        var studios = _database.Studios.ToList().Adapt<List<StudioDto>>();
        
        return Ok(studios);
    }

    [HttpGet("{slug}")]
    public IActionResult GetStudio(string slug)
    {
        var studioExists = _database.Studios.FirstOrDefault(x => x.Slug == slug);
        
        if (studioExists == null)
        {
            return NotFound();
        }
        
        var studio = _database.Studios
            .Include(x => x.Portfolio)
                .ThenInclude(x => x.Projects)
            .Include(x => x.Address)
            .Include(x => x.Assets)
            .Include(x => x.Members)
                .ThenInclude(x => x.Member)
            .FirstOrDefault(x => x.Slug == slug);

        return Ok(studio);
    }
}