import { IAssetShort } from "@/types/dtos/Asset.types";
import { ITag } from "@/types/dtos/Tag.types";
import AssetList from "../asset/AssetList";

interface Props {
  tags: ITag[];
  assets: IAssetShort[];
  selectedTag: string;
  canEdit?: boolean;
}

export default function StudioAssetList({
  tags,
  assets,
  selectedTag,
  canEdit,
}: Props) {
  // assets by tag
  const studioAssets =
    selectedTag === "All"
      ? assets
      : tags.find((x) => x.tagId == selectedTag)?.assets ?? [];

  return <AssetList assets={studioAssets} menu canEdit={canEdit} />;
}
