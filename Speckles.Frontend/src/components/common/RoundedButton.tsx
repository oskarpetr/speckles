import { cn } from "@/utils/cn";
import Icon from "./Icon";

interface Props {
  icon: string;
  onClick?: () => void;
  colorType?: "primary" | "secondary";
}

export default function RoundedButton({
  icon,
  onClick,
  colorType = "primary",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full transition-colors",
        colorType === "primary"
          ? "p-4 bg-green-primary hover:bg-green-primary-hover"
          : "p-[calc(1rem-1px)] bg-green-primary bg-opacity-10 hover:bg-opacity-20 border border-black-primary border-opacity-10"
      )}
    >
      <Icon
        name={icon}
        size={24}
        color={colorType === "primary" ? "white" : "#3C672D"}
      />
    </button>
  );
}
