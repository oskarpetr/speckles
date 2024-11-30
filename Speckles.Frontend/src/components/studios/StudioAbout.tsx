import { IPortfolio } from "@/types/Portfolio.types";
import FadeIn from "../animation/FadeIn";

interface Props {
  portfolio: IPortfolio;
}

export default function StudioAbout({ portfolio }: Props) {
  return (
    <FadeIn delay={0}>
      <div className="w-1/2">{portfolio.about}</div>
    </FadeIn>
  );
}
