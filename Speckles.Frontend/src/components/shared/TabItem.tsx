import { ReactNode } from "react";

export interface Props {
  title: string;
  children: ReactNode;
  button?: ReactNode | null;
}

export function TabItem({ children }: Props) {
  return children;
}
