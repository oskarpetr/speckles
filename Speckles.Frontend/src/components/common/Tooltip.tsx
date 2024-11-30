import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
  text: string;
}

export default function Tooltip({ children, text }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const setHovered = () => {
    setTimeout(() => {
      setIsHovered(true);
    }, 500);
  };

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 2 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute whitespace-nowrap z-50 min-w-fit top-[100%] px-6 py-2 shadow-2xl mt-4 rounded-lg bg-neutral-200 border border-black-primary border-opacity-10"
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
