namespace Speckles.Api.Lib;

public class ApiCount
{
    public int Count { get; set; }

    public ApiCount(object data)
    {
        Count = new { Count = (data as IEnumerable<object>)?.Count() }?.Count ?? 0;
    }
}