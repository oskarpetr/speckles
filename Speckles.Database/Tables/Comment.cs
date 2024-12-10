namespace Speckles.Database.Tables;

public class Comment
{
    public string CommentId { get; set; } = Guid.NewGuid().ToString();
    public string Text { get; set; }
    public DateTimeOffset Date { get; set; } = DateTimeOffset.UtcNow;
    
    public string MemberId { get; set; }
    public virtual Member Member { get; set; }
    public ICollection<UserLike> LikedBy { get; set; }
}