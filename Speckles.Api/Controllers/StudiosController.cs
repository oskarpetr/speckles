using System.ComponentModel.DataAnnotations;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Speckles.Api.BodyModels;
using Speckles.Api.Dto;
using Speckles.Api.Lib;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class StudiosController : Controller
{
    private readonly DatabaseService _database;
    
    public StudiosController(DatabaseService database)
    {
        _database = database;
    }
    
    /// <summary>
    /// Retrieves all studios or user's studios in short form.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a list of all studios or user's studios in their short form.
    /// </remarks>
    /// <returns>Retrieves all studios or user's studios in short form.</returns>
    /// <response code="200">Retrieves all studios or user's studios in short form.</response>
    [ProducesResponseType(typeof(ApiResponse<List<StudioShortDto>>), 200)]
    [HttpGet(ApiEndpoints.Studios.GET_STUDIOS)]
    public IActionResult GetStudios([FromQuery] string? userId)
    {
        ApiResponse response;
        
        if(userId == null)
        {
            var studios = _database.GetStudios();
            response = new ApiResponse(studios);
        }
        else
        {
            var studios = _database.GetMemberStudios(userId);
            response = new ApiResponse(studios);
        }
        
        return Ok(response);
    }

    /// <summary>
    /// Retrieves studio in default form.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a studio in its default form.
    /// </remarks>
    /// <returns>Retrieves studio in default form.</returns>
    /// <response code="200">Retrieves studio in default form.</response>
    /// <response code="404">Studio was not found.</response>
    [ProducesResponseType(typeof(ApiResponse<StudioDto>), 200)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpGet(ApiEndpoints.Studios.GET_STUDIO)]
    public IActionResult GetStudio(string slug, [FromQuery] string? userId)
    {
        var studioExists = _database.StudioExists(slug);
        
        if (!studioExists)
            return NotFound(new ApiError("Studio", slug));
        
        var studio = _database.GetStudio(slug, userId);
        var response = new ApiResponse(studio);
        
        return Ok(response);
    }
    
    /// <summary>
    /// Creates studio.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a studio.
    /// </remarks>
    /// <returns>Creates studio.</returns>
    /// <response code="201">Creates studio.</response>
    [ProducesResponseType(201)]
    [HttpPost(ApiEndpoints.Studios.POST_STUDIO)]
    public IActionResult PostStudio([FromBody, Required] PostStudioBody body)
    {
        string studioId = _database.CreateStudio(body);
        ApiResponse response = new ApiResponse(new { studioId });
        
        return Ok(response);
    }
    
    /// <summary>
    /// Updates studio.
    /// </summary>
    /// <remarks>
    /// This endpoint updates a studio.
    /// </remarks>
    /// <returns>Updates studio.</returns>
    /// <response code="204">Updates studio.</response>
    /// <response code="404">Studio was not found.</response>
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPut(ApiEndpoints.Studios.PUT_STUDIO)]
    public IActionResult UpdateStudio(string slug, [FromBody, Required] PutStudioBody body)
    {
        var studioExists = _database.StudioExists(slug);
        
        if (!studioExists)
            return NotFound(new ApiError("Studio", slug));
        
        _database.UpdateStudio(slug, body);
        
        return NoContent();
    }

    /// <summary>
    /// Deletes studio.
    /// </summary>
    /// <remarks>
    /// This endpoint deletes a studio.
    /// </remarks>
    /// <returns>Deletes studio.</returns>
    /// <response code="204">Deletes studio.</response>
    /// <response code="404">Studio was not found.</response>
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpDelete(ApiEndpoints.Studios.DELETE_STUDIO)]
    public IActionResult DeleteStudio(string slug)
    {
        var studioExists = _database.StudioExists(slug);

        if (!studioExists)
            return NotFound(new ApiError("Studio", slug));
        
        _database.DeleteStudio(slug);

        return NoContent();
    }

    /// <summary>
    /// Retrieves studio's earnings.
    /// </summary>
    /// <remarks>
    /// This endpoint retrieves a studio's earnings.
    /// </remarks>
    /// <returns>Retrieves studio's earnings.</returns>
    /// <response code="200">Retrieves studio's earnings.</response>
    /// <response code="404">Studio was not found.</response>
    [ProducesResponseType(typeof(ApiResponse<List<EarningDto>>), 200)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpGet(ApiEndpoints.Studios.GET_STUDIO_EARNINGS)]
    public IActionResult GetStudioEarnings(string slug, [FromQuery, Required] string timeInterval)
    {
        var studioExists = _database.StudioExists(slug);
        
        if (!studioExists) 
            return NotFound(new ApiError("Studio", slug));

        var orders = _database.GetStudioEarnings(slug);

        var ordersWithinInterval = orders;
        
        DateTime today = DateTime.Today;
        if (timeInterval == "1d")
        {
            ordersWithinInterval = orders.Where(x => x.Date == DateTime.Today).ToList();
        }
        else if (timeInterval == "1w")
        {
            DateTime interval7 = today.AddDays(-7);
            ordersWithinInterval = orders.Where(x => x.Date >= interval7 && x.Date <= today).ToList();
        }
        else if (timeInterval == "1m")
        {
            DateTime interval30 = today.AddDays(-30);
            ordersWithinInterval = orders.Where(x => x.Date >= interval30 && x.Date <= today).ToList();
        }
        else if (timeInterval == "1y")
        {
            DateTime interval365 = today.AddDays(-365);
            ordersWithinInterval = orders.Where(x => x.Date >= interval365 && x.Date <= today).ToList();
        }
        else if (timeInterval == "all time")
        {
            ordersWithinInterval = orders;
        }
        
        var earnings = ordersWithinInterval
            .GroupBy(p => p.Asset.Name)
            .Select(g => new EarningDto()
            {
                AssetName = g.Key,
                Ordered = g.Count(),
                Asset = g.First().Asset.Adapt<AssetShortDto>(),
                TotalAmount = g.Sum(p => p.Asset.Price)
            });
        
        ApiResponse response = new ApiResponse(earnings);
        
        return Ok(response);
    }

    [HttpGet("gen")]
    public IActionResult Gen()
    {
        _database.Gen();
        return Ok();
    }
    
    /// <summary>
    /// Creates studio member.
    /// </summary>
    /// <remarks>
    /// This endpoint creates a studio member.
    /// </remarks>
    /// <returns>Creates studio member.</returns>
    /// <response code="201">Creates studio member.</response>
    /// <response code="404">Studio was not found.</response>
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpPost(ApiEndpoints.Studios.POST_STUDIO_MEMBER)]
    public IActionResult CreateStudioMember(string slug, [FromBody, Required] PostStudioMemberBody body)
    {
        var studioExists = _database.StudioExists(slug);
        
        if(!studioExists)
            return NotFound(new ApiError("Studio", slug));

        _database.CreateStudioMember(slug, body);
        
        return NoContent();
    }
    
    /// <summary>
    /// Deletes studio member.
    /// </summary>
    /// <remarks>
    /// This endpoint deletes a studio member.
    /// </remarks>
    /// <returns>Deletes studio member.</returns>
    /// <response code="204">Deletes studio member.</response>
    /// <response code="404">Studio was not found.</response>
    [ProducesResponseType(204)]
    [ProducesResponseType(typeof(ApiError), 404)]
    [HttpDelete(ApiEndpoints.Studios.DELETE_STUDIO_MEMBER)]
    public IActionResult DeleteStudioMember(string slug, [FromBody, Required] DeleteStudioMemberBody body)
    {
        var studioExists = _database.StudioExists(slug);
        
        if(!studioExists)
            return NotFound(new ApiError("Studio", slug));

        _database.DeleteStudioMember(slug, body);
        
        return NoContent();
    }
}