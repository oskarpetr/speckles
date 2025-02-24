import { IAsset, IAssetShort } from "./Asset.types";
import { IUserAddressShort } from "./User.types";

export interface IOrder {
  orderId: string;
  date: string;
  paymentMethod: string;
  asset: IAsset;
  user: IUserAddressShort;
}

export interface IOrderShort {
  orderId: string;
  date: string;
  asset: IAssetShort;
}

export interface IOrderPostBody {
  assetIds: string[];
  userId: string;
  paymentMethod: string;
}
