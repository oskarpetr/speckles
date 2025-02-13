import { Dispatch, SetStateAction } from "react";
import { useStudioMemberDelete } from "@/hooks/useApi";
import DeleteModal from "./DeleteModal";
import { IUserShort } from "@/types/dtos/User.types";

interface Props {
  user: IUserShort;
  slug: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteStudioMemberModal({
  user,
  slug,
  open,
  setOpen,
}: Props) {
  // delete member
  const studioMemberDelete = useStudioMemberDelete(slug);

  return (
    <DeleteModal
      open={open}
      setOpen={setOpen}
      phrase="Remove member"
      name={user.fullName}
      onDelete={() => studioMemberDelete.mutate(user.email)}
    />
  );
}
