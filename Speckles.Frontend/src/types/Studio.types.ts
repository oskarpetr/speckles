import { IPortfolio } from "./Portfolio.types";
import { IMemberShort } from "./Member.types";
import { IAssetShort } from "./Asset.types";
import { IAddress } from "./Address.types";

export interface IStudio {
  studioId: string;
  name: string;
  contactEmail: string;
  slug: string;
  address: IAddress;
  portfolio: IPortfolio;
  members: IMemberShort[];
  assets: IAssetShort[];
}

export interface IStudioShort {
  studioId: string;
  name: string;
  slug: string;
}
