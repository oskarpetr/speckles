namespace Speckles.Database.Tables;

public class Currency
{
    public string CurrencyId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
}