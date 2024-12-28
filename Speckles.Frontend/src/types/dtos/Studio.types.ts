import { IPortfolio } from "./Portfolio.types";
import { IUserShort } from "./User.types";
import { IAssetShort } from "./Asset.types";
import { IAddress } from "./Address.types";

export interface IStudio {
  studioId: string;
  name: string;
  contactEmail: string;
  slug: string;
  address: IAddress;
  portfolio: IPortfolio;
  members: IUserShort[];
  assets: IAssetShort[];
}

export interface IStudioShort {
  studioId: string;
  name: string;
  slug: string;
}
