namespace Speckles.Api.BodyModels;

public class RegisterBody
{
    public string fullName { get; set; }
    public string email { get; set; }
    public string username { get; set; }
    public string password { get; set; }
    public string country { get; set; }
    public string state { get; set; }
    public string city { get; set; }
    public string zip { get; set; }
    public string street { get; set; }
}