import { IAsset } from "@/types/dtos/Asset.types";
import AssetShowcase from "./AssetShowcase";
import AssetStudio from "./AssetStudio";
import AssetInfo from "./AssetInfo";

interface Props {
  asset: IAsset;
}

export default function AssetDetail({ asset }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <AssetStudio asset={asset} />

      <div className="flex flex-col lg:flex-row gap-12">
        <AssetShowcase asset={asset} />
        <AssetInfo asset={asset} />
      </div>
    </div>
  );
}
