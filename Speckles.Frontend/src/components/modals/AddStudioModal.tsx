import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import AddStudioForm from "../forms/AddStudioForm";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddStudioModal({ open, setOpen }: Props) {
  // on success
  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Modal title="Studio settings" open={open} setOpen={setOpen}>
      <AddStudioForm onSuccess={onSuccess} />
    </Modal>
  );
}
