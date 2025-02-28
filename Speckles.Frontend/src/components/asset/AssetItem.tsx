"use client";

import { IAssetShort } from "@/types/dtos/Asset.types";
import { getAssetThumbnailAlt } from "@/utils/alts";
import { formatPrice } from "@/utils/formatters";
import { getAssetImage } from "@/utils/images";
import AssetPrice from "./AssetPrice";
import GridCard, { SkeletonGridCard } from "../shared/GridCard";
import { IMenuItem } from "@/types/MenuItem.types";
import { Fragment, useState } from "react";
import DeleteAssetModal from "../modals/DeleteAssetModal";
import EditAssetModal from "../modals/EditAssetModal";
import { useParams } from "next/navigation";
import useCurrencyStore from "@/stores/useCurrencyStore";

interface Props {
  asset: IAssetShort;
  type?: "asset" | "order";
  orderId?: string;
  menu?: boolean;
  canEdit?: boolean;
}

export default function AssetItem({
  asset,
  type = "asset",
  orderId,
  menu = false,
  canEdit,
}: Props) {
  // slug param
  const { slug } = useParams();

  // image src
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
            currencyName={asset.currency.name}
            color="white"
          />
        }
        link={
          type === "asset" ? `/assets/${asset.assetId}` : `/orders/${orderId}`
        }
        menuItems={menu ? menuItems : undefined}
        canEdit={canEdit}
        imageSrc={src}
        imageAlt={getAssetThumbnailAlt(asset.name)}
      />

      <DeleteAssetModal
        slug={slug as string}
        asset={asset}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />

      <EditAssetModal
        assetId={asset.assetId}
        open={openEditModal}
        setOpen={setOpenEditModal}
      />
    </Fragment>
  );
}

export function SkeletonAssetItem() {
  const userLocale = navigator.language;
  const currencyStore = useCurrencyStore();
  const price = formatPrice(userLocale, currencyStore.localCurrency, 0);

  return (
    <SkeletonGridCard
      title="Asset"
      secondaryElement={
        <div className="text-white opacity-80 font-semibold">{price}</div>
      }
    />
  );
}
