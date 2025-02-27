import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import AddProjectForm from "../forms/AddProjectForm";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddProjectModal({ open, setOpen }: Props) {
  // on success
  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Modal title="Add project" open={open} setOpen={setOpen}>
      <AddProjectForm onSuccess={onSuccess} />
    </Modal>
  );
}
