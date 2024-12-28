using System.Text.Json.Serialization;

namespace Speckles.Api.Lib;

public class ApiResponse
{
    public string RequestId { get; set; } = Guid.NewGuid().ToString();
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public int? TotalCount { get; set; }
    public object? Data { get; set; }

    public ApiResponse() { }

    public ApiResponse(object? data)
    {
        Data = data;
    }

    public ApiResponse(object? data, int totalCount)
    {
        Data = data;
        TotalCount = totalCount;
    }
}

public class ApiResponse<T> : ApiResponse
{
    public new T Data { get; set; }

    public ApiResponse(T data) : base(data)
    {
        Data = data;
    }
}