import { IProject } from "@/types/dtos/Project.types";
import Description from "../shared/Description";
import FadeIn from "../animation/FadeIn";

interface Props {
  project: IProject;
  delay?: number;
}

export default function StudioProject({ project, delay }: Props) {
  return (
    <FadeIn delay={delay}>
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold">{project.name}</h3>
        <Description text={project.description} />
        <p className="px-3 py-0.5 mt-2 font-semibold bg-green-primary-hover text-green-primary bg-opacity-10 rounded-lg w-fit">
          {project.personal ? "Personal project" : `For ${project.client}`}
        </p>
      </div>
    </FadeIn>
  );
}
