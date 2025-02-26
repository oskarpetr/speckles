export interface IRegisterPostBody {
  fullName: string;
  email: string;
  username: string;
  password: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  street: string;
  basketAssets: string[];
  savedAssets: string[];
  following: string[];
}

export interface ILoginPostBody {
  email: string;
}
