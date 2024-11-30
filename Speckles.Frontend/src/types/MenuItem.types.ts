import { ReactNode } from "react";

export interface IMenuItem {
  link?: string;
  onClick?: () => void;
  icon?: string;
  text?: string;
  children?: ReactNode;
}
