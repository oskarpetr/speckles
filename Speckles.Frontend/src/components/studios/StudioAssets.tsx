import { IAssetShort } from "@/types/Asset.types";
import FadeIn from "../animation/FadeIn";
import Section from "../common/Section";
import Asset from "../asset/Asset";

interface Props {
  assets: IAssetShort[];
}

export default function StudioAssets({ assets }: Props) {
  return (
    <FadeIn delay={0.2}>
      <Section title="Studio's assets" />
      <StudioAssetList assets={assets} />
    </FadeIn>
  );
}

function StudioAssetList({ assets }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-6">
        {assets.map((asset, index) => (
          <FadeIn
            key={`asset_${asset.assetId}`}
            delay={0.2 + index * 0.05}
            className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
          >
            <Asset asset={asset} />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
