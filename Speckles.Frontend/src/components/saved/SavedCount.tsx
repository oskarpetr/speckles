import { BEZIER_CURVE } from "@/utils/animation";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getLocalSaved } from "@/utils/local";
import { useSession } from "next-auth/react";
import { useSavedCountQuery } from "@/hooks/useApi";

export default function SavedCount() {
  // session
  const { status } = useSession();

  // fetch saved count
  const savedCountQuery = useSavedCountQuery();

  // saved count
  const [savedCount, setSavedCount] = useState(0);

  const getSaved = async () => {
    if (status === "authenticated") {
      const count = savedCountQuery.data?.data.count ?? 0;
      setSavedCount(count);
    } else {
      const localSaved = getLocalSaved();
      setSavedCount(localSaved.length);
    }
  };

  useEffect(() => {
    getSaved();
  }, [savedCountQuery.data]);

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
