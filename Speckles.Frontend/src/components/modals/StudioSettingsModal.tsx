import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import Button from "../shared/Button";

interface Props {
  // studio: ;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function StudioSettingsModal({ open, setOpen }: Props) {
  // handle continue
  const handleContinue = () => {
    // api

    setOpen(false);
  };

  return (
    <Modal title="Studio settings" open={open} setOpen={setOpen}>
      <div>
        <p className="leading-relaxed"></p>
        <Button text="Save studio" onClick={handleContinue} />
      </div>
    </Modal>
  );
}
