"use client";

import { IAssetShort } from "@/types/dtos/Asset.types";
import { getAssetThumbnailAlt } from "@/utils/alts";
import { formatPrice } from "@/utils/formatters";
import { getAssetImage } from "@/utils/images";
import AssetPrice from "./AssetPrice";
import { getLocalCurrency } from "@/utils/local";
import GridCard, { SkeletonGridCard } from "../shared/GridCard";
import { IMenuItem } from "@/types/MenuItem.types";
import { Fragment, useState } from "react";
import DeleteAssetModal from "../modals/DeleteAssetModal";
import EditAssetModal from "../modals/EditAssetModal";

interface Props {
  asset: IAssetShort;
  type?: "asset" | "order";
  orderId?: string;
  menu?: boolean;
}

export default function AssetItem({
  asset,
  type = "asset",
  orderId,
  menu = false,
}: Props) {
  const src = getAssetImage(asset.assetId, asset.thumbnail.imageId);

  // const buffer = await fetch(src).then((res) => res.arrayBuffer());
  // const { base64 } = await getPlaiceholder(Buffer.from(buffer));

  // open edit asset modal
  const [openEditModal, setOpenEditModal] = useState(false);

  // open delete asset modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // menu items
  const menuItems: IMenuItem[] = [
    {
      text: "Edit asset",
      onClick: () => setOpenEditModal(true),
    },
    {
      text: "Delete asset",
      onClick: () => setOpenDeleteModal(true),
    },
  ];

  return (
    <Fragment>
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
        menuItems={menu ? menuItems : undefined}
        imageSrc={src}
        imageAlt={getAssetThumbnailAlt(asset.name)}
      />

      <DeleteAssetModal
        asset={asset}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />

      <EditAssetModal
        asset={asset}
        open={openEditModal}
        setOpen={setOpenEditModal}
      />
    </Fragment>
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
