import { IAssetShort } from "@/types/Asset.types";
import FadeIn from "../animation/FadeIn";
import Asset from "../asset/Asset";
import StudioTags from "./StudioTags";
import { ITag } from "@/types/Tag.types";
import { Fragment, useState } from "react";

interface Props {
  tags: ITag[];
  assets: IAssetShort[];
}

export default function StudioAssets({ tags, assets }: Props) {
  const [selected, setSelected] = useState("all");

  return (
    <FadeIn delay={0} className="flex flex-col gap-12">
      {/* <Section title="Tags" /> */}

      {tags.length > 0 ? (
        <Fragment>
          {/* <div className="w-1/4">
            <Input
              name="Search"
              placeholder="Search"
              onChange={() => {}}
              onBlur={() => {}}
              value=""
              error=""
              touched={false}
              icon="MagnifyingGlass"
            />
          </div> */}

          <div className="flex gap-12 w-full">
            <StudioTags
              tags={tags}
              selected={selected}
              setSelected={setSelected}
            />
            <StudioAssetList assets={assets} tags={tags} selected={selected} />
          </div>
        </Fragment>
      ) : (
        <div className="text-neutral-500">No assets yet</div>
      )}
    </FadeIn>
  );
}

function StudioAssetList({
  tags,
  assets,
  selected,
}: Props & { selected: string }) {
  const studioAssets =
    selected === "All"
      ? assets
      : tags.find((x) => x.tagId == selected)?.assets ?? [];

  return (
    <div className="grid grid-cols-3 gap-6 w-full h-full">
      {studioAssets.map((asset, index) => (
        <FadeIn
          key={`asset_${asset.assetId}`}
          delay={0 + index * 0.05}
          className="relative rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300"
        >
          <Asset asset={asset} />
        </FadeIn>
      ))}
    </div>
  );
}
