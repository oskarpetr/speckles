import { BEZIER_CURVE } from "@/utils/animation";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../context/MenuContext";
import { useSession } from "next-auth/react";
import { getLocalBasket } from "@/utils/local";

export default function BasketCount() {
  // session
  const { status } = useSession();

  // menu context
  const menuContext = useContext(MenuContext);

  // basket count
  const [basketCount, setBasketCount] = useState(0);

  const getBasket = async () => {
    if (status === "authenticated") {
      const fetch = await menuContext.basketCountQuery?.refetch();
      setBasketCount(fetch?.data?.data?.count || 0);
    } else {
      const localBasket = getLocalBasket();
      setBasketCount(localBasket.length);
    }
  };

  useEffect(() => {
    getBasket();
  }, []);

  return (
    <AnimatePresence>
      {basketCount !== 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ ease: BEZIER_CURVE }}
          className="min-w-5 h-5 rounded-full bg-white outline outline-4 outline-green-primary absolute top-1 left-[30px] text-green-primary flex items-center justify-center text-sm font-black"
        >
          {basketCount}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
