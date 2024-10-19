import { ICurrency } from "@/types/Currency.types";

export function formatPrice(price: number, currency: ICurrency) {
  const formatter = new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.name,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}
