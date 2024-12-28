import { IUserShort } from "@/types/dtos/User.types";
import Link from "next/link";
import Avatar from "../shared/Avatar";

interface Props {
  member: IUserShort;
}

export default function StudioMember({ member }: Props) {
  return (
    <Link
      href={`/profile/${member.username}`}
      className="flex items-center gap-6"
    >
      <Avatar fullName={member.fullName} userId={member.userId} size={120} />
      <div>
        <div className="text-lg font-bold">{member.fullName}</div>
        <div className="opacity-80">Graphic designer</div>
      </div>
    </Link>
  );
}
