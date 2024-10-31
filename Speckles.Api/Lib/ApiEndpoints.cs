namespace Speckles.Api.Lib;

public static class ApiEndpoints
{
    public const string API_BASE = "api/" + VERSION + "/";
    private const string VERSION = "v1";
    
    public static class Assets
    {
        public const string GET_ASSETS = "assets";
        public const string GET_ASSET = "assets/{assetId}";
    }

    public static class Orders
    {
        public const string GET_ORDER = "orders/{orderId}";
    }

    public static class Studios
    {
        public const string GET_STUDIOS = "studios";
        public const string GET_STUDIO = "studios/{slug}";
        public const string GET_STUDIO_EARNING = "studios/{slug}/earning";
    }

    public static class Members
    {
        public const string GET_SAVED = "members/{memberId}/saved";
        public const string POST_SAVED = "members/{memberId}/saved";
        
        public const string GET_ORDERS = "members/{memberId}/orders";
        public const string POST_ORDER = "members/{memberId}/orders";
        
        public const string GET_BASKET = "members/{memberId}/basket";
        public const string POST_BASKET = "members/{memberId}/basket";
    }

    public static class Auth
    {
        public const string REGISTER = "register";
        public const string LOGIN = "login";
    }
}