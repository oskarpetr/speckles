import { ILicense } from "@/types/License.types";
import FadeIn from "../animation/FadeIn";

interface Props {
  license: ILicense;
}

export default function AssetLicense({ license }: Props) {
  return (
    <FadeIn delay={0} className="flex flex-col gap-4">
      <div className="font-extrabold">{license.name}</div>
      <div>{license.description}</div>
    </FadeIn>
  );
}
