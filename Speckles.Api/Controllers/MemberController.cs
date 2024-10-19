using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route("api/members")]
public class MemberController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public MemberController(ApplicationDbContext database)
    {
        _database = database;
    }

    [HttpGet]
    public IActionResult GetMembers()
    {
        var members = _database.Members
            .Include(x => x.Address)
            .Include(x => x.Studios)
                .ThenInclude(x => x.Studio)
            .ToList();
        
        return Ok(members);
    }
}