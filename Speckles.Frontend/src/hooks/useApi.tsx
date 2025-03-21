import { PAGINATION_LIMIT } from "@/components/shared/LoadMore";
import { toastSuccess } from "@/components/shared/Toast";
import { ApiCount, ApiResponse } from "@/types/ApiResponse.types";
import {
  IAsset,
  IAssetShort,
  IAssetPostBody,
  IAssetPutBody,
} from "@/types/dtos/Asset.types";
import { IRegisterPostBody } from "@/types/dtos/Auth.types";
import { ICommentPostBody, ICommentPutBody } from "@/types/dtos/Comment.types";
import { ICurrency } from "@/types/dtos/Currency.types";
import { IEarning } from "@/types/dtos/Earning.types";
import { IGeo } from "@/types/dtos/Geo.types";
import { ILicense } from "@/types/dtos/License.types";
import { IOrder, IOrderPostBody, IOrderShort } from "@/types/dtos/Order.types";
import { IPayment } from "@/types/dtos/Payment.types";
import { IProjectPostBody, IProjectPutBody } from "@/types/dtos/Project.types";
import { IPromotion } from "@/types/dtos/Promotion.types";
import { IRates } from "@/types/dtos/Rates.types";
import { ISale } from "@/types/dtos/Sale.types";
import {
  IStudio,
  IStudioPostBody,
  IStudioPutBody,
  IStudioShort,
} from "@/types/dtos/Studio.types";
import { ITag } from "@/types/dtos/Tag.types";
import { IUser, IUserPutBody } from "@/types/dtos/User.types";
import { IUserFollowPostBody } from "@/types/dtos/UserFollow.types";
import {
  deleteAsset,
  deleteComment,
  deleteProject,
  deleteStudio,
  deleteStudioMember,
  fetchAsset,
  fetchAssets,
  fetchBasket,
  fetchBasketCount,
  fetchCurrencies,
  fetchCurrencyRates,
  fetchGeo,
  fetchLicenses,
  fetchMyStudios,
  fetchOrder,
  fetchOrders,
  fetchPromotion,
  fetchSavedAssets,
  fetchSavedCount,
  fetchSearch,
  fetchSearchPrompts,
  fetchStudio,
  fetchStudioEarnings,
  fetchStudios,
  fetchStudioSales,
  fetchTag,
  fetchUser,
  postAsset,
  postBasket,
  postComment,
  postCommentLike,
  postOrder,
  postPayment,
  postProject,
  postRegister,
  postSaved,
  postStudio,
  postStudioMember,
  postUserFollow,
  putAsset,
  putProject,
  putStudio,
  putUser,
  updateComment,
} from "@/utils/fetchers";
import { getTotalPrice } from "@/utils/price";
import {
  ASSET_DELETE_KEY,
  ASSET_MUTATION_KEY,
  ASSET_QUERY_KEY,
  ASSET_UPDATE_KEY,
  ASSETS_QUERY_KEY,
  BASKET_COUNT_QUERY_KEY,
  BASKET_MUTATION_KEY,
  BASKET_QUERY_KEY,
  COMMENT_DELETE_KEY,
  COMMENT_LIKE_MUTATION_KEY,
  COMMENT_MUTATION_KEY,
  COMMENT_UPDATE_KEY,
  CURRENCIES_QUERY_KEY,
  FOLLOW_MUTATION_KEY,
  LICENSES_QUERY_KEY,
  MY_STUDIOS_QUERY_KEY,
  ORDER_MUTATION_KEY,
  ORDER_QUERY_KEY,
  ORDERS_QUERY_KEY,
  PAYMENT_MUTATION_KEY,
  PROJECT_DELETE_KEY,
  PROJECT_MUTATION_KEY,
  PROJECT_UPDATE_KEY,
  PROMOTION_QUERY_KEY,
  RATES_QUERY_KEY,
  REGISTER_MUTATION_KEY,
  SAVED_COUNT_QUERY_KEY,
  SAVED_MUTATION_KEY,
  SAVED_QUERY_KEY,
  SEARCH_PROMPTS_QUERY_KEY,
  SEARCH_QUERY_KEY,
  STUDIO_DELETE_KEY,
  STUDIO_EARNINGS_QUERY_KEY,
  STUDIO_MEMBER_DELETE_KEY,
  STUDIO_MEMBER_MUTATION_KEY,
  STUDIO_MUTATION_KEY,
  STUDIO_QUERY_KEY,
  STUDIO_SALES_QUERY_KEY,
  STUDIO_UPDATE_KEY,
  STUDIOS_QUERY_KEY,
  TAG_QUERY_KEY,
  TOTAL_PRICE_QUERY_KEY,
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
  const { data: session } = useSession();
  const userId = session?.user.userId ?? "";

  // query
  const assetQuery = useQuery<ApiResponse<IAsset>>({
    queryKey: ASSET_QUERY_KEY(assetId),
    queryFn: () => fetchAsset(assetId, userId),
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

export function useOrderMutation(userId: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const orderMutation = useMutation({
    mutationKey: ORDER_MUTATION_KEY,
    mutationFn: (body: IOrderPostBody) => postOrder(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: BASKET_COUNT_QUERY_KEY(userId),
      });
      queryClient.invalidateQueries({
        queryKey: BASKET_QUERY_KEY(userId),
      });
    },
  });

  return orderMutation;
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

export function useBasketTotalPriceQuery(
  basket: IAssetShort[],
  localCurrency: string
) {
  const basketTotalPriceQuery = useQuery<number>({
    queryKey: TOTAL_PRICE_QUERY_KEY,
    queryFn: () => getTotalPrice(basket, localCurrency),
  });

  return basketTotalPriceQuery;
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

export function useBasketMutation(assetId: string, inBasket: boolean) {
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
      queryClient.invalidateQueries({
        queryKey: BASKET_QUERY_KEY(userId),
      });
      toastSuccess(
        inBasket
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

export function useUserUpdate(username: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const userMutation = useMutation({
    mutationKey: USER_QUERY_KEY(username),
    mutationFn: (body: IUserPutBody) => putUser(username, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY(username),
      });
      toastSuccess(toastMessages.user.updatedProfile);
    },
  });

  return userMutation;
}

export function useStudiosQuery() {
  // query
  const studiosQuery = useQuery<ApiResponse<IStudio[]>>({
    queryKey: STUDIOS_QUERY_KEY,
    queryFn: fetchStudios,
  });

  return studiosQuery;
}

export function useStudioQuery(slug: string, userId?: string) {
  // query
  const studioQuery = useQuery<ApiResponse<IStudio>>({
    queryKey: STUDIO_QUERY_KEY(slug),
    queryFn: () => fetchStudio(slug, userId),
  });

  return studioQuery;
}

export function useStudioMutation() {
  // session
  const { data: session } = useSession();
  const userId = session?.user.userId ?? "";

  // query client
  const queryClient = useQueryClient();

  // mutation
  const studioMutation = useMutation({
    mutationKey: STUDIO_MUTATION_KEY,
    mutationFn: (body: IStudioPostBody) => postStudio(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MY_STUDIOS_QUERY_KEY(userId),
      });
      toastSuccess(toastMessages.studio.createdStudio);
    },
  });

  return studioMutation;
}

export function useStudioDelete(slug: string) {
  // mutation
  const studioDelete = useMutation({
    mutationKey: STUDIO_DELETE_KEY(slug),
    mutationFn: () => deleteStudio(slug),
    onSuccess: () => toastSuccess(toastMessages.studio.deletedStudio),
  });

  return studioDelete;
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

export function useStudioSalesQuery(slug: string, timeInterval: string) {
  // query
  const studioSalesQuery = useQuery<ApiResponse<ISale[]>>({
    queryKey: STUDIO_SALES_QUERY_KEY(slug, timeInterval),
    queryFn: () => fetchStudioSales(slug, timeInterval),
  });

  return studioSalesQuery;
}

export function useStudioMemberMutation(slug: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const studioMemberMutation = useMutation({
    mutationKey: STUDIO_MEMBER_MUTATION_KEY(slug),
    mutationFn: (email: string) => postStudioMember(slug, { email }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STUDIO_QUERY_KEY(slug),
      });
      toastSuccess(toastMessages.studio.addedMember);
    },
  });

  return studioMemberMutation;
}

export function useStudioMemberDelete(slug: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const studioMemberDelete = useMutation({
    mutationKey: STUDIO_MEMBER_DELETE_KEY(slug),
    mutationFn: (email: string) => deleteStudioMember(slug, { email }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STUDIO_QUERY_KEY(slug),
      });
      toastSuccess(toastMessages.studio.removedMember);
    },
  });

  return studioMemberDelete;
}

export function useStudioUpdate(slug: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const updateStudioUpdate = useMutation({
    mutationKey: STUDIO_UPDATE_KEY(slug),
    mutationFn: (body: IStudioPutBody) => putStudio(slug, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STUDIO_QUERY_KEY(slug),
      });
      toastSuccess(toastMessages.studio.updatedStudio);
    },
  });

  return updateStudioUpdate;
}

export function useAssetMutation(slug: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const assetMutation = useMutation({
    mutationKey: ASSET_MUTATION_KEY,
    mutationFn: (body: IAssetPostBody) => postAsset(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STUDIO_QUERY_KEY(slug),
      });
      toastSuccess(toastMessages.studio.createdAsset);
    },
  });

  return assetMutation;
}

export function useAssetUpdate(slug: string, assetId: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const updateAssetUpdate = useMutation({
    mutationKey: ASSET_UPDATE_KEY(assetId),
    mutationFn: (body: IAssetPutBody) => putAsset(assetId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ASSET_QUERY_KEY(slug),
      });
      toastSuccess(toastMessages.studio.updatedAsset);
    },
  });

  return updateAssetUpdate;
}

export function useAssetDelete(slug: string, assetId: string) {
  // query client
  const queryClient = useQueryClient();

  // delete
  const deleteAssetMutation = useMutation({
    mutationKey: ASSET_DELETE_KEY(assetId),
    mutationFn: () => deleteAsset(assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STUDIO_QUERY_KEY(slug),
      });
      toastSuccess(toastMessages.studio.deletedAsset);
    },
  });

  return deleteAssetMutation;
}

export function useTagQuery(tagId: string, page: number) {
  // fetch tag
  const query = () =>
    fetchTag(tagId, {
      limit: page * PAGINATION_LIMIT,
    });

  // query
  const tagQuery = useQuery<ApiResponse<ITag>>({
    queryKey: TAG_QUERY_KEY(tagId),
    queryFn: query,
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

export function useSavedMutation(assetId: string, saved: boolean) {
  // session
  const { data: session } = useSession();
  const userId = session?.user.userId ?? "";

  // query client
  const queryClient = useQueryClient();

  // mutation
  const postSavedMutation = useMutation({
    mutationKey: SAVED_MUTATION_KEY(userId, assetId),
    mutationFn: () => postSaved(userId, assetId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SAVED_COUNT_QUERY_KEY(userId),
      });
      toastSuccess(
        saved
          ? toastMessages.user.addedToSaved
          : toastMessages.user.removedFromSaved
      );
    },
  });

  return postSavedMutation;
}

export function useSearchQuery(query: string) {
  const trimmedQuery = query.toLowerCase().trim();

  // query
  const searchQuery = useQuery<ApiResponse<IAssetShort[]>>({
    queryKey: SEARCH_QUERY_KEY(trimmedQuery),
    queryFn: () => fetchSearch(trimmedQuery),
    enabled: trimmedQuery.length > 0,
  });

  return searchQuery;
}

export function useSearchPromptsQuery(query: string) {
  const trimmedQuery = query.toLowerCase().trim();

  // query
  const searchPromptsQuery = useQuery<ApiResponse<IAssetShort[]>>({
    queryKey: SEARCH_PROMPTS_QUERY_KEY(trimmedQuery),
    queryFn: () => fetchSearchPrompts(trimmedQuery),
    enabled: trimmedQuery.length > 0,
  });

  return searchPromptsQuery;
}

export function useCommentUpdate(assetId: string, commentId: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const commentMutation = useMutation({
    mutationKey: COMMENT_UPDATE_KEY(commentId),
    mutationFn: (body: ICommentPutBody) => updateComment(commentId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ASSET_QUERY_KEY(assetId),
      });
      toastSuccess(toastMessages.user.updatedComment);
    },
  });

  return commentMutation;
}

export function useCommentDelete(assetId: string, commentId: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const commentMutation = useMutation({
    mutationKey: COMMENT_DELETE_KEY(commentId),
    mutationFn: () => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ASSET_QUERY_KEY(assetId),
      });
      toastSuccess(toastMessages.user.removedComment);
    },
  });

  return commentMutation;
}

export function useCommentMutation(assetId: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const commentMutation = useMutation({
    mutationKey: COMMENT_MUTATION_KEY,
    mutationFn: (body: ICommentPostBody) => postComment(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ASSET_QUERY_KEY(assetId),
      });
      toastSuccess(toastMessages.user.addedComment);
    },
  });

  return commentMutation;
}

export function useCommentLikeMutation(commentId: string, liked: boolean) {
  // session
  const { data: session } = useSession();
  const userId = session?.user?.userId ?? "";

  // mutation
  const commentLikeMutation = useMutation({
    mutationKey: COMMENT_LIKE_MUTATION_KEY(userId, commentId),
    mutationFn: () => postCommentLike(commentId, userId),
    onSuccess: () =>
      toastSuccess(
        liked
          ? toastMessages.user.likeComment
          : toastMessages.user.unlikeComment
      ),
  });

  return commentLikeMutation;
}

export function useRegisterMutation() {
  // mutation
  const registerMutation = useMutation({
    mutationKey: REGISTER_MUTATION_KEY,
    mutationFn: (body: IRegisterPostBody) => postRegister(body),
    onSuccess: () => toastSuccess(toastMessages.user.register),
  });

  return registerMutation;
}

export function useCurrenciesQuery() {
  // query
  const currenciesQuery = useQuery<ApiResponse<ICurrency[]>>({
    queryKey: CURRENCIES_QUERY_KEY,
    queryFn: fetchCurrencies,
  });

  return currenciesQuery;
}

export function useLicensesQuery() {
  // query
  const licensesQuery = useQuery<ApiResponse<ILicense[]>>({
    queryKey: LICENSES_QUERY_KEY,
    queryFn: fetchLicenses,
  });

  return licensesQuery;
}

export function usePaymentMutation() {
  // mutation
  const paymentMutation = useMutation({
    mutationKey: PAYMENT_MUTATION_KEY,
    mutationFn: (body: IPayment[]) => postPayment(body),
  });

  return paymentMutation;
}

export function useFollowMutation(studioName: string, follow: boolean) {
  // mutation
  const followMutation = useMutation({
    mutationKey: FOLLOW_MUTATION_KEY,
    mutationFn: (body: IUserFollowPostBody) => postUserFollow(body),
    onSuccess: () => {
      toastSuccess(
        follow
          ? toastMessages.user.followStudio(studioName)
          : toastMessages.user.unfollowStudio(studioName)
      );
    },
  });

  return followMutation;
}

// projects
export function useProjectMutation(slug: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const projectMutation = useMutation({
    mutationKey: PROJECT_MUTATION_KEY,
    mutationFn: (body: IProjectPostBody) => postProject(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STUDIO_QUERY_KEY(slug),
      });
      toastSuccess(toastMessages.studio.createdProject);
    },
  });

  return projectMutation;
}

export function useProjectUpdate(slug: string, projectId: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const projectUpdate = useMutation({
    mutationKey: PROJECT_UPDATE_KEY(projectId),
    mutationFn: (body: IProjectPutBody) => putProject(projectId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STUDIO_QUERY_KEY(slug),
      });
      toastSuccess(toastMessages.studio.updatedProject);
    },
  });

  return projectUpdate;
}

export function useProjectDelete(slug: string, projectId: string) {
  // query client
  const queryClient = useQueryClient();

  // mutation
  const projectDelete = useMutation({
    mutationKey: PROJECT_DELETE_KEY(projectId),
    mutationFn: () => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STUDIO_QUERY_KEY(slug),
      });
      toastSuccess(toastMessages.studio.removedProject);
    },
  });

  return projectDelete;
}
