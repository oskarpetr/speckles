import { IStudioShort } from "@/types/dtos/Studio.types";
import { getStudioLogo } from "@/utils/images";
import GridCard, { SkeletonGridCard } from "../shared/GridCard";

interface Props {
  studio: IStudioShort;
}

export default function StudioItem({ studio }: Props) {
  return (
    <GridCard
      title={studio.name}
      link={`/studios/${studio.slug}`}
      imageSrc={getStudioLogo(studio.studioId)}
      imageAlt={`${studio.name}'s Logo`}
    />
  );
}

export function SkeletonStudioItem() {
  return <SkeletonGridCard title="Studio" />;
}
