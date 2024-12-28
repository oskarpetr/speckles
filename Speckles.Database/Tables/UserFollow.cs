namespace Speckles.Database.Tables;

public class UserFollow
{
    public string UserFollowId { get; set; } = Guid.NewGuid().ToString();
    
    public string UserId { get; set; }
    public virtual Member User { get; set; }
    
    public string StudioId { get; set; }
    public virtual Studio Studio { get; set; }
}