import { IAssetShort } from "@/types/dtos/Asset.types";
import { useQuery } from "@tanstack/react-query";
import Section from "../shared/Section";
import { fetchAssets } from "@/utils/fetchers";
import AssetsList from "../asset/AssetList";

import "swiper/css";
import "swiper/css/navigation";
import { ApiResponse } from "@/types/ApiResponse.types";

export default function ForYou() {
  const assetsQuery = useQuery<ApiResponse<IAssetShort[]>>({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });

  const assets = assetsQuery.data?.data ?? [];

  return (
    <Section title="For you" delay={0.3}>
      {assetsQuery.isSuccess && <AssetsList assets={assets} />}
    </Section>
  );
}
