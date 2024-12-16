import React from "react";
import * as Icons from "@phosphor-icons/react/dist/ssr";

type IconWeight = "bold" | "duotone" | "fill" | "regular" | "thin";

interface Props {
  name: keyof typeof Icons;
  size?: number;
  weight?: IconWeight;
  color?: string;
  className?: React.ComponentProps<"div">["className"];
}

const Icon = ({
  name,
  size = 24,
  weight = "regular",
  color = "currentColor",
  className,
}: Props) => {
  const PhosphorIcon = Icons[name] as React.ComponentType<{
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
