import { cn } from "@/utils/cn";
import Icon, { IconNames, IconWeight } from "./Icon";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  type?: "primary" | "secondary" | "cancel" | "white" | "black";
  size?: "small" | "normal";

  icon?: {
    name?: IconNames;
    weight?: IconWeight;
    iconDirection?: "left" | "right";
  };

  text?: string;
  secondaryText?: string;

  disabled?: boolean;
  fullWidth?: boolean;
  marginTop?: boolean;
  circle?: boolean;

  image?: string;
  loading?: boolean;
  children?: ReactNode;
}

export default function Button({
  onClick,
  type = "primary",
  size = "normal",
  icon = {},
  text,
  secondaryText,
  disabled = false,
  fullWidth = false,
  marginTop = false,
  circle = false,
  image,
  loading,
  children,
}: Props) {
  if (!icon.iconDirection) icon.iconDirection = "left";
  if (!icon.weight) icon.weight = "regular";

  return (
    <button
      onClick={onClick}
      type={type === "primary" ? "submit" : "button"}
      disabled={disabled}
      className={cn(
        "disabled:opacity-80 focus:ring-4 ring-0 ring-opacity-30 min-w-fit flex items-center gap-2 text-white transition-all",
        type === "primary"
          ? "bg-green-primary hover:bg-green-primary-hover ring-green-primary *:font-bold"
          : type === "secondary"
          ? "bg-green-primary bg-opacity-10 hover:bg-opacity-20 ring-green-primary text-green-primary ring-opacity-30 border border-black-primary border-opacity-10"
          : type === "cancel"
          ? "bg-neutral-600 hover:bg-neutral-700 ring-neutral-600 *:font-bold"
          : type === "white"
          ? "bg-white hover:bg-neutral-200 text-black-primary ring-white"
          : type === "black"
          ? "bg-black-primary hover:bg-neutral-900 text-white ring-neutral-900"
          : "",
        fullWidth ? "w-full" : "w-fit",
        icon.iconDirection === "left" ? "flex-row" : "flex-row-reverse",
        size === "normal" && !circle ? "py-4 px-8" : "px-6 py-2",
        circle ? "p-3" : "",
        marginTop ? "mt-8" : "",
        text && secondaryText ? "justify-between" : "justify-center",
        circle ? "rounded-full" : "rounded-lg"
      )}
    >
      {icon.name && (
        <Icon
          name={loading ? "Spinner" : icon.name}
          size={size === "normal" ? 24 : 20}
          className={loading ? "animate-spin" : ""}
          weight={icon.weight}
        />
      )}

      {image && (
        <Image
          src={image}
          alt="button"
          width={50}
          height={50}
          className="w-6 h-6"
        />
      )}

      {text && <span>{text}</span>}
      {secondaryText && <span>{secondaryText}</span>}

      {children}
    </button>
  );
}
