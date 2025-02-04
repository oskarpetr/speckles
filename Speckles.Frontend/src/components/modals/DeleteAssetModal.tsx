import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { useAssetDelete } from "@/hooks/useApi";
import { IAssetShort } from "@/types/dtos/Asset.types";

interface Props {
  asset: IAssetShort;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteAssetModal({ asset, open, setOpen }: Props) {
  // delete asset
  const assetDelete = useAssetDelete(asset.assetId);

  const handleContinue = () => {
    assetDelete.mutate();

    setOpen(false);
  };

  return (
    <Modal title="Delete asset?" open={open} setOpen={setOpen}>
      <p className="leading-relaxed">
        Are you sure you want to delete the asset "{asset.name}"? This action
        cannot be undone.
      </p>
      <Button text="Delete asset" onClick={handleContinue} />
    </Modal>
  );
}
