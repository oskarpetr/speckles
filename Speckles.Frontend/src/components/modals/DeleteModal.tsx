import { Dispatch, SetStateAction } from "react";
import Button from "../shared/Button";
import Modal from "../shared/Modal";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onDelete: () => void;
  phrase: string;
  name: string;
}

export default function DeleteModal({
  open,
  setOpen,
  onDelete,
  phrase,
  name,
}: Props) {
  return (
    <Modal title={`${phrase}?`} open={open} setOpen={setOpen}>
      <p className="leading-relaxed">
        Are you sure you want to remove "{name}"? This action cannot be undone.
      </p>
      <Button text={phrase} onClick={onDelete} />
    </Modal>
  );
}
