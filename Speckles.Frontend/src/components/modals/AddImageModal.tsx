import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import { IImage } from "@/types/dtos/Image.types";
import AddImageForm from "../forms/AddImageForm";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setImages: Dispatch<SetStateAction<IImage[]>>;
}

export default function AddImageModal({ open, setOpen, setImages }: Props) {
  // on success
  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Modal title="Add image" open={open} setOpen={setOpen}>
      <AddImageForm setImages={setImages} onSuccess={onSuccess} />
    </Modal>
  );
}
