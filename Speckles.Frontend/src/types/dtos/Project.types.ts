import { IImage } from "./Image.types";

export interface IProject {
  projectId: string;
  name: string;
  description: string;
  personal: boolean;
  client?: string;
  thumbnail: IImage;
  images: IImage[];
}

export interface IProjectPostBody {
  slug: string;
  projectId: string;
  name: string;
  description: string;
  personal: boolean;
  client: string;
  images: string[];
  thumbnailId: string;
}

export interface IProjectPutBody {
  name: string;
  description: string;
  personal: boolean;
  client: string;
  images: string[];
  thumbnailId: string;
}
