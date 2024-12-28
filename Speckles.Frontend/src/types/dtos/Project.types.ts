import { IImage } from "./Image.types";

export interface IProject {
  name: string;
  description: string;
  personal: boolean;
  client?: string;
  images: IImage[];
}
