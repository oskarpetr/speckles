namespace Speckles.Database.Tables;

public class Member
{
    public string MemberId { get; set; } = Guid.NewGuid().ToString();
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    
    public ICollection<Purchase> Purchases { get; set; }
    public ICollection<Recommendation> Recommendations { get; set; }
    public ICollection<BasketAsset> BasketAssets { get; set; }
    public ICollection<SavedAsset> SavedAssets { get; set; }
    public ICollection<StudioMember> Studios { get; set; }

    public string AddressId { get; set; }
    public virtual Address Address { get; set; }
}