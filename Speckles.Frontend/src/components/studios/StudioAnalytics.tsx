import Earnings from "../analytics/Earnings";
import Sales from "../analytics/Sales";
import FadeIn from "../animation/FadeIn";

interface Props {
  slug: string;
}

export default function StudioAnalytics({ slug }: Props) {
  return (
    <FadeIn delay={0} className="flex flex-col xl:flex-row gap-8">
      <Earnings slug={slug} />
      <Sales />
    </FadeIn>
  );
}
