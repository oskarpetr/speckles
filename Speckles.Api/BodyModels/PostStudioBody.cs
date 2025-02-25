namespace Speckles.Api.BodyModels;

public class PostStudioBody
{
    public string name { get; set; }
    public string slug { get; set; }
    public string about { get; set; }
    public string contactEmail { get; set; }
    public string paymentEmail { get; set; }
    public string country { get; set; }
    public string state { get; set; }
    public string city { get; set; }
    public string zip { get; set; }
    public string street { get; set; }
    public string defaultMember { get; set; }
}