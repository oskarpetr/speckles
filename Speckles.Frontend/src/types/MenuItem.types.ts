import { ReactNode } from "react";
import * as Icons from "@phosphor-icons/react/dist/ssr";

export interface IMenuItem {
  link?: string;
  onClick?: () => void;
  icon?: keyof typeof Icons;
  text?: string;
  children?: ReactNode;
}
