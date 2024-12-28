import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  perColumn?: "3" | "4";
}

export default function Grid({ children, perColumn = "3" }: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full",
        perColumn === "4" ? "xl:grid-cols-4" : ""
      )}
    >
      {children}
    </div>
  );
}
