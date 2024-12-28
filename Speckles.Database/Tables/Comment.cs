namespace Speckles.Database.Tables;

public class Comment
{
    public string CommentId { get; set; } = Guid.NewGuid().ToString();
    public string Text { get; set; }
    public DateTimeOffset Date { get; set; } = DateTimeOffset.UtcNow;
    
    public string AuthorId { get; set; }
    public virtual User Author { get; set; }
    public ICollection<UserLike> LikedBy { get; set; }
}