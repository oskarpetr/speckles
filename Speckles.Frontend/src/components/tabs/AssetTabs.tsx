import { IAsset } from "@/types/Asset.types";
import Tabs from "../common/Tabs";
import { ITabItem } from "@/types/TabItem.types";
import Comments from "../asset/Comments";
import AssetLicense from "../asset/AssetLicense";

interface Props {
  asset: IAsset;
}

export default function AssetTabs({ asset }: Props) {
  const tabItems: ITabItem[] = [
    {
      title: "Comments",
      content: <Comments comments={asset.comments} />,
    },
    {
      title: "License",
      content: <AssetLicense license={asset.license} />,
    },
  ];

  return <Tabs items={tabItems} />;
}
