import Section from "../shared/Section";
import AssetList from "../asset/AssetList";
import { useAssetsQuery } from "@/hooks/useApi";

import "swiper/css";
import "swiper/css/navigation";

export default function ForYou() {
  // fetch assets
  const assetsQuery = useAssetsQuery();
  const assets = assetsQuery.data?.data ?? [];

  return (
    <Section title="For you" delay={0.3}>
      <AssetList
        assets={assets}
        skeleton={!assetsQuery.isSuccess}
        delay={0.3}
      />
    </Section>
  );
}
