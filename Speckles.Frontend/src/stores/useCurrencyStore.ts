import { getLocalCurrency, setLocalCurrency } from "@/utils/local";
import { create } from "zustand";

interface CurrencyState {
  localCurrency: string;
  setLocalCurrency: (currency: string) => void;
}

const useCurrencyStore = create<CurrencyState>((set) => ({
  localCurrency: getLocalCurrency(),
  setLocalCurrency: (currency: string) =>
    set(() => {
      setLocalCurrency(currency);
      return { localCurrency: currency };
    }),
}));

export default useCurrencyStore;
