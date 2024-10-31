import { IAuthLogin, IAuthRegister } from "@/types/Auth.types";
import axios, { AxiosRequestConfig, Method } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const FRONTEND_URL = "http://localhost:3000/";

async function fetcher(
  url: string,
  method: Method = "GET",
  body: object | null = null,
  origin: string = API_URL
) {
  const options: AxiosRequestConfig = {
    url: `${origin}${url}`,
    method,
    headers: {},
  };

  if (body !== null) {
    options.data = body;
    options.headers!["Content-Type"] = "application/json";
  }

  try {
    const res = await axios(options);
    return res.data;
  } catch (error: any) {
    const statusCode = error.response?.status;
    const statusText = error.response?.statusText || error.message;
    const customError = new Error(statusText);
    customError.name = statusCode.toString();
    throw customError;
  }
}

// studios
export async function fetchStudios() {
  return fetcher("studios");
}

export async function fetchStudio(studioId: string) {
  return fetcher(`studios/${studioId}`);
}

export async function fetchStudioEarnings(
  studioId: string,
  timeInterval: string
) {
  return fetcher(`studios/${studioId}/earnings?timeInterval=${timeInterval}`);
}

// asets
export async function fetchAssets() {
  return fetcher(`assets?format=short`);
}

export async function fetchAsset(assetId: string) {
  return fetcher(`assets/${assetId}`);
}

// saved assets
export async function fetchSavedAssets(memberId: string) {
  return fetcher(`members/${memberId}/saved?format=short`);
}

export async function postSavedAsset(memberId: string, assetId: string) {
  return fetcher(`saved`, "POST", { memberId, assetId });
}

// basket assets
export async function fetchBasket(memberId: string) {
  return fetcher(`members/${memberId}/basket?format=short`);
}

export async function fetchBasketCount(memberId: string) {
  return fetcher(`members/${memberId}/basket?format=count`);
}

export async function postBasket(memberId: string, assetId: string) {
  return fetcher(`basket`, "POST", { memberId, assetId });
}

// orders
export async function fetchOrders(memberId: string) {
  return fetcher(`members/${memberId}/orders?format=short`);
}

export async function fetchOrder(orderId: string) {
  return fetcher(`orders/${orderId}`);
}

// downloads
export async function fetchDownload() {
  return fetcher(`api/download`, "GET", {}, FRONTEND_URL);
}

// register
export async function postRegister(registerBody: IAuthRegister) {
  return fetcher("register", "POST", registerBody);
}

// login
export async function postLogin(loginBody: IAuthLogin) {
  return fetcher("login", "POST", loginBody);
}
