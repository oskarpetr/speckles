import { Dispatch, SetStateAction } from "react";
import { useAssetDelete } from "@/hooks/useApi";
import { IAssetShort } from "@/types/dtos/Asset.types";
import DeleteModal from "./DeleteModal";
import { deleteAsset } from "@/utils/firebase/firebase-fns";

interface Props {
  slug: string;
  asset: IAssetShort;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteAssetModal({
  slug,
  asset,
  open,
  setOpen,
}: Props) {
  // delete asset
  const assetDelete = useAssetDelete(slug, asset.assetId);

  // on delete
  const onDelete = async () => {
    await assetDelete.mutateAsync();
    deleteAsset(asset.assetId);
  };

  return (
    <DeleteModal
      open={open}
      setOpen={setOpen}
      phrase="Delete asset"
      name={asset.name}
      onDelete={onDelete}
    />
  );
}
