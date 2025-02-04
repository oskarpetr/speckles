import { IStudioShort } from "@/types/dtos/Studio.types";
import StudioItem, { SkeletonStudioItem } from "./StudioItem";
import FadeIn from "../animation/FadeIn";
import Grid from "../shared/Grid";
import { gridCardDelay } from "../shared/GridCard";

interface Props {
  delay?: number;
  studios?: IStudioShort[];
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
        studios &&
        studios.map((studio, index) => (
          <FadeIn
            key={`studio_${studio.studioId}`}
            delay={gridCardDelay(delay, index)}
          >
            <StudioItem studio={studio} />
          </FadeIn>
        ))}

      {skeleton &&
        [...Array(4)].map((_, index) => (
          <FadeIn
            key={`skeleton_studio_${index}`}
            delay={gridCardDelay(delay, index)}
          >
            <SkeletonStudioItem />
          </FadeIn>
        ))}
    </Grid>
  );
}
