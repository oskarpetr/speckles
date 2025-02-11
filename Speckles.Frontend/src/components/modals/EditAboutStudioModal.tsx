import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import Button from "../shared/Button";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditAboutStudioModal({ open, setOpen }: Props) {
  // update asset
  const assetUpdate = useAssetUpdate();

  const handleContinue = () => {
    // assetMutation.mutate(body);

    setOpen(false);
  };

  return (
    <Modal title="Edit about studio" open={open} setOpen={setOpen}>
      <p className="leading-relaxed"></p>

      <Button text="Edit about studio" onClick={handleContinue} />
    </Modal>
  );
}
