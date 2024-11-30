import FadeIn from "../animation/FadeIn";

interface Props {
  error: string | undefined;
  touched: boolean | undefined;
}

export default function FormError({ error, touched }: Props) {
  return (
    error &&
    touched && (
      <FadeIn>
        <div className="mt-2 text-red-500 text-sm font-semibold">{error}</div>
      </FadeIn>
    )
  );
}
