using Microsoft.AspNetCore.Mvc;
using Speckles.Api.Lib;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class ImagesController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public ImagesController(ApplicationDbContext database)
    {
        _database = database;
    }
}