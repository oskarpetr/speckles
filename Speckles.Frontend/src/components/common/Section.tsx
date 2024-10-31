import { cn } from "@/utils/cn";
import { CaretRight } from "@phosphor-icons/react";

interface Props {
  title: string;
  color?: "white" | "black";
  chevron?: boolean;
}

export default function Section({
  title,
  color = "black",
  chevron = true,
}: Props) {
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
      {chevron && <CaretRight color={color === "black" ? "black" : "white"} />}
    </div>
  );
}
