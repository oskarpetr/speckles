namespace Speckles.Database.Tables;

public class StudioMember
{
    public string StudioMemberId { get; set; } = Guid.NewGuid().ToString();
    
    public string StudioId { get; set; }
    public virtual Studio Studio { get; set; }
    
    public string MemberId { get; set; }
    public virtual Member Member { get; set; }
}