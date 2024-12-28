namespace Speckles.Api.Dto;

public class CommentDto
{
    public string CommentId { get; set; }
    public string Text { get; set; }
    public DateTimeOffset Date { get; set; }
    public UserShortDto Author { get; set; }
    public int Likes { get; set; }
    public bool Liked { get; set; }
}