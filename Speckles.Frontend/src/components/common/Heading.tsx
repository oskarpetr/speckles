import { cn } from "@/utils/cn";
import FadeIn from "../animation/FadeIn";

interface Props {
  title: string;
  subtitle?: string;
  animate?: boolean;
  color?: "black" | "white";
  delay?: number;
}

export default function Heading({
  title,
  subtitle,
  animate = true,
  color = "black",
  delay = 0.1,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <FadeIn animate={animate}>
        <h1
          className={cn(
            "heading text-4xl",
            color === "black" ? "text-black-primary" : "text-white-primary"
          )}
        >
          {title}
        </h1>
      </FadeIn>

      {subtitle && (
        <FadeIn delay={delay} animate={animate}>
          <h2 className="max-w-[35rem]">{subtitle}</h2>
        </FadeIn>
      )}
    </div>
  );
}
