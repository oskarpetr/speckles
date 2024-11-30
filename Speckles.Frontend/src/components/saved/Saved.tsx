import { useQuery } from "@tanstack/react-query";
import FadeIn from "../animation/FadeIn";
import { fetchSavedAssets } from "@/utils/fetchers";
import { IAssetShort } from "@/types/Asset.types";
import Asset from "../asset/Asset";

export default function Saved() {
  return (
    <FadeIn delay={0.2}>
      <SavedList />
    </FadeIn>
  );
}

function SavedList() {
  const memberId = "0f44ee84-dcf2-483c-a084-102712b6b19e";

  const savedQuery = useQuery({
    queryKey: ["saved", memberId],
    queryFn: () => fetchSavedAssets(memberId),
  });

  const savedAssets = savedQuery.data?.data as IAssetShort[];

  return (
    <div className="grid grid-cols-3 gap-6">
      {savedQuery.isSuccess &&
        savedAssets.map((asset, index) => (
          <FadeIn
            key={`asset_${asset.assetId}`}
            delay={0.2 + index * 0.05}
            className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
          >
            <Asset asset={asset} />
          </FadeIn>
        ))}
    </div>
  );
}
