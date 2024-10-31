using Microsoft.AspNetCore.Mvc;
using Speckles.Api.BodyModels;
using Speckles.Api.Lib;
using Speckles.Database;
using Speckles.Database.Tables;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class AuthController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public AuthController(ApplicationDbContext database)
    {
        _database = database;
    }

    [HttpPost(ApiEndpoints.Auth.REGISTER)]
    public IActionResult Register([FromBody] RegisterBody registerBody)
    {
        var usernameExists = _database.Members.FirstOrDefault(x => x.Username == registerBody.username);
        
        if (usernameExists != null)
        {
            return Conflict();
        }
        
        var emailExists = _database.Members.FirstOrDefault(x => x.Email == registerBody.email);
        
        if (emailExists != null)
        {
            return Conflict();
        }

        var address = new Address()
        {
            Country = registerBody.country,
            State = registerBody.state,
            Street = registerBody.street,
            City = registerBody.city,
            Zip = registerBody.zip
        };
            
        var member = new Member()
        {
            FullName = registerBody.fullName,
            Email = registerBody.email,
            Username = registerBody.username,
            Password = registerBody.password,
            AddressId = address.AddressId
        };

        _database.Addresses.Add(address);
        _database.Members.Add(member);

        _database.SaveChanges();
        
        return Ok();
    }
    
    [HttpPost(ApiEndpoints.Auth.LOGIN)]
    public IActionResult Login([FromBody] LoginBody loginBody)
    {
        var emailExists = _database.Members.FirstOrDefault(x => x.Email == loginBody.email);
        
        if (emailExists == null)
        {
            return NotFound();
        }
        
        if (emailExists.Password != loginBody.password)
        {
            return Unauthorized();
        }
        
        return Ok();
    }
}