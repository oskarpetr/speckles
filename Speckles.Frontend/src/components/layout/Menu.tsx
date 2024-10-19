"use client";

import {
  Basket,
  Heart,
  MagnifyingGlass,
  Package,
  User,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathName = usePathname();
  const trimmedPathName = pathName.replace("/", "");

  return (
    <div className="flex justify-between items-center px-32 py-8 bg-green-primary fixed w-full top-0 z-10">
      <Link
        href="/"
        className="flex items-center gap-2 active:scale-95 transition-transform"
      >
        <Image
          src="/images/Logo.png"
          alt="Speckles Logo"
          width={50}
          height={50}
          className="w-6 h-6"
        />
        <div className="text-white font-bold text-xl !tracking-tight">
          Speckles
        </div>
      </Link>

      <div className="flex gap-6">
        <button className="active:scale-95 transition-transform">
          <MagnifyingGlass color="white" size={24} />
        </button>

        <Link href="/orders" className="active:scale-95 transition-transform">
          <Package
            color="white"
            size={24}
            weight={trimmedPathName === "orders" ? "fill" : "regular"}
          />
        </Link>

        <Link href="/saved" className="active:scale-95 transition-transform">
          <Heart
            color="white"
            size={24}
            weight={trimmedPathName === "saved" ? "fill" : "regular"}
          />
        </Link>

        <Link
          href="/basket"
          className="relative active:scale-95 transition-transform"
        >
          <Basket
            color="white"
            size={24}
            weight={trimmedPathName === "basket" ? "fill" : "regular"}
          />
          <div className="scale-90 px-2 h-6 rounded-full bg-white outline outline-4 outline-green-primary absolute -top-3 left-4 text-green-primary flex items-center justify-center font-bold">
            3
          </div>
        </Link>

        <Link href="/account" className="active:scale-95 transition-transform">
          <User
            color="white"
            size={24}
            weight={trimmedPathName === "account" ? "fill" : "regular"}
          />
        </Link>
      </div>
    </div>
  );
}
