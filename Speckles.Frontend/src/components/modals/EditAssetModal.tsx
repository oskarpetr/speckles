import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { IAssetShort } from "@/types/dtos/Asset.types";

interface Props {
  asset: IAssetShort;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditAssetModal({ asset, open, setOpen }: Props) {
  // edit asset
  // const assetDelete = useAssetDelete(asset.assetId);

  const handleContinue = () => {
    // assetDelete.mutate();

    setOpen(false);
  };

  return (
    <Modal title={asset.name} open={open} setOpen={setOpen}>
      <p className="leading-relaxed">
        Are you sure you want to delete the asset "{asset.name}"? This action
        cannot be undone.
      </p>
      <Button text="Edit asset" onClick={handleContinue} />
    </Modal>
  );
}
