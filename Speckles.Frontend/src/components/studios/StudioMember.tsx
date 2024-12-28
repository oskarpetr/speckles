import { IUserShort } from "@/types/dtos/User.types";
import Avatar from "../shared/Avatar";

interface Props {
  member: IUserShort;
}

export default function StudioMember({ member }: Props) {
  return (
    <div className="flex items-center gap-6">
      <Avatar user={member} size={120} link />
      <div>
        <div className="text-lg font-bold">{member.fullName}</div>
        <div className="opacity-80">Graphic designer</div>
      </div>
    </div>
  );
}
