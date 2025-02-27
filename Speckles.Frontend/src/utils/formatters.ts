import { IRates } from "@/types/dtos/Rates.types";
import { convertPrice } from "./price";
import { ICurrency } from "@/types/dtos/Currency.types";
import { SelectOption } from "@/components/forms/Input";
import { ILicense } from "@/types/dtos/License.types";
import { IAssetShort } from "@/types/dtos/Asset.types";
import { IPayment } from "@/types/dtos/Payment.types";
import useCurrencyStore from "@/stores/useCurrencyStore";
import { format } from "date-fns";

export function formatPrice(locale: string, currency: string, price: number) {
  // currency formatter
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}

export function formatPriceToLocal(price: number, rates?: IRates["rates"]) {
  // browser locale
  const userLocale = navigator.language;

  // currency from local storage
  const currencyStore = useCurrencyStore();
  const localCurrency = currencyStore.localCurrency;

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

export function formatCurrencies(currencies: ICurrency[]) {
  const formattedCurrencies: SelectOption[] = [];

  currencies.forEach((currency) =>
    formattedCurrencies.push({
      label: currency.name,
      value: currency.currencyId,
    })
  );

  return formattedCurrencies;
}

export function formatLicenses(licenses: ILicense[]) {
  const formattedLicenses: SelectOption[] = [];

  licenses.forEach((license) =>
    formattedLicenses.push({
      label: license.name,
      value: license.licenseId,
    })
  );

  return formattedLicenses;
}

export function formatPayments(basket: IAssetShort[]) {
  const payments: IPayment[] = basket.map((asset) => ({
    amount: asset.price,
    currencyName: asset.currency.name,
    assetName: asset.name,
    paymentEmail: asset.studio.paymentEmail,
  }));

  return payments;
}

// format interval date label
export const formatIntervalDateLabel = (date: Date, timeInterval: string) => {
  if (timeInterval === "1d") {
    return format(date, "H") + "h";
  } else if (timeInterval === "1w") {
    return format(date, "E");
  } else if (timeInterval === "1m") {
    return format(date, "MMM dd");
  } else if (timeInterval === "1y") {
    return format(date, "MMM");
  } else if (timeInterval === "all time") {
    return format(date, "yyyy");
  }
};

// format interval date tooltip
export const formatIntervalDateTooltip = (date: Date, timeInterval: string) => {
  if (timeInterval === "1d") {
    return format(date, "dd MMMM, HH:00");
  } else if (timeInterval === "1w") {
    return format(date, "dd MMMM, yyyy");
  } else if (timeInterval === "1m") {
    return format(date, "dd MMMM, yyyy");
  } else if (timeInterval === "1y") {
    return format(date, "MMMM yyyy");
  } else if (timeInterval === "all time") {
    return format(date, "yyyy");
  }
};
