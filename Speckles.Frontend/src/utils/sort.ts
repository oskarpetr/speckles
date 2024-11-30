import { IAssetShort } from "@/types/Asset.types";
import { ITag } from "@/types/Tag.types";

export function sortAssetsByTag(assets: IAssetShort[]) {
  const tags: ITag[] = [];

  assets.forEach((asset) => {
    asset.tags.forEach((tag) => {
      if (!tags.some((x) => x.tagId === tag.tagId))
        tags.push({ ...tag, assets: [] });
    });
  });

  tags.forEach((tag) => {
    assets.forEach((asset) => {
      if (asset.tags.some((x) => x.tagId === tag.tagId)) tag.assets.push(asset);
    });
  });

  return tags;
}
