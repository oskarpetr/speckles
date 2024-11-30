import { useContext, useEffect, useState } from "react";
import Button from "../common/Button";
import { MenuContext } from "../context/MenuContext";
// import { useAnimationControls } from "framer-motion";

interface Props {
  inBasket: boolean;
}

export default function AddToBasket({ inBasket }: Props) {
  const [addedToBasket, setAddedToBasket] = useState(inBasket);

  // menu context
  const menuContext = useContext(MenuContext);
  const { postBasketQuery, basketCountQuery, setBasketType } = menuContext;

  // basket animation
  //   const assetControls = useAnimationControls();

  const toggleAddToBasket = async () => {
    // if (!addedToBasket) {
    //   await assetControls.start({ scale: 1 }, { duration: 0.3 });
    //   await assetControls.start({ top: 14, right: 155 });
    //   await assetControls.start({ scale: 0 }, { duration: 0.3 });
    // }

    setAddedToBasket((prev) => !prev);
    setBasketType((prev) => (prev === "add" ? "remove" : "add"));

    await postBasketQuery?.refetch();
    await basketCountQuery?.refetch();
  };

  useEffect(() => {
    setBasketType(inBasket ? "remove" : "add");
  }, []);

  return (
    <Button
      onClick={toggleAddToBasket}
      type={addedToBasket ? "cancel" : "primary"}
      icon={addedToBasket ? "X" : "Basket"}
      text={addedToBasket ? "Remove from basket" : "Add to basket"}
    />
  );
}
