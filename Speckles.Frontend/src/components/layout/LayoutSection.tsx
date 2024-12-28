import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  padding?: boolean;
}

export const layoutSectionPadding = "px-16 lg:px-32 py-20 transition-[padding]";

export default function LayoutSection({ children, padding = true }: Props) {
  return (
    <section
      className={cn(
        "flex flex-col gap-20",
        padding ? layoutSectionPadding : ""
      )}
    >
      {children}
    </section>
  );
}
