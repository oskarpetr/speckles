"use client";

import {
  fetchBasketCount,
  fetchSavedCount,
  postBasket,
  postSaved,
} from "@/utils/fetchers";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { IToggleState } from "@/types/UiState.types";

interface MenuContextType {
  basketCountQuery: QueryObserverResult<any> | undefined;
  postBasketQuery: QueryObserverResult<any> | undefined;

  savedCountQuery: QueryObserverResult<any> | undefined;
  postSavedQuery: QueryObserverResult<any> | undefined;

  assetId: string;
  setAssetId: Dispatch<SetStateAction<string>>;

  setBasketType: Dispatch<SetStateAction<IToggleState | null>>;
  setSavedType: Dispatch<SetStateAction<IToggleState | null>>;
}

export const MenuContext = createContext<MenuContextType>({
  basketCountQuery: undefined,
  postBasketQuery: undefined,

  savedCountQuery: undefined,
  postSavedQuery: undefined,

  assetId: "",
  setAssetId: () => {},

  setBasketType: () => {},
  setSavedType: () => {},
});

interface Props {
  children: ReactNode;
}

export const MenuContextProvider = ({ children }: Props) => {
  // session
  const { data: session } = useSession();

  // asset id
  const [assetId, setAssetId] = useState("");

  const [basketType, setBasketType] = useState<IToggleState | null>(null);
  const [savedType, setSavedType] = useState<IToggleState | null>(null);

  // fetch basket count
  const basketCountQuery = useQuery({
    queryKey: ["basket", session?.user.userId, "count"],
    queryFn: () => fetchBasketCount(session?.user.userId ?? ""),
    enabled: false,
  });

  // post basket
  const postBasketQuery = useQuery({
    queryKey: ["basket", session?.user.userId, assetId],
    queryFn: () => postBasket(session?.user.userId ?? "", assetId, basketType!),
    enabled: false,
  });

  // fetch saved count
  const savedCountQuery = useQuery({
    queryKey: ["saved", session?.user.userId ?? "", "count"],
    queryFn: () => fetchSavedCount(session?.user.userId ?? ""),
    enabled: false,
  });

  // post saved
  const postSavedQuery = useQuery({
    queryKey: ["saved", session?.user.userId ?? "", assetId],
    queryFn: () => postSaved(session?.user.userId ?? "", assetId, savedType!),
    enabled: false,
  });

  return (
    <MenuContext.Provider
      value={{
        basketCountQuery,
        savedCountQuery,
        assetId,
        setAssetId,
        postBasketQuery,
        postSavedQuery,
        setBasketType,
        setSavedType,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
