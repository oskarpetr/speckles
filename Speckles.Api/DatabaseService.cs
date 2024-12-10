using Mapster;
using Microsoft.EntityFrameworkCore;
using Speckles.Api.Dto;
using Speckles.Database;
using Speckles.Database.Tables;

namespace Speckles.Api;

public class DatabaseService
{
    private readonly ApplicationDbContext _database;
    
    public DatabaseService(ApplicationDbContext database)
    {
        _database = database;
    }

    public bool StudioExists(string slug)
    {
        return _database.Studios.Any(x => x.Slug == slug);
    }
    
    public List<Order> GetStudioEarnings(string slug)
    {
        return _database.Orders
            .Include(x => x.Asset).ThenInclude(x => x.Currency)
            .Include(x => x.Asset).ThenInclude(x => x.Thumbnail)
            .Include(x => x.Asset).ThenInclude(x => x.Images)
            .Where(x => x.Asset.Studio.Slug == slug)
            .ToList();
    }
    
    public List<ShortStudioDto> GetStudios()
    {
        return _database.Studios
            .ToList()
            
            // Studio -> ShortStudioDto
            .Adapt<List<ShortStudioDto>>();
    }
    
    public StudioDto GetStudio(string slug)
    {
        return _database.Studios
            .Include(x => x.Portfolio).ThenInclude(x => x.Projects)
            .Include(x => x.Address)
            .Include(x => x.Assets).ThenInclude(x => x.Thumbnail)
            .Include(x => x.Assets).ThenInclude(x => x.Images)
            .Include(x => x.Assets).ThenInclude(x => x.Tags).ThenInclude(x => x.Tag)
            .Include(x => x.Assets).ThenInclude(x => x.Currency)
            .Include(x => x.Members).ThenInclude(x => x.Member)
            
            // Search studio by slug
            .FirstOrDefault(x => x.Slug == slug)
            
            // Studio -> StudioDto
            .Adapt<StudioDto>();
    }
    
    public bool TagExists(string tagId)
    {
        return _database.Tags.Any(x => x.TagId == tagId);
    }

    public TagDto GetTag(string tagId)
    {
        return _database.Tags
            .Include(x => x.Assets).ThenInclude(x => x.Asset).ThenInclude(x => x.Thumbnail)
            .Include(x => x.Assets).ThenInclude(x => x.Asset).ThenInclude(x => x.Currency)
            .Include(x => x.Assets).ThenInclude(x => x.Asset).ThenInclude(x => x.Tags).ThenInclude(x => x.Tag)
            
            // Search tag by tagId
            .FirstOrDefault(x => x.TagId == tagId)
            
            // Tag -> TagDto
            .Adapt<TagDto>();
    }
}