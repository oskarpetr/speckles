import { IStudioShort } from "@/types/Studio.types";
import Section from "../shared/Section";
import { fetchStudios } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import FadeIn from "../animation/FadeIn";
import HomeStudio from "./HomeStudio";

export default function TrendingStudios() {
  return (
    <FadeIn delay={0.3}>
      <Section title="Trending studios" />
      <TrendingStudiosList />
    </FadeIn>
  );
}

function TrendingStudiosList() {
  const studiosQuery = useQuery({
    queryKey: ["studios"],
    queryFn: fetchStudios,
  });

  const studios = studiosQuery.data?.data as IStudioShort[];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
