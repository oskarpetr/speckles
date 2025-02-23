import { IAsset } from "@/types/dtos/Asset.types";
import Tabs from "../shared/Tabs";
import Comments from "../asset/Comments";
import AssetLicense from "../asset/AssetLicense";
import { TabItem } from "../shared/TabItem";

interface Props {
  asset: IAsset;
}

export default function AssetTabs({ asset }: Props) {
  return (
    <div className="max-w-[35rem]">
      <Tabs>
        <TabItem title="Comments">
          <Comments comments={asset.comments} />
        </TabItem>

        <TabItem title="License">
          <AssetLicense license={asset.license} />
        </TabItem>
      </Tabs>
    </div>
  );
}
