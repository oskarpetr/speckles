import { IImage } from "./Image.types";

export interface IProject {
  projectId: string;
  name: string;
  description: string;
  personal: boolean;
  client?: string;
  images: IImage[];
}
