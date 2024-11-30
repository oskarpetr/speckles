import FadeIn from "../animation/FadeIn";
import { IMemberShort } from "@/types/Member.types";
import StudioMember from "./StudioMember";

interface Props {
  members: IMemberShort[];
}

export default function StudioMembers({ members }: Props) {
  return (
    <FadeIn delay={0}>
      {/* <Section title="Studio's members" /> */}
      <StudioMemberList members={members} />
    </FadeIn>
  );
}

function StudioMemberList({ members }: Props) {
  return (
    <div>
      {members.length > 0 ? (
        <div className="grid grid-cols-4 gap-x-6 gap-y-12">
          {[...members, ...members, ...members].map((member, index) => (
            <FadeIn key={`member_${member.memberId}`} delay={0 + index * 0.05}>
              <StudioMember member={member} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="text-neutral-500">No members yet</div>
      )}
    </div>
  );
}
