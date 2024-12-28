namespace Speckles.Database.Tables;

public class UserLike
{
    public string UserLikeId { get; set; } = Guid.NewGuid().ToString();
    
    public string UserId { get; set; }
    public virtual User User { get; set; }
    
    public string CommentId { get; set; }
    public virtual Comment Comment { get; set; }
}