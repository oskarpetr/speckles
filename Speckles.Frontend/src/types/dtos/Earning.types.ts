import { IAssetShort } from "./Asset.types";

export interface IEarning {
  assetName: string;
  asset: IAssetShort;
  totalAmount: number;
  ordered: number;
}
