import { IMenuItem } from "@/types/MenuItem.types";
import { cn } from "@/utils/cn";
import { MenuItem } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  items: IMenuItem[];
}

export default function DropdownMenu({ items }: Props) {
  return (
    <div className="w-52 p-1 flex flex-col items-center">
      {items.map((item, index) => (
        <Fragment key={`dropdown_${item.text}`}>
          <MenuItem>
            {({ focus }) => (
              <div className="w-full">
                {item.link ? (
                  <Link href={item.link}>
                    <DropdownMenuItem item={item} focus={focus} />
                  </Link>
                ) : (
                  <button onClick={item.onClick} className="w-full">
                    <DropdownMenuItem item={item} focus={focus} />
                  </button>
                )}
              </div>
            )}
          </MenuItem>

          {index !== items.length - 1 && (
            <div className="h-[1px] w-4/5 bg-green-primary bg-opacity-20"></div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

function DropdownMenuItem({
  item,
  focus,
}: {
  item: IMenuItem;
  focus: boolean;
}) {
  return (
    <div
      className={cn(
        "px-6 py-2 w-full rounded-md transition-colors flex items-center gap-3",
        focus ? "bg-black bg-opacity-10" : "bg-transparent"
      )}
    >
      {/* {item.icon && <Icon name={item.icon} size={20} className="opacity-50" />} */}
      {item.text}
    </div>
  );
}
