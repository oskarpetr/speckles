import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import AddFileForm from "../forms/AddFileForm";
import { IFile } from "@/types/dtos/File.types";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setFiles: Dispatch<SetStateAction<IFile[]>>;
}

export default function AddFileModal({ open, setOpen, setFiles }: Props) {
  // on success
  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Modal title="Add file" open={open} setOpen={setOpen}>
      <AddFileForm setFiles={setFiles} onSuccess={onSuccess} />
    </Modal>
  );
}
