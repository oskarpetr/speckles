const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetcher(url: string) {
  const res = await fetch(`${API_URL}${url}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  return res.json();
}

// studios
export async function fetchStudios() {
  return fetcher("api/studios");
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

// orders
export async function fetchOrders(memberId: string) {
  return fetcher(`api/orders/${memberId}?format=short`);
}
