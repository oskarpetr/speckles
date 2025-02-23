import { ILicense } from "@/types/dtos/License.types";
import FadeIn from "../animation/FadeIn";

interface Props {
  license: ILicense;
}

export default function AssetLicense({ license }: Props) {
  return (
    <FadeIn delay={0} className="flex flex-col gap-4">
      <div className="font-extrabold">Licensed under {license.name}</div>
      <div className="opacity-80">{license.description}</div>
    </FadeIn>
  );
}
