namespace Speckles.Api.Dto;

public class CommentDto
{
    public string CommentId { get; set; }
    public string Text { get; set; }
    public DateTimeOffset Date { get; set; }
    public ShortMemberDto Member { get; set; }
}