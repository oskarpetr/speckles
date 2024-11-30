namespace Speckles.Api.Lib;

public class ApiNotFound
{
    public int Status { get; set; } = 404;
    public string Title { get; set; }
    public string Detail { get; set; }
    
    public ApiNotFound(string property, string value)
    {
        Title = $"{property} not found.";
        Detail = $"No {property.ToLower()} found under: {value}.";
    }
}