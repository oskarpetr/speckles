import { IUserShort } from "./User.types";
import { IAssetShort } from "./Asset.types";
import { IAddress } from "./Address.types";
import { IProject } from "./Project.types";

export interface IStudio {
  studioId: string;
  name: string;
  contactEmail: string;
  slug: string;
  about: string;
  address: IAddress;
  members: IUserShort[];
  assets: IAssetShort[];
  projects: IProject[];
  createdAt: string;
}

export interface IStudioShort {
  studioId: string;
  name: string;
  slug: string;
}

export interface IStudioMemberPostBody {
  userId: string;
}

export interface IStudioMemberDeleteBody {
  userId: string;
}

export interface IStudioPutBody {
  name?: string;
  contactEmail?: string;
  slug?: string;
  about?: string;
  address?: IAddress;
  projects?: IProject[];
}
