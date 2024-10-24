import { IImageDto } from "./ Image.types";
import { IComment } from "./Comment.types";
import { ICurrency } from "./Currency.types";
import { ICustomLicense } from "./CustomLicense.types";
import { IFile } from "./File.types";
import { ILicense } from "./License.types";
import { IStudioShort } from "./Studio.types";
import { ITag } from "./Tag.types";

export interface IAsset {
  assetId: string;
  name: string;
  price: number;
  currency: ICurrency;
  description: string;
  license: ILicense;
  studio: IStudioShort;
  customLicense?: ICustomLicense;
  images: IImageDto[];
  files: IFile[];
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
