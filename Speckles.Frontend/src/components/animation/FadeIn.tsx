"use client";

import { ComponentProps, Fragment, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BEZIER_CURVE } from "@/utils/animation";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: ComponentProps<"div">["className"];
  animate?: boolean;
}

export default function FadeIn({
  children,
  delay = 0,
  className,
  animate = true,
}: Props) {
  return (
    <Fragment>
      <AnimatePresence mode="wait">
        {animate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay, duration: 0.5, ease: BEZIER_CURVE }}
            className={className}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {!animate && children}
    </Fragment>
  );
}
