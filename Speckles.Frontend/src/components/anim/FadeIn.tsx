"use client";

import { ComponentProps, ReactNode } from "react";
import { motion } from "framer-motion";
import { BEZIER_CURVE } from "@/utils/anim";

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
  return animate ? (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: BEZIER_CURVE }}
      className={className}
    >
      {children}
    </motion.div>
  ) : (
    children
  );
}
