using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Api.Lib;
using Speckles.Database;

namespace Speckles.Api.Controllers;

[ApiController]
[Route(ApiEndpoints.API_BASE)]
public class TagController : Controller
{
    private readonly ApplicationDbContext _database;
    
    public TagController(ApplicationDbContext database)
    {
        _database = database;
    }
    
    [HttpGet(ApiEndpoints.Tags.GET_ASSETS)]
    public IActionResult GetAssetsByTag([FromRoute] string tagId, [FromQuery] int? limit, [FromQuery] int? offset)
    {
        var tag = _database.Tags
            .Include(x => x.Assets)
                .ThenInclude(x => x.Asset)
                    .ThenInclude(x => x.Thumbnail)
            .Include(x => x.Assets)
                .ThenInclude(x => x.Asset)
                    .ThenInclude(x => x.Currency)
            .Include(x => x.Assets)
                .ThenInclude(x => x.Asset)
                    .ThenInclude(x => x.Tags)
                        .ThenInclude(x => x.Tag)
            .FirstOrDefault(x => x.TagId == tagId);

        var tagDto = tag.Adapt<TagDto>();
    
        if(offset != null)
            tagDto.Assets = tagDto.Assets.Skip(offset.Value).ToList();
            
        if(limit != null)
            tagDto.Assets = tagDto.Assets.Take(limit.Value).ToList();
        
        var response = new ApiResponse(tagDto);
        
        return Ok(response);
    }
}