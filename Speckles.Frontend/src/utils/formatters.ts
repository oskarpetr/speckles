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

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
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
