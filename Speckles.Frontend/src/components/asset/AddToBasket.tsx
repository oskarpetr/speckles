import { useContext, useEffect, useState } from "react";
import Button from "../shared/Button";
import { MenuContext } from "../context/MenuContext";
import { useSession } from "next-auth/react";
import { existsInLocalBasket, localBasketToggle } from "@/utils/local";
import { IAsset } from "@/types/Asset.types";

interface Props {
  asset: IAsset;
}

export default function AddToBasket({ asset }: Props) {
  // session
  const { status } = useSession();

  // determine if asset is in basket
  const determineInBasket = () => {
    if (status === "authenticated") {
      return asset.inBasket;
    } else {
      return existsInLocalBasket(asset.assetId);
    }
  };

  // added to basket state
  const [inBasket, setInBasket] = useState(determineInBasket);

  // menu context
  const menuContext = useContext(MenuContext);
  const { postBasketQuery, basketCountQuery, setBasketType } = menuContext;

  // basket animation
  //   const assetControls = useAnimationControlsT();

  const toggleAddToBasket = async () => {
    // if (!addedToBasket) {
    //   await assetControls.start({ scale: 1 }, { duration: 0.3 });
    //   await assetControls.start({ top: 14, right: 155 });
    //   await assetControls.start({ scale: 0 }, { duration: 0.3 });
    // }

    if (status === "authenticated") {
      await postBasketQuery?.refetch();
      await basketCountQuery?.refetch();
    } else if (status === "unauthenticated") {
      localBasketToggle(inBasket, asset.assetId);
    }

    setInBasket((prev) => !prev);
    setBasketType((prev) => (prev === "add" ? "remove" : "add"));
  };

  useEffect(() => {
    setBasketType(inBasket ? "remove" : "add");
    setInBasket(inBasket);
  }, [inBasket]);

  return (
    <Button
      onClick={toggleAddToBasket}
      type={inBasket ? "cancel" : "primary"}
      icon={{ name: inBasket ? "X" : "Basket" }}
      text={inBasket ? "Remove from basket" : "Add to basket"}
      marginTop
      fullWidth
    />
  );
}
