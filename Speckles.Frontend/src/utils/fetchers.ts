import { toastError, toastSuccess } from "@/components/common/Toast";
import { IAuthLogin, IAuthRegister } from "@/types/Auth.types";
import axios, { AxiosRequestConfig, Method } from "axios";
import { getSession, useSession } from "next-auth/react";

// studios
export async function fetchStudios() {
  return fetcher({ url: "studios", authorize: true });
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

export async function fetchAsset(assetId: string, memberId: string) {
  return fetcher({ url: `assets/${assetId}?memberId=${memberId}` });
}

// saved assets
export async function fetchSavedAssets(memberId: string) {
  return fetcher({ url: `saved?memberId=${memberId}&format=short` });
}

export async function fetchSavedCount(memberId: string) {
  return fetcher({ url: `saved?memberId=${memberId}&format=count` });
}

export async function postSaved(
  memberId: string,
  assetId: string,
  type: "add" | "remove"
) {
  return fetcher({
    url: `saved?memberId=${memberId}`,
    method: "POST",
    body: { assetId },
    successMessage: type === "add" ? "Added to saved" : "Removed from saved",
  });
}

// basket assets
export async function fetchBasket(memberId: string) {
  return fetcher({ url: `basket?memberId=${memberId}&format=short` });
}

export async function fetchBasketCount(memberId: string) {
  return fetcher({ url: `basket?memberId=${memberId}&format=count` });
}

export async function postBasket(
  memberId: string,
  assetId: string,
  type: "add" | "remove"
) {
  return fetcher({
    url: `basket?memberId=${memberId}`,
    method: "POST",
    body: { assetId },
    successMessage: type === "add" ? "Added to basket" : "Removed from basket",
  });
}

// orders
export async function fetchOrders(
  memberId: string,
  { offset, limit }: { offset: number; limit: number }
) {
  return fetcher({
    url: `orders?memberId=${memberId}&format=short&offset=${offset}&limit=${limit}`,
  });
}

export async function fetchOrderCount(memberId: string) {
  return fetcher({ url: `orders?memberId=${memberId}&format=count` });
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
