import storage from "store2";
import { BASE_CURRENCY } from "./price";

// local storage keys
const LOCAL_BASKET = "localBasket";
const LOCAL_SAVED = "localSaved";
const LOCAL_CURRENCY = "localCurrency";

export function getLocalBasket() {
  return (storage.get(LOCAL_BASKET) as string[]) || [];
}

export function existsInLocalBasket(assetId: string) {
  const localBasket = getLocalBasket();
  return localBasket.includes(assetId);
}

export function localBasketToggle(inBasket: boolean, assetId: string) {
  const localBasket = getLocalBasket();

  // add to basket
  if (!inBasket) {
    localBasket.push(assetId);
    storage.set(LOCAL_BASKET, localBasket);
  }

  // remove from basket
  else {
    const index = localBasket.indexOf(assetId);
    localBasket.splice(index, 1);
    storage.set(LOCAL_BASKET, localBasket);
  }
}

export function getLocalSaved() {
  return (storage.get(LOCAL_SAVED) as string[]) || [];
}

export function existsInLocalSaved(assetId: string) {
  const localSaved = getLocalSaved();
  return localSaved.includes(assetId);
}

export function localSavedToggle(saved: boolean, assetId: string) {
  const localSaved = getLocalSaved();

  // add to saved
  if (!saved) {
    localSaved.push(assetId);
    storage.set(LOCAL_SAVED, localSaved);
  }

  // remove from saved
  else {
    const index = localSaved.indexOf(assetId);
    localSaved.splice(index, 1);
    storage.set(LOCAL_SAVED, localSaved);
  }
}

export function getLocalCurrency() {
  const localCurrency = storage.get(LOCAL_CURRENCY);

  if (localCurrency === null) {
    setLocalCurrency(BASE_CURRENCY);
    return BASE_CURRENCY;
  }

  return localCurrency;
}

export function setLocalCurrency(currency: string) {
  storage.set(LOCAL_CURRENCY, currency);
}
