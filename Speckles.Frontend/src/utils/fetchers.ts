const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const FRONTEND_URL = "http://localhost:3000/";

async function fetcher(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body: object | null = null,
  origin: string = API_URL
) {
  let options: any = { method };
  if (body !== null) {
    options.body = JSON.stringify(body);
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  const res = await fetch(`${origin}${url}`, options);

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  return res.json();
}

// studios
export async function fetchStudios() {
  return fetcher("api/studios");
}

export async function fetchStudio(studioId: string) {
  return fetcher(`api/studios/${studioId}`);
}

export async function fetchStudioEarnings(studioId: string) {
  return fetcher(`api/studios/${studioId}/earnings`);
}

// asets
export async function fetchAssets() {
  return fetcher(`api/assets?format=short`);
}

export async function fetchAsset(assetId: string) {
  return fetcher(`api/assets/${assetId}`);
}

// saved assets
export async function fetchSavedAssets(memberId: string) {
  return fetcher(`api/saved/${memberId}?format=short`);
}

export async function postSavedAsset(memberId: string, assetId: string) {
  return fetcher(`api/saved`, "POST", { memberId, assetId });
}

// orders
export async function fetchOrders(memberId: string) {
  return fetcher(`api/orders?memberId=${memberId}&format=short`);
}

export async function fetchOrder(orderId: string) {
  return fetcher(`api/orders/${orderId}`);
}

// downloads
export async function fetchDownload() {
  return fetcher(`api/download`, "GET", {}, FRONTEND_URL);
}
