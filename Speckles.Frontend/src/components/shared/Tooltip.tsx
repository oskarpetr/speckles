import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  direction?: "top" | "right" | "bottom" | "left";
  text: string;
}

export default function Tooltip({
  children,
  direction = "bottom",
  text,
}: Props) {
  // show tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={cn(
        "relative z-50 flex items-center w-fit",
        direction === "bottom"
          ? "flex-col"
          : direction === "top"
          ? "flex-col-reverse"
          : direction === "right"
          ? "flex-row"
          : "flex-row-reverse"
      )}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute whitespace-nowrap z-50 min-w-fit px-6 py-2 shadow-2xl rounded-lg bg-neutral-200 border border-black-primary border-opacity-10",
              direction === "bottom"
                ? "top-[100%] mt-4"
                : direction === "top"
                ? "bottom-[100%] mb-4"
                : direction === "right"
                ? "left-[100%] ml-4"
                : "right-[100%] mr-4"
            )}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
