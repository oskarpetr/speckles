"use client";

import FadeIn from "@/components/animation/FadeIn";
import StudioList from "./StudioList";
import { useMyStudiosQuery } from "@/hooks/useApi";

export default function MyStudios() {
  // fetch my studios
  const studiosQuery = useMyStudiosQuery();
  const studios = studiosQuery.data?.data ?? [];

  return (
    <FadeIn delay={0.1}>
      {studiosQuery.isSuccess && <StudioList studios={studios} delay={0.1} />}
    </FadeIn>
  );
}
