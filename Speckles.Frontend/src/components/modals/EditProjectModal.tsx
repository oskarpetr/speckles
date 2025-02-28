import { Dispatch, SetStateAction } from "react";
import Modal from "../shared/Modal";
import { IProject } from "@/types/dtos/Project.types";
import EditProjectForm from "../forms/EditProjectForm";

interface Props {
  project: IProject;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function EditProjectModal({ project, open, setOpen }: Props) {
  // on success
  const onSuccess = () => {
    setOpen(false);
  };

  return (
    <Modal title="Edit project" open={open} setOpen={setOpen}>
      <EditProjectForm project={project} onSuccess={onSuccess} />
    </Modal>
  );
}
