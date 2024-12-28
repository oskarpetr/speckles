import { formatPrice } from "./formatters";
import { getLocalCurrency } from "./local";

export function formatPriceToLocal(
  price: number,
  rates?: { [key: string]: number }
) {
  const userLocale = navigator.language;
  const localCurrency = getLocalCurrency();

  if (rates === undefined) {
    return formatPrice(userLocale, localCurrency, price);
  }

  const rate = rates[localCurrency];
  const convertedPrice = convertPrice(price, rate);

  return formatPrice(userLocale, localCurrency, convertedPrice);
}

export function convertPrice(price: number, rate: number) {
  return price * rate;
  // return Math.ceil(price * rate) - 0.01;
}
