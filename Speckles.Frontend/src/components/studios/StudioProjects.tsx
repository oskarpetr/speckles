import { IProject } from "@/types/dtos/Project.types";
import StudioProjectItem from "./StudioProjectItem";
import { Fragment } from "react";
import { gridCardDelay } from "../shared/GridCard";
import FadeIn from "../animation/FadeIn";
import NoItemsYet from "../shared/NoItemsYet";

interface Props {
  projects: IProject[];
}

export default function StudioProjects({ projects }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <Fragment key={project.projectId}>
            <StudioProjectItem
              project={project}
              delay={gridCardDelay(0.2, index)}
            />

            {index !== projects.length - 1 && (
              <FadeIn delay={gridCardDelay(0.2, index)}>
                <div className="border-b border-black-primary border-opacity-10"></div>
              </FadeIn>
            )}
          </Fragment>
        ))
      ) : (
        <NoItemsYet items="projects" />
      )}
    </div>
  );
}
