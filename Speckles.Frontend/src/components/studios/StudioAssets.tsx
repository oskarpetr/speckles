import { IAssetShort } from "@/types/dtos/Asset.types";
import FadeIn from "../animation/FadeIn";
import StudioTags from "./StudioTags";
import { Fragment, useState } from "react";
import { sortAssetsByTag } from "@/utils/sort";
import StudioAssetList from "./StudioAssetList";

interface Props {
  assets: IAssetShort[];
}

export default function StudioAssets({ assets }: Props) {
  const [selectedTag, setSelectedTag] = useState("all");

  // assets by tag
  const assetsByTag = sortAssetsByTag(assets);

  return (
    <FadeIn delay={0} className="flex flex-col gap-12">
      {/* <Section title="Tags" /> */}

      {assetsByTag.length > 0 ? (
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
              tags={assetsByTag}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
            <StudioAssetList
              assets={assets}
              tags={assetsByTag}
              selectedTag={selectedTag}
            />
          </div>
        </Fragment>
      ) : (
        <div className="text-neutral-500">No assets yet</div>
      )}
    </FadeIn>
  );
}
