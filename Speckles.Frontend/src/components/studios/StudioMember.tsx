import { IMemberShort } from "@/types/Member.types";
import { getAvatar } from "@/utils/images";
import Image from "next/image";
import Link from "next/link";
import Avatar from "../common/Avatar";

interface Props {
  member: IMemberShort;
}

export default function StudioMember({ member }: Props) {
  return (
    <Link
      href={`/members/${member.username}`}
      className="flex items-center gap-6"
    >
      <Avatar
        fullName={member.fullName}
        memberId={member.memberId}
        size={120}
      />
      <div>
        <div className="text-lg font-bold">{member.fullName}</div>
        <div className="opacity-80">Graphic designer</div>
      </div>
    </Link>
  );
}
