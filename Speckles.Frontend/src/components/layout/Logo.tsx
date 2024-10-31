import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 active:scale-95 transition-transform w-fit"
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
  );
}
