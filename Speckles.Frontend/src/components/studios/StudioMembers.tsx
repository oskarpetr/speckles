import FadeIn from "../anim/FadeIn";
import Section from "../common/Section";
import Asset from "../assets/Asset";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { IMemberShort } from "@/types/Member.types";
import Member from "./Member";

interface Props {
  members: IMemberShort[];
}

export default function StudioMembers({ members }: Props) {
  return (
    <FadeIn delay={0.2}>
      <Section title="Studio's members" />
      <MemberList members={members} />
    </FadeIn>
  );
}

function MemberList({ members }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-x-6 gap-y-6">
        {members.map((member, index) => (
          <FadeIn key={`member_${member.memberId}`} delay={0.2 + index * 0.05}>
            <Member member={member} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
