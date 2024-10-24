import { IMemberShort } from "@/types/Member.types";
import { getAvatar } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";

interface Props {
  member: IMemberShort;
}

export default function Member({ member }: Props) {
  return (
    <Link
      href={`/members/${member.username}`}
      className="flex items-center gap-6"
    >
      <Image
        src={getAvatar(member.memberId)}
        alt={`${member.username}'s Avatar`}
        width={100}
        height={100}
        className="w-[5.5rem] h-[5.5rem] rounded-full"
      />
      <div>
        <div className="text-lg font-bold">{member.username}</div>
        <div className="opacity-80">Graphic designer</div>
      </div>
    </Link>
  );
}
