namespace Speckles.Database.Tables;

public class Address
{
    public string AddressId { get; set; } = Guid.NewGuid().ToString();
    public string Street { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Zip { get; set; }
    public string Country { get; set; }
}