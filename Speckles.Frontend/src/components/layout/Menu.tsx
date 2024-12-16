"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BasketCount from "../basket/BasketCount";
import Icon from "../shared/Icon";
import Logo from "./Logo";
import Button from "../shared/Button";
import SavedCount from "../saved/SavedCount";
import DropdownMenu from "../shared/DropdownMenu";
import { IMenuItem } from "@/types/MenuItem.types";
import Tooltip from "../shared/Tooltip";
import Avatar from "../shared/Avatar";
import { signOut, useSession } from "next-auth/react";
import PopupTooltip from "../shared/PopupTooltip";
import { cn } from "@/utils/cn";

export default function Menu() {
  // session
  const { data: session, status } = useSession();

  const userMenuItems: IMenuItem[] = [
    {
      link: "/profile",
      text: "Profile",
      icon: "User",
    },
    {
      link: "/settings",
      text: "Settings",
      icon: "GearSix",
    },
    {
      onClick: signOut,
      text: "Log out",
      icon: "SignOut",
    },
  ];

  const menuItems: IMenuItem[] = [
    {
      link: "/profile",
      text: "Profile",
      icon: "User",
    },
    {
      link: "/settings",
      text: "Settings",
      icon: "GearSix",
    },
    {
      link: "orders",
      text: "Orders",
      icon: "Package",
    },
    {
      link: "saved",
      text: "Saved",
      icon: "Heart",
    },
    {
      link: "basket",
      text: "Basket",
      icon: "Basket",
    },
    {
      onClick: signOut,
      text: "Log out",
      icon: "SignOut",
    },
  ];

  const search = () => {};

  return (
    <div
      className={cn(
        "flex justify-between items-center px-16 lg:px-32 py-8 bg-green-primary sticky top-0 w-full z-10 h-24"
        // promotionVisible ? "translate-y-0" : "-translate-y-12"
      )}
    >
      <Logo />

      <div className="flex gap-6 items-center">
        <div className="flex gap-2 items-center">
          <Tooltip text="Search">
            <MenuItem icon="MagnifyingGlass" onClick={search} />
          </Tooltip>

          <div className="hidden md:block">
            {status === "authenticated" && (
              <Tooltip text="Orders">
                <MenuItem icon="Package" link="orders" />
              </Tooltip>
            )}
          </div>

          <div className="hidden md:block">
            <Tooltip text="Saved">
              <MenuItem icon="Heart" link="saved">
                <SavedCount />
              </MenuItem>
            </Tooltip>
          </div>

          <div className="hidden md:block">
            <Tooltip text="Basket">
              <MenuItem icon="Basket" link="basket">
                <BasketCount />
              </MenuItem>
            </Tooltip>
          </div>

          <div className="block md:hidden">
            <Tooltip text="Menu">
              <PopupTooltip button={<MenuItem icon="List" />}>
                <DropdownMenu items={menuItems} />
              </PopupTooltip>
            </Tooltip>
          </div>

          <div className="hidden md:block">
            {status === "authenticated" && (
              <div className="ml-3 flex items-center">
                <PopupTooltip
                  button={
                    <Avatar
                      memberId={session.user.memberId}
                      fullName={session.user.fullName}
                      size={48}
                    />
                  }
                >
                  <DropdownMenu items={userMenuItems} />
                </PopupTooltip>
              </div>
            )}
          </div>
        </div>

        {status === "unauthenticated" && (
          <Link href="/login">
            <Button text="Login" size="small" margin={false} type="white" />
          </Link>
        )}
      </div>
    </div>
  );
}

function MenuItem({ link, onClick, icon, children }: IMenuItem) {
  const pathName = usePathname();
  const trimmedPathName = pathName.replace("/", "");

  const Content = () => (
    <div className="relative active:scale-95 transition-all cursor-pointer w-12 h-12 flex justify-center items-center rounded-full border border-transparent hover:border-white hover:border-opacity-10 hover:bg-white hover:bg-opacity-10">
      {icon && (
        <Icon
          name={icon}
          color="white"
          size={24}
          weight={trimmedPathName === link ? "fill" : "regular"}
        />
      )}
      {children}
    </div>
  );

  return link ? (
    <Link href={"/" + link}>
      <Content />
    </Link>
  ) : (
    <div role="button" onClick={onClick}>
      <Content />
    </div>
  );
}
