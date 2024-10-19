import { IImageDto } from "./ Image.types";
import { IComment } from "./Comment.types";
import { ICurrency } from "./Currency.types";
import { ICustomLicense } from "./CustomLicense.types";
import { ILicense } from "./License.types";
import { IStudioDto } from "./Studio.types";
import { ITag } from "./Tag.types";

export interface IAsset {
  assetId: string;
  name: string;
  price: number;
  currency: ICurrency;
  description: string;
  license: ILicense;
  studio: IStudioDto;
  customLicense?: ICustomLicense;
  images: IImageDto[];
  tags: ITag[];
  comments: IComment[];
}

export interface IAssetShort {
  assetId: string;
  name: string;
  price: number;
  currency: ICurrency;
  image: IImageDto;
}
