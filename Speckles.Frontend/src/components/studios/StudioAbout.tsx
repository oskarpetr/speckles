import FadeIn from "../animation/FadeIn";
import { IStudio } from "@/types/Studio.types";

interface Props {
  studio: IStudio;
}

export default function StudioAbout({ studio }: Props) {
  return (
    <FadeIn delay={0} className="flex flex-col gap-12 max-w-[35rem]">
      <div>{studio.portfolio.about}</div>

      <div>
        <div className="font-bold">Contact Email</div>
        <div className="opacity-80">{studio.contactEmail}</div>
      </div>
    </FadeIn>
  );
}
