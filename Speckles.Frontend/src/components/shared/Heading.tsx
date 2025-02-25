import FadeIn from "../animation/FadeIn";
import Button from "./Button";
import { IconNames, IconWeight } from "./Icon";

interface Props {
  title: string;
  subtitle?: string;
  animate?: boolean;
  color?: "black" | "white";
  heading?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  delay?: number;
  button?: {
    icon?: {
      name?: IconNames;
      weight?: IconWeight;
      iconDirection?: "left" | "right";
    };
    onClick?: () => void;
    text?: string;
  };
}

export default function Heading({
  title,
  subtitle,
  animate = true,
  color = "black",
  heading = "h1",
  delay = 0,
  button,
}: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-4">
        <FadeIn
          animate={animate}
          delay={delay}
          className={color === "black" ? "text-black-primary" : "text-white"}
        >
          {heading === "h1" ? (
            <h1 className="heading text-4xl">{title}</h1>
          ) : heading === "h2" ? (
            <h2 className="text-3xl font-bold">{title}</h2>
          ) : heading === "h3" ? (
            <h3 className="text-2xl font-bold">{title}</h3>
          ) : heading === "h4" ? (
            <h4 className="text-xl font-bold">{title}</h4>
          ) : heading === "h5" ? (
            <h5 className="text-lg font-bold">{title}</h5>
          ) : (
            <h6 className="text-base font-bold">{title}</h6>
          )}
        </FadeIn>

        {subtitle && (
          <FadeIn delay={delay} animate={animate}>
            <p className="max-w-[35rem]">{subtitle}</p>
          </FadeIn>
        )}
      </div>

      {button && (
        <Button
          text={button?.text}
          icon={button?.icon}
          size="small"
          onClick={button.onClick}
        />
      )}
    </div>
  );
}
