import { IAddress } from "./Address.types";
import { IStudioShort } from "./Studio.types";

export interface IUser {
  memberId: string;
  username: string;
  email: string;
  fullName: string;
  studios: IStudioShort[];
  following: IStudioShort[];
  address: IAddress;
}

export interface IUserShort {
  memberId: string;
  username: string;
  email: string;
  fullName: string;
}
