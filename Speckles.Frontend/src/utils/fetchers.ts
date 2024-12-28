import { toastError, toastSuccess } from "@/components/shared/Toast";
import { IAuthLogin, IAuthRegister } from "@/types/dtos/Auth.types";
import { IToggleState } from "@/types/UiState.types";
import axios, { AxiosRequestConfig, Method } from "axios";

// studios
export async function fetchStudios(userId?: string) {
  return fetcher({
    url: !userId ? "studios" : `studios?userId=${userId}`,
  });
}

export async function fetchStudio(studioId: string) {
  return fetcher({ url: `studios/${studioId}` });
}

export async function fetchStudioEarnings(slug: string, timeInterval: string) {
  return fetcher({
    url: `studios/${slug}/earnings?timeInterval=${timeInterval}`,
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

// user
export async function fetchUser(username: string) {
  return fetcher({ url: `users/${username}` });
}

// promotions
export async function fetchPromotion() {
  return fetcher({ url: "promotion" });
}

export async function postSaved(
  userId: string,
  assetId: string,
  type: "add" | "remove"
) {
  return fetcher({
    url: `saved?userId=${userId}`,
    method: "POST",
    body: { assetId },
    successMessage: type === "add" ? "Added to saved" : "Removed from saved",
  });
}

// basket assets
export async function fetchBasket(userId: string) {
  return fetcher({ url: `basket?userId=${userId}` });
}

export async function fetchBasketCount(userId: string) {
  return fetcher({ url: `basket?userId=${userId}&format=count` });
}

export async function postBasket(
  userId: string,
  assetId: string,
  type: IToggleState
) {
  return fetcher({
    url: `basket?userId=${userId}`,
    method: "POST",
    body: { assetId },
    successMessage: type === "add" ? "Added to basket" : "Removed from basket",
  });
}

// comments
export async function postCommentLike(
  commentId: string,
  userId: string,
  type: IToggleState
) {
  return fetcher({
    url: `comments/${commentId}/like?userId=${userId}`,
    method: "POST",
    successMessage: type === "add" ? "Liked comment" : "Unliked comment",
  });
}

// orders
export async function fetchOrders(
  userId: string,
  { offset = 0, limit = 0 }: { offset?: number; limit?: number }
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

// downloads
export async function fetchDownload() {
  return fetcher({ url: `api/download`, origin: FRONTEND_URL });
}

// register
export async function postRegister(registerBody: IAuthRegister) {
  return fetcher({ url: "auth/register", method: "POST", body: registerBody });
}

// login
export async function postLogin(loginBody: IAuthLogin) {
  return fetcher({ url: "auth/login", method: "POST", body: loginBody });
}

// tags
export async function fetchAssetsByTag(tagId: string) {
  return fetcher({ url: `tags/${tagId}` });
}

// currency
export async function fetchCurrencyRates(currency: string) {
  // return fetcher({
  //   url: `v1/latest?base=${currency}`,
  //   origin: "https://api.frankfurter.dev/",
  // });
  return fetcher({
    url: `v6/latest/${currency}`,
    origin: "https://open.er-api.com/",
  });
}

// fetcher
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const FRONTEND_URL = "http://localhost:3000/";

async function fetcher({
  url,
  method = "GET",
  body = null,
  origin = API_URL,
  showToast = true,
  successMessage,
  authorize = false,
}: {
  url: string;
  method?: Method;
  body?: object | null;
  origin?: string;
  showToast?: boolean;
  successMessage?: string;
  authorize?: boolean;
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

  if (authorize) {
    const jwtToken = (await axios.get("/api/auth/jwt")).data.token;
    if (jwtToken) {
      options.headers!.Authorization = `Bearer ${jwtToken}`;
    }
  }

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
