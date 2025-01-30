import storage from "store2";
import { BASE_CURRENCY } from "./price";

// local storage keys
const SPECKLES = "speckles";
const LOCAL_BASKET = "local-basket";
const LOCAL_SAVED = "local-saved";
const LOCAL_CURRENCY = "local-currency";
const LOCAL_CURRENCY_SET = "local-currency-set";

const defaultValues = {
  [LOCAL_BASKET]: [] as string[],
  [LOCAL_SAVED]: [] as string[],
  [LOCAL_CURRENCY]: BASE_CURRENCY as string,
  [LOCAL_CURRENCY_SET]: false as boolean,
};

function getLocal(): typeof defaultValues {
  if (!storage.has(SPECKLES)) {
    initializeLocal();
  }

  return storage.get(SPECKLES);
}

function initializeLocal() {
  storage.set(SPECKLES, defaultValues);
}

function setLocal(key: keyof typeof defaultValues, value: any) {
  const local = getLocal();
  local[key] = value;

  storage.set(SPECKLES, local);
}

// basket
export function getLocalBasket() {
  const local = getLocal();
  return local[LOCAL_BASKET] ?? defaultValues[LOCAL_BASKET];
}

export function existsInLocalBasket(assetId: string) {
  const localBasket = getLocalBasket();
  return localBasket.includes(assetId);
}

export function localBasketToggle(assetId: string, inBasket: boolean) {
  const localBasket = getLocalBasket();

  // add to basket
  if (!inBasket) {
    localBasket.push(assetId);
    setLocal(LOCAL_BASKET, localBasket);
  }

  // remove from basket
  else {
    const index = localBasket.indexOf(assetId);
    localBasket.splice(index, 1);
    setLocal(LOCAL_BASKET, localBasket);
  }
}

// saved
export function getLocalSaved() {
  const local = getLocal();
  return local[LOCAL_SAVED] ?? defaultValues[LOCAL_SAVED];
}

export function existsInLocalSaved(assetId: string) {
  const localSaved = getLocalSaved();
  return localSaved.includes(assetId);
}

export function localSavedToggle(assetId: string, saved: boolean) {
  const localSaved = getLocalSaved();

  // add to saved
  if (!saved) {
    localSaved.push(assetId);
    setLocal(LOCAL_SAVED, localSaved);
  }

  // remove from saved
  else {
    const index = localSaved.indexOf(assetId);
    localSaved.splice(index, 1);
    setLocal(LOCAL_SAVED, localSaved);
  }
}

export function getLocalCurrency() {
  const local = getLocal();
  return local[LOCAL_CURRENCY] ?? defaultValues[LOCAL_CURRENCY];
}

export function setLocalCurrency(currency: string) {
  setLocal(LOCAL_CURRENCY, currency);
  setCurrencySet(true);
}

export function getCurrencySet() {
  const local = getLocal();
  return local[LOCAL_CURRENCY_SET] ?? defaultValues[LOCAL_CURRENCY_SET];
}

export function setCurrencySet(value: boolean) {
  setLocal(LOCAL_CURRENCY_SET, value);
}
