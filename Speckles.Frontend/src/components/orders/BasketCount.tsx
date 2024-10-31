import { BEZIER_CURVE } from "@/utils/animation";
import { fetchBasketCount } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function BasketCount() {
  const memberId = "0f44ee84-dcf2-483c-a084-102712b6b19e";

  const basketCountQuery = useQuery({
    queryKey: ["basket", memberId, "count"],
    queryFn: () => fetchBasketCount(memberId),
  });

  const basketCount = (basketCountQuery.data?.data.basketCount as number) ?? 0;

  return (
    <AnimatePresence>
      {basketCountQuery.isSuccess && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ ease: BEZIER_CURVE }}
          className="scale-90 px-2 h-6 rounded-full bg-white outline outline-4 outline-green-primary absolute -top-3 left-4 text-green-primary flex items-center justify-center font-black"
        >
          {basketCount}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
