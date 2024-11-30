import { IAssetShort } from "./Asset.types";

export interface ITag {
  tagId: string;
  name: string;
  assets: IAssetShort[];
}

export interface ITagShort {
  tagId: string;
  name: string;
}
