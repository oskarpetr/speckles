import { toastError, toastSuccess } from "@/components/shared/Toast";
import { ILoginPostBody, IRegisterPostBody } from "@/types/dtos/Auth.types";
import axios, { AxiosRequestConfig, Method } from "axios";
import { ApiOffsetLimit } from "@/types/ApiResponse.types";
import { IAssetPostBody } from "@/types/dtos/Asset.types";
import {
  IStudioMemberDeleteBody,
  IStudioMemberPostBody,
  IStudioPutBody,
} from "@/types/dtos/Studio.types";
import { ICommentPostBody } from "@/types/dtos/Comment.types";
import { IPayment } from "@/types/dtos/Payment.types";
import { IOrderPostBody } from "@/types/dtos/Order.types";

// studios
export async function fetchStudios() {
  return fetcher({ url: "studios" });
}

export async function fetchMyStudios(userId: string) {
  return fetcher({ url: `studios?userId=${userId}` });
}

export async function fetchStudio(studioId: string) {
  return fetcher({ url: `studios/${studioId}` });
}

export async function fetchStudioEarnings(slug: string, timeInterval: string) {
  return fetcher({
    url: `studios/${slug}/earnings?timeInterval=${timeInterval}`,
  });
}

export async function postStudioMember(
  slug: string,
  body: IStudioMemberPostBody
) {
  return fetcher({
    url: `studios/${slug}/members`,
    method: "POST",
    body,
  });
}

export async function deleteStudioMember(
  slug: string,
  body: IStudioMemberDeleteBody
) {
  return fetcher({
    url: `studios/${slug}/members`,
    method: "DELETE",
    body,
  });
}

export async function putStudio(slug: string, body: IStudioPutBody) {
  return fetcher({
    url: `studios/${slug}`,
    method: "PUT",
    body,
  });
}

// assets
export async function fetchAssets() {
  return fetcher({ url: `assets?format=short` });
}

export async function fetchAsset(assetId: string, userId: string) {
  return fetcher({ url: `assets/${assetId}?userId=${userId}` });
}

// saved assets
export async function fetchSavedAssets(userId: string) {
  return fetcher({ url: `saved?userId=${userId}&format=short` });
}

export async function fetchSavedCount(userId: string) {
  return fetcher({ url: `saved?userId=${userId}&format=count` });
}

export async function postAsset(body: IAssetPostBody) {
  return fetcher({
    url: "assets",
    method: "POST",
    body,
  });
}

export async function deleteAsset(assetId: string) {
  return fetcher({
    url: `assets/${assetId}`,
    method: "DELETE",
  });
}

// user
export async function fetchUser(username: string) {
  return fetcher({ url: `users/${username}` });
}

// promotions
export async function fetchPromotion() {
  return fetcher({ url: "promotion" });
}

// search
export async function fetchSearch(query: string) {
  return fetcher({ url: `search?query=${query}` });
}

export async function fetchSearchPrompts(query: string) {
  return fetcher({ url: `search-prompts?query=${query}` });
}

// geo
export async function fetchGeo() {
  return fetcher({
    url: "json?fields=country,countryCode,currency",
    origin: "http://ip-api.com/",
  });
}

export async function postSaved(userId: string, assetId: string) {
  return fetcher({
    url: `saved?userId=${userId}`,
    method: "POST",
    body: { assetId },
  });
}

// basket assets
export async function fetchBasket(userId: string) {
  return fetcher({ url: `basket?userId=${userId}` });
}

export async function fetchBasketCount(userId: string) {
  return fetcher({ url: `basket?userId=${userId}&format=count` });
}

export async function postBasket(userId: string, assetId: string) {
  return fetcher({
    url: `basket?userId=${userId}`,
    method: "POST",
    body: { assetId },
  });
}

// comments
export async function postComment(body: ICommentPostBody) {
  return fetcher({
    url: "comments",
    method: "POST",
    body,
  });
}

export async function postCommentLike(commentId: string, userId: string) {
  return fetcher({
    url: `comments/${commentId}/like?userId=${userId}`,
    method: "POST",
  });
}

// payments
export async function postPayment(body: IPayment[]) {
  return fetcher({
    url: "payments",
    method: "POST",
    origin: FRONTEND_API_URL,
    body,
  });
}

export async function postPayout(body: any) {
  const accessKey = process.env.NEXT_PUBLIC_PAYPAL_ACCESS_KEY ?? "";

  return fetcher({
    url: "v1/payments/payouts",
    method: "POST",
    origin: PAYPAL_API_URL,
    bearerToken: accessKey,
    body,
  });
}

// orders
export async function fetchOrders(
  userId: string,
  { offset = 0, limit = 0 }: ApiOffsetLimit
) {
  return fetcher({
    url: `orders?userId=${userId}&format=short&offset=${offset}&limit=${limit}`,
  });
}

export async function fetchOrderCount(userId: string) {
  return fetcher({ url: `orders?userId=${userId}&format=count` });
}

export async function fetchOrder(orderId: string) {
  return fetcher({ url: `orders/${orderId}` });
}

export async function postOrder(body: IOrderPostBody) {
  return fetcher({ url: "orders", method: "POST", body });
}

// downloads
export async function fetchDownload() {
  return fetcher({ url: `download`, origin: FRONTEND_API_URL });
}

// register
export async function postRegister(body: IRegisterPostBody) {
  return fetcher({ url: "auth/register", method: "POST", body });
}

// login
export async function postLogin(body: ILoginPostBody) {
  return fetcher({ url: "auth/login", method: "POST", body });
}

// tags
export async function fetchTag(
  tagId: string,
  { offset = 0, limit = 0 }: ApiOffsetLimit
) {
  return fetcher({ url: `tags/${tagId}?offset=${offset}&limit=${limit}` });
}

// currency
export async function fetchCurrencyRates(currencyName: string) {
  // return fetcher({
  //   url: `v1/latest?base=${currency}`,
  //   origin: "https://api.frankfurter.dev/",
  // });
  return fetcher({
    url: `v6/latest/${currencyName}`,
    origin: "https://open.er-api.com/",
  });
}

export async function fetchCurrencies() {
  return fetcher({ url: "currencies" });
}

// licenses
export async function fetchLicenses() {
  return fetcher({ url: "licenses" });
}

// fetcher
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const FRONTEND_API_URL = "http://localhost:3000/api/";
const PAYPAL_API_URL = "https://api-m.sandbox.paypal.com/";

async function fetcher({
  url,
  method = "GET",
  body = null,
  origin = API_URL,
  showToast = true,
  successMessage,
  bearerToken,
}: // authorize = false,
{
  url: string;
  method?: Method;
  body?: object | null;
  origin?: string;
  showToast?: boolean;
  successMessage?: string;
  bearerToken?: string;
  // authorize?: boolean;
}) {
  const options: AxiosRequestConfig = {
    url: `${origin}${url}`,
    method,
    headers: {},
  };

  if (body !== null) {
    options.data = body;
    options.headers!["Content-Type"] = "application/json";
  }

  if (bearerToken) {
    options.headers!.Authorization = `Bearer ${bearerToken}`;
  }

  // if (authorize) {
  //   const jwtToken = (await axios.get("/api/auth/jwt")).data.token;
  //   if (jwtToken) {
  //     options.headers!.Authorization = `Bearer ${jwtToken}`;
  //   }
  // }

  try {
    const res = await axios(options);
    if (showToast && successMessage) {
      toastSuccess(successMessage);
    }

    return res.data;
  } catch (error: any) {
    const statusCode = error.response?.status;
    const statusText = error.response?.statusText || error.message;
    const customError = new Error(statusText);
    customError.name = statusCode.toString();

    if (showToast) {
      toastError("An error occurred. Please try again.");
    }

    throw customError;
  }
}
