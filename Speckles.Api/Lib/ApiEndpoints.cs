namespace Speckles.Api.Lib;

public static class ApiEndpoints
{
    public const string API_BASE = "api/" + VERSION + "/";
    private const string VERSION = "v1";
    
    public static class Assets
    {
        public const string GET_ASSETS = "assets";
        public const string POST_ASSET = "assets";

        public const string GET_ASSET = "assets/{assetId}";
        public const string PUT_ASSET = "assets/{assetId}";
        public const string DELETE_ASSET = "assets/{assetId}";
    }

    public static class Orders
    {
        public const string GET_ORDERS = "orders";
        public const string POST_ORDER = "orders";

        public const string GET_ORDER = "orders/{orderId}";
    }

    public static class Studios
    {
        public const string GET_STUDIOS = "studios";
        public const string POST_STUDIO = "studios";
        
        public const string GET_STUDIO = "studios/{slug}";
        public const string PUT_STUDIO = "studios/{slug}";
        public const string DELETE_STUDIO = "studios/{slug}";
        
        public const string POST_STUDIO_MEMBER = "studios/{slug}/members";
        public const string DELETE_STUDIO_MEMBER = "studios/{slug}/members";
        
        public const string GET_STUDIO_EARNINGS = "studios/{slug}/earnings";
    }

    public static class Users
    {
        public const string GET_USER = "users/{username}";
        public const string PUT_USER = "users/{username}";
        public const string DELETE_USER = "users/{username}";
    }

    public static class Saved
    {
        public const string GET_SAVED = "saved";
        public const string POST_SAVED = "saved";
    }

    public static class Basket
    {
        public const string GET_BASKET = "basket";
        public const string POST_BASKET = "basket";
    }

    public static class Auth
    {
        public const string REGISTER = "auth/register";
        public const string LOGIN = "auth/login";
    }

    public static class Tags
    {
        public const string POST_TAG = "tags";
        
        public const string GET_ASSETS = "tags/{tagId}";
    }

    public static class Comments
    {
        public const string POST_COMMENT = "comments";
        
        public const string PUT_COMMENT = "comments/{commentId}";
        public const string DELETE_COMMENT = "comments/{commentId}";
        
        public const string POST_LIKE = "comments/{commentId}/like";
    }

    public static class Promotions
    {
        public const string GET_PROMOTION = "promotion";
    }

    public static class Search
    {
        public const string GET_SEARCH = "search";
        public const string GET_SEARCH_PROMPTS = "search-prompts";
    }
    
    public static class Licenses
    {
        public const string GET_LICENSES = "licenses";
    }

    public static class Currencies
    {
        public const string GET_CURRENCIES = "currencies";
    }
}