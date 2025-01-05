import { BEZIER_CURVE } from "@/utils/animation";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getLocalBasket } from "@/utils/local";
import { useBasketCountQuery } from "@/hooks/useApi";

export default function BasketCount() {
  // session
  const { status } = useSession();

  // fetch basket count
  const basketCountQuery = useBasketCountQuery();

  // basket count
  const [basketCount, setBasketCount] = useState(0);

  const getBasket = async () => {
    if (status === "authenticated") {
      const count = basketCountQuery.data?.data.count ?? 0;
      setBasketCount(count);
    } else {
      const localBasket = getLocalBasket();
      setBasketCount(localBasket.length);
    }
  };

  useEffect(() => {
    getBasket();
  }, [basketCountQuery.data]);

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
