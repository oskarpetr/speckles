import { IProject } from "@/types/dtos/Project.types";
import Description from "../shared/Description";
import FadeIn from "../animation/FadeIn";
import Image from "next/image";
import { getProjectImage } from "@/utils/images";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { GridCardMenu } from "../shared/GridCard";
import { IMenuItem } from "@/types/MenuItem.types";
import DeleteModal from "../modals/DeleteModal";
import { useProjectDelete } from "@/hooks/useApi";
import { deleteProject } from "@/utils/firebase/firebase-fns";
import EditProjectModal from "../modals/EditProjectModal";
import { useParams } from "next/navigation";

interface Props {
  project: IProject;
  delay?: number;
}

export default function StudioProjectItem({ project, delay }: Props) {
  // slug param
  const { slug } = useParams();

  // active image state
  const [activeImage, setActiveImage] = useState(0);

  // hovered state
  const [hovered, setHovered] = useState(false);

  // project delete
  const projectDelete = useProjectDelete(slug as string, project.projectId);

  // project edit modal
  const [openEditModal, setOpenEditModal] = useState(false);

  // project delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  // menu items
  const menuItems: IMenuItem[] = [
    {
      text: "Edit project",
      onClick: () => setOpenEditModal(true),
    },
    {
      text: "Delete project",
      onClick: () => setOpenDeleteModal(true),
    },
  ];

  // on delete handler
  const onDelete = () => {
    projectDelete.mutate();
    deleteProject(project.projectId);
  };

  return (
    <FadeIn delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex justify-between"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-8">
            <Image
              src={getProjectImage(
                project.projectId,
                project.images[activeImage].imageId
              )}
              alt={project.images[activeImage].alt}
              width={400}
              height={0}
              className="rounded-lg w-72"
            />

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">{project.name}</h3>
              <Description text={project.description} />
              <div className="px-3 py-0.5 mt-2 font-semibold bg-green-primary-hover text-green-primary bg-opacity-10 rounded-lg w-fit">
                {project.personal
                  ? "Personal project"
                  : `For ${project.client}`}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-8 w-full md:w-[35rem] lg:w-[400px] xl:w-[35rem]">
            <div className="grid grid-flow-row grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
              {project.images.map((image, index) => (
                <Image
                  key={image.imageId}
                  src={getProjectImage(project.projectId, image.imageId)}
                  alt={image.alt}
                  width={80}
                  height={0}
                  onClick={() => setActiveImage(index)}
                  className={cn(
                    "w-full rounded-lg transition-all cursor-pointer",
                    activeImage === index
                      ? "border-[3px] border-transparent outline outline-[3px] outline-green-primary"
                      : ""
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <GridCardMenu
            hovered={hovered}
            menuItems={menuItems}
            className="mt-20"
          />
        </div>

        <EditProjectModal
          project={project}
          open={openEditModal}
          setOpen={setOpenEditModal}
        />

        <DeleteModal
          name={project.name}
          phrase="Delete project"
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onDelete={onDelete}
        />
      </div>
    </FadeIn>
  );
}
