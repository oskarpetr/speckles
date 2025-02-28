import { IImage } from "./Image.types";
import { IComment } from "./Comment.types";
import { ICurrency } from "./Currency.types";
import { ICustomLicense } from "./CustomLicense.types";
import { IFile } from "./File.types";
import { ILicense } from "./License.types";
import { IStudio, IStudioShort } from "./Studio.types";
import { ITagShort } from "./Tag.types";

export interface IAsset {
  assetId: string;
  name: string;
  price: number;
  createdAt: string;
  currency: ICurrency;
  description: string;
  license: ILicense;
  studio: IStudio;
  customLicense?: ICustomLicense;
  thumbnail: IImage;
  images: IImage[];
  files: IFile[];
  tags: ITagShort[];
  comments: IComment[];
  saved: boolean;
  inBasket: boolean;
}

export interface IAssetShort {
  assetId: string;
  name: string;
  price: number;
  currency: ICurrency;
  tags: ITagShort[];
  studio: IStudioShort;
  thumbnail: IImage;
}

export interface IAssetPostBody {
  slug?: string;
  assetId: string;
  name: string;
  price: number;
  description: string;
  currencyId: string;
  licenseId: string;
  images: IImage[];
  files: IFile[];
  tags: ITagShort[];
  thumbnailId: string;
}

export interface IAssetPutBody {
  name: string;
  price: number;
  description: string;
  currencyId: string;
  licenseId: string;
  images: IImage[];
  files: IFile[];
  tags: ITagShort[];
  thumbnailId: string;
}

export interface IAssetDeleteBody {
  assetId: string;
}
