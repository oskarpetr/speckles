import { IAssetShort } from "@/types/Asset.types";
import FadeIn from "../animation/FadeIn";
import AssetItem from "./AssetItem";
import Grid from "../shared/Grid";

interface Props {
  assets: IAssetShort[];
  delay?: number;
}

export default function AssetList({ assets, delay = 0 }: Props) {
  return (
    <Grid>
      {assets.map((asset, index) => (
        <FadeIn
          key={`asset_${asset.assetId}`}
          delay={delay + index * 0.05}
          className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
        >
          <AssetItem asset={asset} />
        </FadeIn>
      ))}
    </Grid>
  );
}
