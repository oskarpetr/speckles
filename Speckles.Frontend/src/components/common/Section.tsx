import { cn } from "@/utils/cn";
import { CaretRight } from "@phosphor-icons/react";

interface Props {
  title: string;
  color?: "white" | "black";
}

export default function Section({ title, color = "black" }: Props) {
  return (
    <div className="flex items-center gap-1 mb-4">
      <h1
        className={cn(
          "font-extrabold",
          color === "black" ? "text-black-primary" : "text-white"
        )}
      >
        {title}
      </h1>
      <CaretRight color={color === "black" ? "black" : "white"} />
    </div>
  );
}
