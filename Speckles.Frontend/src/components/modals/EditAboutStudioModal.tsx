import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import EditAboutStudioForm from "../forms/EditAboutStudioForm";

interface Props {
  about?: string;
  contactEmail?: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditAboutStudioModal({
  about,
  contactEmail,
  open,
  setOpen,
}: Props) {
  // on success handler
  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Modal title="Edit about studio" open={open} setOpen={setOpen}>
      <EditAboutStudioForm
        about={about}
        contactEmail={contactEmail}
        onSuccess={onSuccess}
      />
    </Modal>
  );
}
