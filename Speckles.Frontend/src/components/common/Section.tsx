import { CaretRight } from "@phosphor-icons/react";

interface Props {
  title: string;
}

export default function Section({ title }: Props) {
  return (
    <div className="flex items-center gap-1 mb-4">
      <h1 className="font-extrabold">{title}</h1>
      <CaretRight />
    </div>
  );
}
