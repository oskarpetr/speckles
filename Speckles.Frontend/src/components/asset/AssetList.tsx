import { IAssetShort } from "@/types/dtos/Asset.types";
import FadeIn from "../animation/FadeIn";
import AssetItem, { SkeletonAssetItem } from "./AssetItem";
import Grid from "../shared/Grid";

interface Props {
  assets: IAssetShort[];
  delay?: number;
  skeleton?: boolean;
}

export default function AssetList({
  assets,
  delay = 0,
  skeleton = false,
}: Props) {
  return (
    <Grid>
      {!skeleton
        ? assets.map((asset, index) => (
            <FadeIn
              key={`asset_${asset.assetId}`}
              delay={delay + index * 0.05}
              className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
            >
              <AssetItem asset={asset} />
            </FadeIn>
          ))
        : Array(3)
            .fill("")
            .map((_, index) => (
              <FadeIn
                key={`skeleton_asset_${index}`}
                delay={delay + index * 0.05}
                className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
              >
                <SkeletonAssetItem />
              </FadeIn>
            ))}
    </Grid>
  );
}
