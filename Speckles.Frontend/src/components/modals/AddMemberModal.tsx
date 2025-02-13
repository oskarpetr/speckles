import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import AddMemberForm from "../forms/AddMemberForm";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddMemberModal({ open, setOpen }: Props) {
  // on success handler
  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Modal title="Add member" open={open} setOpen={setOpen}>
      <AddMemberForm onSuccess={onSuccess} />
    </Modal>
  );
}
