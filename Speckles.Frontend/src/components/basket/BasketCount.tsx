import { BEZIER_CURVE } from "@/utils/animation";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";

export default function BasketCount() {
  // menu context
  const menuContext = useContext(MenuContext);
  const { basketCountQuery } = menuContext;

  // basket count
  const basketCount = (basketCountQuery?.data?.data.count as number) ?? 0;

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
