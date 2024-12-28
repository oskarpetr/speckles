namespace Speckles.Api.Models;

public class AssetInteraction
{
    public List<string> LikedComments { get; set; } = new();
    public bool Saved { get; set; } = false;
    public bool InBasket { get; set; } = false;
}