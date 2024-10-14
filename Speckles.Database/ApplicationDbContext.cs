using Microsoft.EntityFrameworkCore;
using Speckles.Database.Tables;

namespace Speckles.Database;

public class ApplicationDbContext : DbContext
{
    public DbSet<Address> Addresses { get; set; }
    public DbSet<Asset> Assets { get; set; }
    public DbSet<AssetTag> AssetsTags { get; set; }
    public DbSet<BasketAsset> BasketAssets { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Country> Countries { get; set; }
    public DbSet<Currency> Currencies { get; set; }
    public DbSet<CustomLicense> CustomLicenses { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<License> Licenses { get; set; }
    public DbSet<Member> Members { get; set; }
    public DbSet<Portfolio> Portfolios { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Purchase> Purchases { get; set; }
    public DbSet<Recommendation> Recommendations { get; set; }
    public DbSet<SavedAsset> SavedAssets { get; set; }
    public DbSet<Studio> Studios { get; set; }
    public DbSet<StudioMember> StudioMembers { get; set; }
    public DbSet<Tag> Tags { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    
    public ApplicationDbContext() 
    {
    }
}