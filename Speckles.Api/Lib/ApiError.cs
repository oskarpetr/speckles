namespace Speckles.Api.Lib;

public class ApiError
{
    public int Status { get; set; }
    public string Title { get; set; }
    public string Detail { get; set; }
    
    public ApiError(string property, string value, int status = 404)
    {
        Status = status;
        Title = $"{property} was not found.";
        Detail = $"No {property.ToLower()} was found under: {value}.";
    }
}