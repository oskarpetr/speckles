import FadeIn from "../animation/FadeIn";
import { IUserShort } from "@/types/dtos/User.types";
import StudioMember from "./StudioMember";

interface Props {
  members: IUserShort[];
}

export default function StudioMembers({ members }: Props) {
  return (
    <FadeIn delay={0}>
      {/* <Section title="Studio's members" /> */}
      {members.length > 0 ? (
        <div className="grid grid-cols-4 gap-x-6 gap-y-12">
          {members.map((member, index) => (
            <FadeIn key={`member_${member.userId}`} delay={index * 0.05}>
              <StudioMember member={member} />
            </FadeIn>
          ))}

          {/* {canEdit && (
            <FadeIn delay={(members.length + 1) * 0.05}>
              <AddMember />
            </FadeIn>
          )} */}
        </div>
      ) : (
        <div className="text-neutral-500">No members yet</div>
      )}
    </FadeIn>
  );
}
