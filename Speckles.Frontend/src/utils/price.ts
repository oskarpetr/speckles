import { IAssetShort } from "@/types/dtos/Asset.types";
import { fetchCurrencyRates } from "./fetchers";

// base currency
export const BASE_CURRENCY = "EUR";

// convert price
export function convertPrice(price: number, rate: number) {
  return price * rate;
  // return Math.ceil(price * rate) - 0.01;
}

// get total price
export async function getTotalPrice(
  basket: IAssetShort[],
  targetCurrency: string
) {
  const rates = (await fetchCurrencyRates(BASE_CURRENCY)).rates;
  const targetRate = rates[targetCurrency];

  return basket.reduce((acc, curr) => {
    const rateToEUR = rates[curr.currency.name];
    const priceInEUR = curr.price / rateToEUR;
    return acc + priceInEUR * targetRate;
  }, 0);
}

export const AMOUNT_TO_STUDIO = 0.95;
export const AMOUNT_TO_SPECKLES = 0.05;
