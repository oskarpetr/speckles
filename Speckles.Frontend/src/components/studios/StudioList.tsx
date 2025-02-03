import { IStudioShort } from "@/types/dtos/Studio.types";
import StudioItem, { SkeletonStudioItem } from "./StudioItem";
import FadeIn from "../animation/FadeIn";
import Grid from "../shared/Grid";

interface Props {
  studios: IStudioShort[];
  delay?: number;
  skeleton?: boolean;
}

export default function StudioList({
  studios,
  delay = 0,
  skeleton = false,
}: Props) {
  return (
    <Grid perColumn="4">
      {!skeleton &&
        studios.map((studio, index) => (
          <FadeIn
            delay={delay + index * 0.05}
            key={`studio_${studio.studioId}`}
          >
            <StudioItem studio={studio} />
          </FadeIn>
        ))}

      {skeleton &&
        [...Array(4)].map((_, index) => (
          <FadeIn key={`skeleton_studio_${index}`} delay={delay + index * 0.05}>
            <SkeletonStudioItem />
          </FadeIn>
        ))}
    </Grid>
  );
}
