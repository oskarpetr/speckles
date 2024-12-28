import { IStudioShort } from "@/types/dtos/Studio.types";
import Section from "../shared/Section";
import { fetchStudios } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import StudioList from "../studios/StudioList";
import { ApiResponse } from "@/types/ApiResponse.types";

export default function TrendingStudios() {
  const studiosQuery = useQuery<ApiResponse<IStudioShort[]>>({
    queryKey: ["studios"],
    queryFn: () => fetchStudios(),
  });

  const studios = studiosQuery.data?.data ?? [];

  return (
    <Section title="Trending studios" delay={0.4}>
      {studiosQuery.isSuccess && <StudioList studios={studios} delay={0.4} />}
    </Section>
  );
}
