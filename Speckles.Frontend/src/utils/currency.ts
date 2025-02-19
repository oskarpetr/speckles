import { IAssetShort } from "@/types/dtos/Asset.types";
import { fetchCurrencyRates } from "./fetchers";
import { BASE_CURRENCY } from "./price";

export async function convertPrice(
  amount: number,
  fromCurrency: string,
  toCurrency: string
) {
  const rates = await fetchCurrencyRates(BASE_CURRENCY);
  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];
  const amountInBase = amount / fromRate;

  return amountInBase * toRate;
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
