import Section from "../shared/Section";
import StudioList from "../studios/StudioList";
import { useStudiosQuery } from "@/hooks/useApi";

export default function TrendingStudios() {
  // fetch studios
  const studiosQuery = useStudiosQuery();
  const studios = studiosQuery.data?.data ?? [];

  return (
    <Section title="Trending studios" delay={0.4}>
      <StudioList
        studios={studios}
        delay={0.4}
        skeleton={!studiosQuery.isSuccess}
      />
    </Section>
  );
}
