// base currency
export const BASE_CURRENCY = "EUR";

export function convertPrice(price: number, rate: number) {
  return price * rate;
  // return Math.ceil(price * rate) - 0.01;
}
