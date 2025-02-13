using System.Text.Json.Serialization;

namespace Speckles.Database.Tables;

public class User
{
    public string UserId { get; set; } = Guid.NewGuid().ToString();
    public string Username { get; set; }
    public string FullName { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
    
    public ICollection<Order> Purchases { get; set; }
    public ICollection<Recommendation> Recommendations { get; set; }
    public ICollection<BasketAsset> BasketAssets { get; set; }
    public ICollection<SavedAsset> SavedAssets { get; set; }
    public ICollection<StudioMember> Studios { get; set; }
    public ICollection<UserFollow> Following { get; set; }

    public string AddressId { get; set; }
    public virtual Address Address { get; set; }
}