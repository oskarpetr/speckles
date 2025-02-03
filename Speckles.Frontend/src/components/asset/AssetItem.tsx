"use client";

import { IAssetShort } from "@/types/dtos/Asset.types";
import { getAssetThumbnailAlt } from "@/utils/alts";
import { formatPrice } from "@/utils/formatters";
import { getAssetImage } from "@/utils/images";
import AssetPrice from "./AssetPrice";
import { getLocalCurrency } from "@/utils/local";
import GridCard, { SkeletonGridCard } from "../shared/GridCard";

interface Props {
  asset: IAssetShort;
  type?: "asset" | "order";
  orderId?: string;
}

export default function AssetItem({ asset, type = "asset", orderId }: Props) {
  const src = getAssetImage(asset.assetId, asset.thumbnail.imageId);

  // const buffer = await fetch(src).then((res) => res.arrayBuffer());
  // const { base64 } = await getPlaiceholder(Buffer.from(buffer));

  return (
    <GridCard
      title={asset.name}
      secondaryElement={
        <AssetPrice
          price={asset.price}
          currency={asset.currency}
          color="white"
        />
      }
      link={
        type === "asset" ? `/assets/${asset.assetId}` : `/orders/${orderId}`
      }
      imageSrc={src}
      imageAlt={getAssetThumbnailAlt(asset.name)}
    />
  );
}

export function SkeletonAssetItem() {
  const userLocale = navigator.language;
  const localCurrency = getLocalCurrency();
  const price = formatPrice(userLocale, localCurrency, 0);

  return (
    <SkeletonGridCard
      title="Asset"
      secondaryElement={
        <div className="text-white opacity-80 font-semibold">{price}</div>
      }
    />
  );
}
