using Microsoft.EntityFrameworkCore;
using Speckles.Database.Tables;
using File = Speckles.Database.Tables.File;

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
    public DbSet<File> Files { get; set; }
    public DbSet<Image> Images { get; set; }
    public DbSet<License> Licenses { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Promotion> Promotions { get; set; }
    public DbSet<Recommendation> Recommendations { get; set; }
    public DbSet<SavedAsset> SavedAssets { get; set; }
    public DbSet<Studio> Studios { get; set; }
    public DbSet<StudioMember> StudioMembers { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<UserFollow> UserFollows { get; set; }
    public DbSet<UserLike> UserLikes { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // One asset has one thumbnail
        modelBuilder.Entity<Asset>()
            .HasOne(a => a.Thumbnail)
            .WithMany()
            .HasForeignKey(a => a.ThumbnailId)
            .OnDelete(DeleteBehavior.SetNull);

        // One asset has many images
        modelBuilder.Entity<Asset>()
            .HasMany(a => a.Images)
            .WithOne(i => i.Asset)
            .HasForeignKey(i => i.AssetId)
            .OnDelete(DeleteBehavior.Cascade);

        // One asset has many files
        modelBuilder.Entity<Asset>()
            .HasMany(a => a.Files)
            .WithOne(f => f.Asset)
            .HasForeignKey(f => f.AssetId)
            .OnDelete(DeleteBehavior.Cascade);
        
        // One project has one thumbnail
        modelBuilder.Entity<Project>()
            .HasOne(p => p.Thumbnail)
            .WithMany()
            .HasForeignKey(p => p.ThumbnailId)
            .OnDelete(DeleteBehavior.SetNull);

        // One project has many images
        modelBuilder.Entity<Project>()
            .HasMany(p => p.Images)
            .WithOne(i => i.Project)
            .HasForeignKey(i => i.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}