namespace Speckles.Database.Tables;

public class License
{
    public string LicenseId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; }
    public string Description { get; set; }
}

public enum LicenseType
{
    PersonalUse,
    CommercialUse,
    ExtendedCommercialUse,
    RoyaltyFree,
    RightsManaged,
    ExclusiveRights,
    NonExclusiveRights,
    CreativeCommons,
    ResaleOrRedistribution,
    Custom
}