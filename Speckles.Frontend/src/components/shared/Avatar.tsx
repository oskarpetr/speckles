import { IUserShort } from "@/types/dtos/User.types";
import { getAvatarAlt } from "@/utils/alts";
import { getAvatar } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: IUserShort;
  size: number;
  link?: boolean;
}

export default function Avatar({ user, size, link = false }: Props) {
  const AvatarImage = () => (
    <Image
      src={getAvatar(user.userId)}
      alt={getAvatarAlt(user.fullName)}
      width={100}
      height={100}
      style={{
        minWidth: size,
        maxWidth: size,
        height: size,
      }}
      className="rounded-full border w-fit border-white border-opacity-20 transition-all focus:ring-4 ring-0 ring-opacity-30 ring-white"
    />
  );

  return link ? (
    <Link
      href={`/profiles/${user.username}`}
      className="relative group overflow-hidden rounded-full w-fit"
      style={{
        minWidth: size,
        maxWidth: size,
        height: size,
      }}
    >
      <AvatarImage />
      <div className="absolute top-0 left-0 w-full h-full bg-black-primary bg-opacity-0 group-hover:bg-opacity-10 transition-colors"></div>
    </Link>
  ) : (
    <AvatarImage />
  );
}
