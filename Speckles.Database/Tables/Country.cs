namespace Speckles.Database.Tables;

public class Country
{
    public string CountryId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
}