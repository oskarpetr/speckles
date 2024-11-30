import { getAvatarAlt } from "@/utils/alts";
import { getAvatar } from "@/utils/images";
import Image from "next/image";

interface Props {
  memberId: string;
  fullName: string;
  size: number;
}

export default function Avatar({ memberId, fullName, size }: Props) {
  return (
    <div className="relative group overflow-hidden rounded-full">
      <Image
        src={getAvatar(memberId)}
        alt={getAvatarAlt(fullName)}
        width={100}
        height={100}
        style={{
          minWidth: size,
          maxWidth: size,
          height: size,
        }}
        className="rounded-full border border-white border-opacity-20 transition-all focus:ring-4 ring-0 ring-opacity-30 ring-white"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black-primary bg-opacity-0 group-hover:bg-opacity-10 transition-colors"></div>
    </div>
  );
}
