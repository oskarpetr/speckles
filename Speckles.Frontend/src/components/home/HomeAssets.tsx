import { IAssetShort } from "@/types/Asset.types";
import { useQuery } from "@tanstack/react-query";
import FadeIn from "../animation/FadeIn";
import Section from "../common/Section";
import { fetchAssets } from "@/utils/fetchers";
import Asset from "../asset/Asset";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function HomeAssets() {
  return (
    <FadeIn delay={0.2}>
      <Section title="For you" />
      <HomeAssetList />
    </FadeIn>
  );
}

function HomeAssetList() {
  const assetQuery = useQuery({
    queryKey: ["assets"],
    queryFn: fetchAssets,
  });

  const assets = assetQuery.data?.data as IAssetShort[];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-3 gap-6">
        {assetQuery.isSuccess &&
          assets.map((asset, index) => (
            <FadeIn
              key={`asset_${asset.assetId}`}
              delay={0.2 + index * 0.05}
              className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
            >
              <Asset asset={asset} />
            </FadeIn>
          ))}
      </div>

      <FadeIn delay={0.4} className="flex gap-4 justify-end">
        <button className="bg-green-primary p-4 rounded-full">
          <CaretLeft size={24} color="white" />
        </button>

        <button className="bg-green-primary p-4 rounded-full">
          <CaretRight size={24} color="white" />
        </button>
      </FadeIn>
    </div>
  );
}
