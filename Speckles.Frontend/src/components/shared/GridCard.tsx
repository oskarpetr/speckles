import { IMenuItem } from "@/types/MenuItem.types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PopupTooltip from "./PopupTooltip";
import { cn } from "@/utils/cn";
import Button from "./Button";
import DropdownMenu from "./DropdownMenu";

interface Props {
  title: string;
  secondaryElement?: JSX.Element;
  link: string;
  imageSrc: string;
  imageAlt: string;
  menuItems?: IMenuItem[];
  canEdit?: boolean;
}

export default function GridCard({
  title,
  secondaryElement,
  link,
  imageSrc,
  imageAlt,
  menuItems,
  canEdit,
}: Props) {
  // hovered state
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
    >
      {menuItems && canEdit && (
        <GridCardMenu hovered={hovered} menuItems={menuItems} />
      )}

      <Link href={link} className="z-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={0}
          priority
          // placeholder="blur"
          // blurDataURL={base64}
          className="w-full h-full p-0 object-cover object-center"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black-primary bg-opacity-0 group-hover:bg-opacity-10 transition-colors"></div>

        <div className="flex justify-between items-center absolute bottom-0 left-0 px-8 pb-4 pt-12 w-full bg-gradient-to-t from-[#12121280] to-[#12121200]">
          <div className="font-bold text-white">{title}</div>
          {secondaryElement}
        </div>
      </Link>
    </div>
  );
}

interface SkeletonProps {
  title: string;
  secondaryElement?: JSX.Element;
}

export function SkeletonGridCard({ title, secondaryElement }: SkeletonProps) {
  return (
    <div className="rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300">
      <div>
        <div className="absolute top-0 left-0 w-full h-full bg-black-primary bg-opacity-0 group-hover:bg-opacity-10 transition-colors"></div>

        <div className="flex justify-between items-center absolute bottom-0 left-0 px-8 pb-4 pt-12 w-full bg-gradient-to-t from-[#12121280] to-[#12121200]">
          <div className="font-bold text-white">{title}</div>
          {secondaryElement}
        </div>
      </div>
    </div>
  );
}

export function gridCardDelay(delay: number, index: number) {
  return delay + index * 0.05;
}

interface MenuProps {
  hovered: boolean;
  menuItems: IMenuItem[];
}

export function GridCardMenu({ hovered, menuItems }: MenuProps) {
  return (
    <PopupTooltip
      button={
        <div
          className={cn(
            "absolute top-4 right-4 w-10 h-10 z-10 flex items-center justify-center transition-all duration-200 origin-bottom-left",
            hovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          <Button icon={{ name: "DotsThree" }} type="white" circle />
        </div>
      }
      anchor="right start"
      className="ml-2 mt-2"
    >
      <DropdownMenu items={menuItems} />
    </PopupTooltip>
  );
}
