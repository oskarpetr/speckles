import { IAssetShort } from "@/types/dtos/Asset.types";
import FadeIn from "../animation/FadeIn";
import AssetItem, { SkeletonAssetItem } from "./AssetItem";
import Grid from "../shared/Grid";
import { gridCardDelay } from "../shared/GridCard";

interface Props {
  assets?: IAssetShort[];
  delay?: number;
  skeleton?: boolean;
  menu?: boolean;
}

export default function AssetList({
  assets,
  delay = 0,
  skeleton = false,
  menu,
}: Props) {
  return (
    <Grid>
      {!skeleton &&
        assets &&
        assets.map((asset, index) => (
          <FadeIn
            key={`asset_${asset.assetId}`}
            delay={gridCardDelay(delay, index)}
          >
            <AssetItem asset={asset} menu={menu} />
          </FadeIn>
        ))}

      {skeleton &&
        [...Array(3)].map((_, index) => (
          <FadeIn
            key={`skeleton_asset_${index}`}
            delay={gridCardDelay(delay, index)}
          >
            <SkeletonAssetItem />
          </FadeIn>
        ))}
    </Grid>
  );
}
