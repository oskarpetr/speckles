import { IAsset, IAssetShort } from "./Asset.types";

export interface IOrder {
  orderId: string;
  date: string;
  paymentMethod: string;
  asset: IAsset;
}

export interface IOrderShort {
  orderId: string;
  date: string;
  asset: IAssetShort;
}
