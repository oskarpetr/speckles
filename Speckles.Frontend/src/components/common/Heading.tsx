import FadeIn from "../anim/FadeIn";

interface Props {
  title: string;
  subtitle?: string;
  animate?: boolean;
}

export default function Heading({ title, subtitle, animate = true }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <FadeIn animate={animate}>
        <h1 className="heading text-4xl">{title}</h1>
      </FadeIn>

      {subtitle && (
        <FadeIn delay={0.1} animate={animate}>
          <h2 className="max-w-[35rem]">{subtitle}</h2>
        </FadeIn>
      )}
    </div>
  );
}
