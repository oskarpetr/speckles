import { IUserShort } from "./User.types";
import { IAssetShort } from "./Asset.types";
import { IAddress } from "./Address.types";
import { IProject } from "./Project.types";

export interface IStudio {
  studioId: string;
  name: string;
  contactEmail: string;
  paymentEmail: string;
  slug: string;
  about: string;
  address: IAddress;
  members: IUserShort[];
  assets: IAssetShort[];
  projects: IProject[];
  createdAt: string;
  following: boolean;
}

export interface IStudioShort {
  studioId: string;
  name: string;
  contactEmail: string;
  paymentEmail: string;
  slug: string;
}

export interface IStudioPostBody {
  name: string;
  slug: string;
  about: string;
  contactEmail: string;
  paymentEmail: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  street: string;
  defaultMember: string;
}

export interface IStudioMemberPostBody {
  email: string;
}

export interface IStudioMemberDeleteBody {
  email: string;
}

export interface IStudioPutBody {
  name?: string;
  contactEmail?: string;
  slug?: string;
  about?: string;
  address?: IAddress;
  projects?: IProject[];
}
