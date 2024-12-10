namespace Speckles.Database.Tables;

public class UserLike
{
    public string UserLikeId { get; set; } = Guid.NewGuid().ToString();
    
    public string MemberId { get; set; }
    public virtual Member Member { get; set; }
    
    public string CommentId { get; set; }
    public virtual Comment Comment { get; set; }
}