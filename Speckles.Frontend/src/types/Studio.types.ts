import { IPortfolio } from "./Portfolio.types";
import { IMember } from "./Member.types";
import { IAsset } from "./Asset.types";
import { IAddress } from "./Address.types";

export interface IStudio {
  studioId: string;
  name: string;
  contactEmail: string;
  slug: string;
  address: IAddress;
  portfolio: IPortfolio;
  members: IMember[];
  assets: IAsset[];
}

export interface IStudioDto {
  studioId: string;
  name: string;
  slug: string;
}
