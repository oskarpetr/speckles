import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import EditProfileForm from "../forms/EditProfileForm";
import { IUser } from "@/types/dtos/User.types";

interface Props {
  user: IUser;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAvatarChangeDate: Dispatch<SetStateAction<Date>>;
}

export default function EditProfileModal({
  user,
  open,
  setOpen,
  setAvatarChangeDate,
}: Props) {
  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Modal title="Edit profile" open={open} setOpen={setOpen}>
      <EditProfileForm
        user={user}
        onSuccess={onSuccess}
        setAvatarChangeDate={setAvatarChangeDate}
      />
    </Modal>
  );
}
