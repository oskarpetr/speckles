import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import EditStudioForm from "../forms/EditStudioForm";
import { IStudio } from "@/types/dtos/Studio.types";

interface Props {
  studio: IStudio;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAvatarChangeDate: Dispatch<SetStateAction<Date>>;
}

export default function EditStudioModal({
  studio,
  open,
  setOpen,
  setAvatarChangeDate,
}: Props) {
  // on success
  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Modal title="Studio settings" open={open} setOpen={setOpen}>
      <EditStudioForm
        studio={studio}
        onSuccess={onSuccess}
        setAvatarChangeDate={setAvatarChangeDate}
      />
    </Modal>
  );
}
