import React, { ComponentProps, ComponentType } from "react";
import * as Icons from "@phosphor-icons/react/dist/ssr";

export type IconWeight = "bold" | "duotone" | "fill" | "regular" | "thin";
export type IconNames = keyof typeof Icons;

interface Props {
  name: IconNames;
  size?: number;
  weight?: IconWeight;
  color?: string;
  className?: ComponentProps<"div">["className"];
}

const Icon = ({
  name,
  size = 24,
  weight = "regular",
  color = "currentColor",
  className,
}: Props) => {
  const PhosphorIcon = Icons[name] as ComponentType<{
    size?: number;
    weight?: IconWeight;
    color?: string;
    className?: string;
    weights?: unknown;
  }>;

  return (
    <PhosphorIcon
      size={size}
      weight={weight}
      color={color}
      className={className}
    />
  );
};

export default Icon;
