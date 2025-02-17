import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import AddFileForm from "../forms/AddFileForm";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddFileModal({ open, setOpen }: Props) {
  return (
    <Modal title="Add file" open={open} setOpen={setOpen}>
      <AddFileForm />
    </Modal>
  );
}
