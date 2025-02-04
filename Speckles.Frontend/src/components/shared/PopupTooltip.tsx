import { cn } from "@/utils/cn";
import { Menu, MenuButton, MenuItems, Transition } from "@headlessui/react";
import { ComponentProps, Fragment, ReactNode } from "react";

interface Props {
  button: ReactNode;
  children: ReactNode;
  anchor?:
    | "left end"
    | "left start"
    | "right end"
    | "right start"
    | "top end"
    | "top start"
    | "bottom end"
    | "bottom start";
  className?: ComponentProps<"div">["className"];
}

export default function PopupTooltip({
  button,
  children,
  anchor = "bottom end",
  className,
}: Props) {
  return (
    <Menu>
      <MenuButton>{button}</MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95 translate-y-2"
        enterTo="opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100 translate-y-0"
        leaveTo="opacity-0 scale-95 translate-y-2"
      >
        <MenuItems
          anchor={anchor}
          className={cn(
            "absolute flex flex-col items-center z-50 shadow-[0px_0px_15px_10px_rgba(0,_0,_0,_0.2)] rounded-lg bg-neutral-100 border border-black-primary border-opacity-10",
            anchor === "bottom end"
              ? "mt-4 ml-8"
              : anchor === "top end"
              ? "-mt-4"
              : "",
            className
          )}
          autoFocus={false}
        >
          {children}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
