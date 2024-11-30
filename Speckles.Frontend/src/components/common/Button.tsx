import { cn } from "@/utils/cn";
import Icon from "./Icon";
import Image from "next/image";

interface Props {
  onClick?: () => void;
  type?: "primary" | "cancel" | "white" | "black";
  icon?: string;
  text?: string;
  secondaryText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  iconDirection?: "left" | "right";
  size?: "small" | "normal";
  margin?: boolean;
  image?: string;
  loading?: boolean;
}

export default function Button({
  onClick,
  type = "primary",
  icon,
  text,
  secondaryText,
  disabled = false,
  fullWidth = true,
  iconDirection = "left",
  size = "normal",
  margin = true,
  image,
  loading,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type === "primary" ? "submit" : "button"}
      disabled={disabled}
      className={cn(
        "disabled:opacity-80 focus:ring-4 ring-0 ring-opacity-30 flex items-center gap-2 rounded-lg text-white transition-all",
        type === "primary"
          ? "bg-green-primary hover:bg-green-primary-hover ring-green-primary *:font-bold"
          : type === "cancel"
          ? "bg-neutral-600 hover:bg-neutral-700 ring-neutral-600 *:font-bold"
          : type === "white"
          ? "bg-white hover:bg-neutral-200 text-black-primary ring-white"
          : type === "black"
          ? "bg-black-primary hover:bg-neutral-900 text-white ring-neutral-900"
          : "",
        fullWidth ? "w-full" : "min-w-fit",
        iconDirection === "left" ? "flex" : "flex-row-reverse",
        size === "normal" ? "py-4 px-8" : "px-6 py-2",
        margin ? "mt-8" : "",
        text && secondaryText ? "justify-between" : "justify-center"
      )}
    >
      {icon && (
        <Icon
          name={loading ? "Spinner" : icon}
          size={24}
          className={loading ? "animate-spin" : ""}
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
    </button>
  );
}
