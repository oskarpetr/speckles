// assets
export const ASSETS_QUERY_KEY = ["GET", "assets"];
export const ASSET_QUERY_KEY = (assetId: string) => ["GET", "assets", assetId];
export const ASSET_MUTATION_KEY = ["POST", "assets"];
export const ASSET_DELETE_KEY = (assetId: string) => [
  "DELETE",
  "assets",
  assetId,
];

// basket
export const BASKET_QUERY_KEY = (userId: string) => ["GET", "basket", userId];
export const BASKET_COUNT_QUERY_KEY = (userId: string) => [
  "GET",
  "basket",
  userId,
  "count",
];
export const BASKET_MUTATION_KEY = (userId: string, assetId: string) => [
  "POST",
  "basket",
  userId,
  assetId,
];
export const TOTAL_PRICE_QUERY_KEY = ["GET", "basket", "total-price"];

// orders
export const ORDERS_QUERY_KEY = (userId: string) => ["GET", "orders", userId];
export const ORDER_QUERY_KEY = (orderId: string) => ["GET", "orders", orderId];
export const ORDER_MUTATION_KEY = ["POST", "orders"];

// user
export const USER_QUERY_KEY = (username: string) => ["GET", "users", username];
export const USER_PUT_KEY = ["PUT", "users"];

// studios
export const STUDIOS_QUERY_KEY = ["GET", "studios"];
export const MY_STUDIOS_QUERY_KEY = (userId: string) => [
  "GET",
  "studios",
  "userId",
  userId,
];
export const STUDIO_QUERY_KEY = (slug: string) => ["GET", "studios", slug];
export const STUDIO_MUTATION_KEY = ["POST", "studios"];
export const STUDIO_UPDATE_KEY = (slug: string) => ["PUT", "studios", slug];
export const STUDIO_DELETE_KEY = (slug: string) => ["DELETE", "studios", slug];
export const STUDIO_EARNINGS_QUERY_KEY = (
  slug: string,
  timeInterval: string
) => ["GET", "studios", slug, "earnings", timeInterval];
export const STUDIO_SALES_QUERY_KEY = (slug: string, timeInterval: string) => [
  "GET",
  "studios",
  slug,
  "sales",
  timeInterval,
];
export const STUDIO_MEMBER_MUTATION_KEY = (slug: string) => [
  "POST",
  "studios",
  slug,
  "members",
];
export const STUDIO_MEMBER_DELETE_KEY = (slug: string) => [
  "DELETE",
  "studios",
  slug,
  "members",
];

// tags
export const TAG_QUERY_KEY = (tagId: string) => ["GET", "tags", tagId];

// currency
export const RATES_QUERY_KEY = (currencyName: string) => [
  "GET",
  "rates",
  currencyName,
];
export const CURRENCIES_QUERY_KEY = ["GET", "currencies"];

// promotion
export const PROMOTION_QUERY_KEY = ["GET", "promotion"];

// saved
export const SAVED_QUERY_KEY = (userId: string) => ["GET", "saved", userId];
export const SAVED_COUNT_QUERY_KEY = (userId: string) => [
  "GET",
  "saved",
  userId,
  "count",
];
export const SAVED_MUTATION_KEY = (userId: string, assetId: string) => [
  "POST",
  "saved",
  userId,
  assetId,
];

// search
export const SEARCH_QUERY_KEY = (query: string) => ["GET", "search", query];
export const SEARCH_PROMPTS_QUERY_KEY = (query: string) => [
  "GET",
  "search-prompts",
  query,
];

// comments
export const COMMENT_MUTATION_KEY = ["POST", "comments"];
export const COMMENT_UPDATE_KEY = (commentId: string) => [
  "PUT",
  "comments",
  commentId,
];
export const COMMENT_DELETE_KEY = (commentId: string) => [
  "DELETE",
  "comments",
  commentId,
];
export const COMMENT_LIKE_MUTATION_KEY = (
  userId: string,
  commentId: string
) => ["POST", "comments", commentId, "like", userId];

// register
export const REGISTER_MUTATION_KEY = ["POST", "register"];

// licenses
export const LICENSES_QUERY_KEY = ["GET", "licenses"];

// payments
export const PAYMENT_MUTATION_KEY = ["POST", "payments"];

// follows
export const FOLLOW_MUTATION_KEY = ["POST", "follows"];

// avatar
export const AVATAR_QUERY_KEY = (userId: string) => ["GET", "avatar", userId];
