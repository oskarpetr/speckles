import React from "react";
import * as Icons from "@phosphor-icons/react/dist/ssr";

interface Props {
  name: string;
  size?: number;
  weight?: string;
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
  //@ts-ignore
  const PhosphorIcon = Icons[name];
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
