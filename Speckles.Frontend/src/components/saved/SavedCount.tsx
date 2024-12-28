import { BEZIER_CURVE } from "@/utils/animation";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../context/MenuContext";
import { getLocalSaved } from "@/utils/local";
import { useSession } from "next-auth/react";

export default function SavedCount() {
  // session
  const { status } = useSession();

  // menu context
  const menuContext = useContext(MenuContext);

  // saved count
  const [savedCount, setSavedCount] = useState(0);

  const getSaved = async () => {
    if (status === "authenticated" && menuContext.savedCountQuery !== null) {
      const fetch = await menuContext.savedCountQuery?.refetch();
      setSavedCount(fetch?.data?.data?.count || 0);
    } else {
      const localSaved = getLocalSaved();
      setSavedCount(localSaved.length);
    }
  };

  useEffect(() => {
    getSaved();
  }, []);

  return (
    <AnimatePresence>
      {savedCount !== 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ ease: BEZIER_CURVE }}
          className="min-w-5 h-5 rounded-full bg-white outline outline-4 outline-green-primary absolute top-1 left-[30px] text-green-primary flex items-center justify-center text-sm font-black"
        >
          {savedCount}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
