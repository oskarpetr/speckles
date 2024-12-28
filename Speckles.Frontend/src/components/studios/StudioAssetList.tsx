import { IAssetShort } from "@/types/dtos/Asset.types";
import FadeIn from "../animation/FadeIn";
import Asset from "../asset/AssetItem";
import { ITag } from "@/types/dtos/Tag.types";
import Grid from "../shared/Grid";

interface Props {
  tags: ITag[];
  assets: IAssetShort[];
  selectedTag: string;
}

export default function StudioAssetList({ tags, assets, selectedTag }: Props) {
  const studioAssets =
    selectedTag === "All"
      ? assets
      : tags.find((x) => x.tagId == selectedTag)?.assets ?? [];

  return (
    <Grid>
      {studioAssets.map((asset, index) => (
        <FadeIn
          key={`asset_${asset.assetId}`}
          delay={0 + index * 0.05}
          className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
        >
          <Asset asset={asset} />
        </FadeIn>
      ))}
    </Grid>
  );
}
