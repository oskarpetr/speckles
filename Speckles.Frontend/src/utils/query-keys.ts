// assets
export const ASSETS_QUERY_KEY = ["assets"];
export const ASSET_QUERY_KEY = (assetId: string) => ["assets", assetId];

// basket
export const BASKET_QUERY_KEY = (userId: string) => ["basket", userId];
export const BASKET_COUNT_QUERY_KEY = (userId: string) => [
  "basket",
  userId,
  "count",
];
export const BASKET_MUTATION_KEY = (userId: string, assetId: string) => [
  "basket",
  userId,
  assetId,
];

// orders
export const ORDERS_QUERY_KEY = (userId: string) => ["orders", userId];
export const ORDER_QUERY_KEY = (orderId: string) => ["orders", orderId];

// user
export const USER_QUERY_KEY = (username: string) => ["users", username];

// studios
export const STUDIOS_QUERY_KEY = ["studios"];
export const MY_STUDIOS_QUERY_KEY = (userId: string) => [
  "studios",
  "userId",
  userId,
];
export const STUDIO_QUERY_KEY = (slug: string) => ["studios", slug];
export const STUDIO_EARNINGS_QUERY_KEY = (
  slug: string,
  timeInterval: string
) => ["studios", slug, "earnings", timeInterval];

// tags
export const TAG_QUERY_KEY = (tagId: string) => ["tags", tagId];

// rates
export const RATES_QUERY_KEY = (currencyName: string) => [
  "rates",
  currencyName,
];

// promotion
export const PROMOTION_QUERY_KEY = ["promotion"];

// saved
export const SAVED_QUERY_KEY = (userId: string) => ["saved", userId];
export const SAVED_COUNT_QUERY_KEY = (userId: string) => [
  "saved",
  userId,
  "count",
];
export const SAVED_MUTATION_KEY = (userId: string, assetId: string) => [
  "saved",
  userId,
  assetId,
];

// search
export const SEARCH_PROMPTS_QUERY_KEY = (search: string) => [
  "search-prompts",
  search,
];
