import { ReactNode } from "react";
import { IconNames } from "@/components/shared/Icon";

export interface ITabItem {
  title: string;
  content: ReactNode;
  button?: boolean;
  buttonIcon?: IconNames;
  buttonTitle?: string;
  buttonAction?: () => void;
}
