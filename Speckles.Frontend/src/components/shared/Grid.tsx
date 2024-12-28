import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Grid({ children }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  );
}
