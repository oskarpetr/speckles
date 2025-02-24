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
        className="w-5 h-5"
      />
      <div className="text-white font-bold text-xl !tracking-tight">
        Speckles
      </div>
    </Link>
  );
}

export function SpecklesLogoPDF() {
  return (
    <div className="flex items-center gap-2 w-fit">
      <img src="/images/Logo.png" alt="Speckles Logo" width={15} height={15} />
      <div className="text-white font-bold text-lg !tracking-tight">
        Speckles
      </div>
    </div>
  );
}
