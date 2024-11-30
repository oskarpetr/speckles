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
import { ToggleState } from "@/types/ToggleState.types";

interface MenuContextType {
  basketCountQuery: QueryObserverResult<any> | undefined;
  postBasketQuery: QueryObserverResult<any> | undefined;

  savedCountQuery: QueryObserverResult<any> | undefined;
  postSavedQuery: QueryObserverResult<any> | undefined;

  assetId: string;
  setAssetId: Dispatch<SetStateAction<string>>;

  setBasketType: Dispatch<SetStateAction<ToggleState | null>>;
  setSavedType: Dispatch<SetStateAction<ToggleState | null>>;
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
  // auth session
  const { data: session, status } = useSession();

  // asset id
  const [assetId, setAssetId] = useState("");

  const [basketType, setBasketType] = useState<ToggleState | null>(null);
  const [savedType, setSavedType] = useState<ToggleState | null>(null);

  // fetch basket count
  const basketCountQuery = useQuery({
    queryKey: ["basket", session?.user.memberId, "count"],
    queryFn: () => fetchBasketCount(session?.user.memberId!),
    enabled: status === "authenticated",
  });

  // post basket
  const postBasketQuery = useQuery({
    queryKey: ["basket", session?.user.memberId, assetId],
    queryFn: () => postBasket(session?.user.memberId!, assetId, basketType!),
    enabled: false,
  });

  // fetch saved count
  const savedCountQuery = useQuery({
    queryKey: ["saved", session?.user.memberId!, "count"],
    queryFn: () => fetchSavedCount(session?.user.memberId!),
    enabled: status === "authenticated",
  });

  // post saved
  const postSavedQuery = useQuery({
    queryKey: ["saved", session?.user.memberId!, assetId],
    queryFn: () => postSaved(session?.user.memberId!, assetId, savedType!),
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
