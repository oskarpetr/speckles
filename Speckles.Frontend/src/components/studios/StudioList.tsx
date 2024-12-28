import { IStudioShort } from "@/types/dtos/Studio.types";
import Studio from "./Studio";
import FadeIn from "../animation/FadeIn";
import Grid from "../shared/Grid";

interface Props {
  studios: IStudioShort[];
  delay?: number;
}

export default function StudioList({ studios, delay = 0 }: Props) {
  return (
    <Grid perColumn="4">
      {studios.map((studio, index) => (
        <FadeIn delay={delay + index * 0.05} key={`studio_${studio.studioId}`}>
          <Studio studio={studio} />
        </FadeIn>
      ))}
    </Grid>
  );
}
