using Microsoft.AspNetCore.Mvc;
using Speckles.Api.Lib;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class MembersController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public MembersController(ApplicationDbContext database)
    {
        _database = database;
    }
}