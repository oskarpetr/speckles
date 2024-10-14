namespace Speckles.Database.Tables;

public class Portfolio
{
    public string PortfolioId { get; set; } = Guid.NewGuid().ToString();
    public string About { get; set; }
    
    public ICollection<Project> Projects { get; set; }
}