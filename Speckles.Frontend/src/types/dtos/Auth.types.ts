export interface IRegisterBody {
  fullName: string;
  email: string;
  username: string;
  password: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  street: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}
