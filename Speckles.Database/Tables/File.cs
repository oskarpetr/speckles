namespace Speckles.Database.Tables;

public class File
{
    public string FileId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string FileName { get; set; }
    public long Size { get; set; }
    
    public string AssetId { get; set; }
    public virtual Asset Asset { get; set; }
}