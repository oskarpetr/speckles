import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function GrayCard({ children }: Props) {
  return (
    <div className="p-8 flex flex-col gap-8 bg-neutral-100 rounded-lg border border-black-primary border-opacity-10">
      {children}
    </div>
  );
}
