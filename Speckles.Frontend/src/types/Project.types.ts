import { IImageDto } from "./Image.types";

export interface IProject {
  name: string;
  description: string;
  personal: boolean;
  client?: string;
  images: IImageDto[];
}
