import { IStudioShort } from "@/types/dtos/Studio.types";
import Studio from "./Studio";
import FadeIn from "../animation/FadeIn";

interface Props {
  studios: IStudioShort[];
  delay?: number;
}

export default function StudioList({ studios, delay = 0 }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {studios.map((studio, index) => (
        <FadeIn delay={delay + index * 0.05} key={`studio_${studio.studioId}`}>
          <Studio studio={studio} />
        </FadeIn>
      ))}
    </div>
  );
}
