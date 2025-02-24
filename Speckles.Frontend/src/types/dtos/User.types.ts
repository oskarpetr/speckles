import { IAddress } from "./Address.types";
import { IStudioShort } from "./Studio.types";

export interface IUser {
  userId: string;
  username: string;
  email: string;
  fullName: string;
  studios: IStudioShort[];
  following: IStudioShort[];
  address: IAddress;
}

export interface IUserShort {
  userId: string;
  username: string;
  email: string;
  fullName: string;
}

export interface IUserAddressShort {
  userId: string;
  username: string;
  email: string;
  fullName: string;
  address: IAddress;
}
