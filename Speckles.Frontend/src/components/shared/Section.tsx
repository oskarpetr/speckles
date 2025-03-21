import { cn } from "@/utils/cn";
import { CaretRight } from "@phosphor-icons/react";
import { ComponentProps, ReactNode } from "react";
import FadeIn from "../animation/FadeIn";
import Heading from "./Heading";

interface Props {
  title: string;
  color?: "white" | "black";
  chevron?: boolean;
  children: ReactNode;
  delay?: number;
  className?: ComponentProps<"div">["className"];
}

export default function Section({
  title,
  color = "black",
  chevron = true,
  children,
  delay = 0,
  className,
}: Props) {
  return (
    <FadeIn delay={delay} className={cn("w-full", className)}>
      <div className="flex items-center gap-1 mb-4">
        <h2
          className={cn(
            "font-bold",
            color === "black" ? "text-black-primary" : "text-white"
          )}
        >
          {title}
        </h2>

        {chevron && (
          <CaretRight color={color === "black" ? "black" : "white"} />
        )}
      </div>

      <div className="flex flex-col">{children}</div>
    </FadeIn>
  );
}
