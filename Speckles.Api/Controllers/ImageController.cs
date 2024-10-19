using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route("api/images")]
public class ImageController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public ImageController(ApplicationDbContext database)
    {
        _database = database;
    }

    [HttpGet]
    public IActionResult GetImages()
    {
        return Ok(_database.Images.ToList());
    }
}