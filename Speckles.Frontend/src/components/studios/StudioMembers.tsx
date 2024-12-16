import FadeIn from "../animation/FadeIn";
import { IMemberShort } from "@/types/Member.types";
import StudioMember from "./StudioMember";
import AddMember from "./AddMember";

interface Props {
  members: IMemberShort[];
  canEdit: boolean;
}

export default function StudioMembers({ members, canEdit }: Props) {
  return (
    <FadeIn delay={0}>
      {/* <Section title="Studio's members" /> */}
      <StudioMemberList members={members} canEdit={canEdit} />
    </FadeIn>
  );
}

function StudioMemberList({ members, canEdit }: Props) {
  return (
    <div>
      {members.length > 0 ? (
        <div className="grid grid-cols-4 gap-x-6 gap-y-12">
          {members.map((member, index) => (
            <FadeIn key={`member_${member.memberId}`} delay={index * 0.05}>
              <StudioMember member={member} />
            </FadeIn>
          ))}

          {canEdit && (
            <FadeIn delay={(members.length + 1) * 0.05}>
              <AddMember />
            </FadeIn>
          )}
        </div>
      ) : (
        <div className="text-neutral-500">No members yet</div>
      )}
    </div>
  );
}
