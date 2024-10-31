"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BasketCount from "../orders/BasketCount";
import Icon from "../common/Icon";
import { ReactNode } from "react";
import Logo from "./Logo";
import Button from "../common/Button";

export default function Menu() {
  const logged = false;

  return (
    <div className="flex justify-between items-center px-32 py-8 bg-green-primary fixed w-full top-0 z-10 h-24">
      <Logo />

      <div className="flex gap-12">
        <div className="flex gap-6 items-center">
          <button className="active:scale-95 transition-transform">
            <MagnifyingGlass color="white" size={24} />
          </button>

          <MenuItem icon="Package" link="orders" />
          <MenuItem icon="Heart" link="saved" />

          <MenuItem icon="Basket" link="basket">
            <BasketCount />
          </MenuItem>

          {logged && <MenuItem icon="User" link="account" />}
        </div>

        {!logged && (
          <Link href="/login">
            <Button text="Login" size="small" margin={false} type="white" />
          </Link>
        )}
      </div>
    </div>
  );
}

interface Props {
  link: string;
  icon: string;
  children?: ReactNode;
}

function MenuItem({ link, icon, children }: Props) {
  const pathName = usePathname();
  const trimmedPathName = pathName.replace("/", "");

  return (
    <Link
      href={"/" + link}
      className="relative active:scale-95 transition-transform"
    >
      <Icon
        name={icon}
        color="white"
        size={24}
        weight={trimmedPathName === link ? "fill" : "regular"}
      />
      {children}
    </Link>
  );
}
