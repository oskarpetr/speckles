import { PAGINATION_LIMIT } from "@/components/shared/LoadMore";
import { toastSuccess } from "@/components/shared/Toast";
import { ApiCount, ApiResponse } from "@/types/ApiResponse.types";
import { IAsset, IAssetShort } from "@/types/dtos/Asset.types";
import { IEarning } from "@/types/dtos/Earning.types";
import { IGeo } from "@/types/dtos/Geo.types";
import { IOrder, IOrderShort } from "@/types/dtos/Order.types";
import { IPromotion } from "@/types/dtos/Promotion.types";
import { IRates } from "@/types/dtos/Rates.types";
import { IStudio, IStudioShort } from "@/types/dtos/Studio.types";
import { ITag } from "@/types/dtos/Tag.types";
import { IUser } from "@/types/dtos/User.types";
import { IToggleState } from "@/types/UiState.types";
import {
  fetchAsset,
  fetchAssets,
  fetchBasket,
  fetchBasketCount,
  fetchCurrencyRates,
  fetchGeo,
  fetchMyStudios,
  fetchOrder,
  fetchOrders,
  fetchPromotion,
  fetchSavedAssets,
  fetchSavedCount,
  fetchSearchPrompts,
  fetchStudio,
  fetchStudioEarnings,
  fetchStudios,
  fetchTag,
  fetchUser,
  postBasket,
  postSaved,
} from "@/utils/fetchers";
import {
  ASSET_QUERY_KEY,
  ASSETS_QUERY_KEY,
  BASKET_COUNT_QUERY_KEY,
  BASKET_MUTATION_KEY,
  BASKET_QUERY_KEY,
  MY_STUDIOS_QUERY_KEY,
  ORDER_QUERY_KEY,
  ORDERS_QUERY_KEY,
  PROMOTION_QUERY_KEY,
  RATES_QUERY_KEY,
  SAVED_COUNT_QUERY_KEY,
  SAVED_MUTATION_KEY,
  SAVED_QUERY_KEY,
  SEARCH_PROMPTS_QUERY_KEY,
  STUDIO_EARNINGS_QUERY_KEY,
  STUDIO_QUERY_KEY,
  STUDIOS_QUERY_KEY,
  TAG_QUERY_KEY,
  USER_QUERY_KEY,
} from "@/utils/query-keys";
import toastMessages from "@/utils/toastMessages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useAssetsQuery() {
  // query
  const assetsQuery = useQuery<ApiResponse<IAssetShort[]>>({
    queryKey: ASSETS_QUERY_KEY,
    queryFn: fetchAssets,
  });

  return assetsQuery;
}

export function useAssetQuery(assetId: string) {
  // session
  const { data: session, status } = useSession();
  const userId = session?.user.userId ?? "";

  // query
  const assetQuery = useQuery<ApiResponse<IAsset>>({
    queryKey: ASSET_QUERY_KEY(assetId),
    queryFn: () => fetchAsset(assetId, userId),
    enabled:
      (status === "authenticated" && !!session) ||
      status === "unauthenticated" ||
      status === "loading",
  });

  return assetQuery;
}

export function useOrdersQuery(page: number) {
  // session
  const { data: session, status } = useSession();
  const userId = session?.user.userId ?? "";

  // fetch orders
  const query = () =>
    fetchOrders(userId, {
      limit: page * PAGINATION_LIMIT,
    });

  // query
  const ordersQuery = useQuery<ApiResponse<IOrderShort[]>>({
    queryKey: ORDERS_QUERY_KEY(userId),
    queryFn: query,
    enabled: status === "authenticated",
  });

  return ordersQuery;
}

export function useOrderQuery(orderId: string) {
  // query
  const orderQuery = useQuery<ApiResponse<IOrder>>({
    queryKey: ORDER_QUERY_KEY(orderId),
    queryFn: () => fetchOrder(orderId),
  });

  return orderQuery;
}

export function useBasketQuery() {
  // session
  const { data: session, status } = useSession();
  const userId = session?.user.userId ?? "";

  // query
  const basketQuery = useQuery<ApiResponse<IAssetShort[]>>({
    queryKey: BASKET_QUERY_KEY(userId),
    queryFn: () => fetchBasket(userId),
    enabled: status === "authenticated",
  });

  return basketQuery;
}

export function useBasketCountQuery() {
  // session
  const { data: session, status } = useSession();
  const userId = session?.user.userId ?? "";

  // query
  const basketCountQuery = useQuery<ApiResponse<ApiCount>>({
    queryKey: BASKET_COUNT_QUERY_KEY(userId),
    queryFn: () => fetchBasketCount(userId),
    enabled: status === "authenticated",
  });

  return basketCountQuery;
}

export function useBasketMutation(assetId: string, type: IToggleState) {
  // session
  const { data: session } = useSession();
  const userId = session?.user.userId ?? "";

  // query client
  const queryClient = useQueryClient();

  // mutation
  const basketMutation = useMutation({
    mutationKey: BASKET_MUTATION_KEY(userId, assetId),
    mutationFn: () => postBasket(userId, assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BASKET_COUNT_QUERY_KEY(userId),
      });
      toastSuccess(
        type === "add"
          ? toastMessages.user.addedToBasket
          : toastMessages.user.removedFromBasket
      );
    },
  });

  return basketMutation;
}

export function useUserQuery(username: string) {
  // query
  const userQuery = useQuery<ApiResponse<IUser>>({
    queryKey: USER_QUERY_KEY(username),
    queryFn: () => fetchUser(username),
  });

  return userQuery;
}

export function useStudiosQuery() {
  // query
  const studiosQuery = useQuery<ApiResponse<IStudio[]>>({
    queryKey: STUDIOS_QUERY_KEY,
    queryFn: fetchStudios,
  });

  return studiosQuery;
}

export function useStudioQuery(slug: string) {
  // query
  const studioQuery = useQuery<ApiResponse<IStudio>>({
    queryKey: STUDIO_QUERY_KEY(slug),
    queryFn: () => fetchStudio(slug),
  });

  return studioQuery;
}

export function useMyStudiosQuery() {
  // session
  const { data: session, status } = useSession();
  const userId = session?.user.userId ?? "";

  // query
  const myStudiosQuery = useQuery<ApiResponse<IStudioShort[]>>({
    queryKey: MY_STUDIOS_QUERY_KEY(userId),
    queryFn: () => fetchMyStudios(userId),
    enabled: status === "authenticated",
  });

  return myStudiosQuery;
}

export function useStudioEarningsQuery(slug: string, timeInterval: string) {
  // query
  const studioEarningsQuery = useQuery<ApiResponse<IEarning[]>>({
    queryKey: STUDIO_EARNINGS_QUERY_KEY(slug, timeInterval),
    queryFn: () => fetchStudioEarnings(slug, timeInterval),
  });

  return studioEarningsQuery;
}

export function useTagQuery(tagId: string) {
  // query
  const tagQuery = useQuery<ApiResponse<ITag>>({
    queryKey: TAG_QUERY_KEY(tagId),
    queryFn: () => fetchTag(tagId),
  });

  return tagQuery;
}

export function useRatesQuery(currencyName: string) {
  // query
  const ratesQuery = useQuery<IRates>({
    queryKey: RATES_QUERY_KEY(currencyName),
    queryFn: () => fetchCurrencyRates(currencyName),
  });

  return ratesQuery;
}

export function useGeoQuery() {
  // query
  const geoQuery = useQuery<IGeo>({
    queryKey: ["geo"],
    queryFn: fetchGeo,
  });

  return geoQuery;
}

export function usePromotionQuery() {
  // query
  const promotionQuery = useQuery<ApiResponse<IPromotion>>({
    queryKey: PROMOTION_QUERY_KEY,
    queryFn: fetchPromotion,
  });

  return promotionQuery;
}

export function useSavedQuery() {
  // session
  const { data: session, status } = useSession();
  const userId = session?.user.userId ?? "";

  // query
  const savedQuery = useQuery<ApiResponse<IAssetShort[]>>({
    queryKey: SAVED_QUERY_KEY(userId),
    queryFn: () => fetchSavedAssets(userId),
    enabled: status === "authenticated",
  });

  return savedQuery;
}

export function useSavedCountQuery() {
  // session
  const { data: session, status } = useSession();
  const userId = session?.user.userId ?? "";

  // query
  const savedCountQuery = useQuery<ApiResponse<ApiCount>>({
    queryKey: SAVED_COUNT_QUERY_KEY(userId),
    queryFn: () => fetchSavedCount(userId),
    enabled: status === "authenticated",
  });

  return savedCountQuery;
}

export function useSavedMutation(assetId: string, type: IToggleState) {
  // session
  const { data: session } = useSession();
  const userId = session?.user.userId ?? "";

  // query client
  const queryClient = useQueryClient();

  // query
  const postSavedMutation = useMutation({
    mutationKey: SAVED_MUTATION_KEY(userId, assetId),
    mutationFn: () => postSaved(userId, assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SAVED_COUNT_QUERY_KEY(userId),
      });
      toastSuccess(
        type === "add"
          ? toastMessages.user.addedToSaved
          : toastMessages.user.removedFromSaved
      );
    },
  });

  return postSavedMutation;
}

export function useSearchPromptsQuery(search: string) {
  // query
  const searchPromptsQuery = useQuery<ApiResponse<IAssetShort[]>>({
    queryKey: SEARCH_PROMPTS_QUERY_KEY(search),
    queryFn: () => fetchSearchPrompts(search),
    enabled: search.length > 0 && search.trim().length > 0,
  });

  return searchPromptsQuery;
}
