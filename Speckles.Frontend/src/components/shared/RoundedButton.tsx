import { cn } from "@/utils/cn";
import Icon from "./Icon";
import * as Icons from "@phosphor-icons/react/dist/ssr";

interface Props {
  icon: keyof typeof Icons;
  onClick?: () => void;
  colorType?: "primary" | "secondary";
}

export default function RoundedButton({
  icon,
  onClick,
  colorType = "primary",
}: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-full transition-all w-fit h-fit focus:ring-4 ring-0",
        colorType === "primary"
          ? "p-4 bg-green-primary hover:bg-green-primary-hover ring-green-primary ring-opacity-30"
          : "p-[calc(1rem-1px)] bg-green-primary bg-opacity-10 hover:bg-opacity-20 border border-green-primary border-opacity-10 ring-green-light ring-opacity-50"
      )}
    >
      <Icon
        name={icon}
        size={24}
        color={colorType === "primary" ? "white" : "#3C672D"}
      />
    </div>
  );
}
