import { IStudioShort } from "@/types/Studio.types";
import Section from "../common/Section";
import { fetchStudios } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import FadeIn from "../animation/FadeIn";
import HomeStudio from "./HomeStudio";

export default function HomeStudios() {
  return (
    <FadeIn delay={0.3}>
      <Section title="Trending studios" />
      <HomeStudioList />
    </FadeIn>
  );
}

function HomeStudioList() {
  const studiosQuery = useQuery({
    queryKey: ["studios"],
    queryFn: fetchStudios,
  });

  const studios = studiosQuery.data?.data as IStudioShort[];

  return (
    <div className="grid grid-cols-4 gap-6">
      {studiosQuery.isSuccess &&
        studios.map((studio, index) => (
          <HomeStudio
            key={`studio_${studio.studioId}`}
            studio={studio}
            index={index}
          />
        ))}
    </div>
  );
}
