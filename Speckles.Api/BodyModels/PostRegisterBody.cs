namespace Speckles.Api.BodyModels;

public class PostRegisterBody
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
    public List<string> basketAssets { get; set; }
    public List<string> savedAssets { get; set; }
    public List<string> following { get; set; }
}