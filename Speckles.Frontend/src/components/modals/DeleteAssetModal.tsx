import { Dispatch, SetStateAction } from "react";
import { useAssetDelete } from "@/hooks/useApi";
import { IAssetShort } from "@/types/dtos/Asset.types";
import DeleteModal from "./DeleteModal";

interface Props {
  asset: IAssetShort;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteAssetModal({ asset, open, setOpen }: Props) {
  // delete asset
  const assetDelete = useAssetDelete(asset.assetId);

  return (
    <DeleteModal
      open={open}
      setOpen={setOpen}
      phrase="Delete asset"
      name={asset.name}
      onDelete={assetDelete.mutate}
    />
  );
}
