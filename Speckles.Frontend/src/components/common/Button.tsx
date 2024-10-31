import { cn } from "@/utils/cn";
import Icon from "./Icon";

interface Props {
  onClick?: () => void;
  type?: "primary" | "cancel" | "white";
  icon?: string;
  text?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  iconDirection?: "left" | "right";
  size?: "small" | "normal";
  margin?: boolean;
}

export default function Button({
  onClick,
  type = "primary",
  icon,
  text,
  disabled = false,
  fullWidth = true,
  iconDirection = "left",
  size = "normal",
  margin = true,
}: Props) {
  return (
    <button
      onClick={onClick}
      type={type === "primary" ? "submit" : "button"}
      disabled={disabled}
      className={cn(
        "disabled:opacity-80 flex items-center justify-center gap-2 rounded-lg text-white font-bold transition-colors",
        type === "primary"
          ? "bg-green-primary hover:bg-green-primary-hover"
          : type === "cancel"
          ? "bg-neutral-500 hover:bg-neutral-600"
          : type === "white"
          ? "bg-white hover:bg-neutral-200 text-green-primary"
          : "",
        fullWidth ? "w-full" : "min-w-fit",
        iconDirection === "left" ? "flex" : "flex-row-reverse",
        size === "normal" ? "py-4 px-8" : "px-6 py-2",
        margin ? "mt-8" : ""
      )}
    >
      {icon && <Icon name={icon} size={24} />}
      {text}
    </button>
  );
}
