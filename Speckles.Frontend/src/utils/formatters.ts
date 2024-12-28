import { IRates } from "@/types/dtos/Rates.types";
import { getLocalCurrency } from "./local";
import { convertPrice } from "./price";

export function formatPrice(locale: string, currency: string, price: number) {
  // currency formatter
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}

export function formatPriceToLocal(price: number, rates?: IRates["rates"]) {
  // browser locale
  const userLocale = navigator.language;

  // currency from local storage
  const localCurrency = getLocalCurrency();

  // no conversion needed
  if (rates === undefined) {
    return formatPrice(userLocale, localCurrency, price);
  }

  // convert price
  const rate = rates[localCurrency];
  const convertedPrice = convertPrice(price, rate);

  return formatPrice(userLocale, localCurrency, convertedPrice);
}

export function formatDate(date: string, long: boolean = true) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: long ? "long" : "short",
    year: "numeric",
  });
}

export function formatFileSize(size: number) {
  const units = ["B", "KB", "MB", "GB", "TB"];

  let unit = 0;
  while (size >= 1024) {
    size /= 1024;
    unit++;
  }

  return `${size.toFixed(1)} ${units[unit]}`;
}
