export interface IAuthRegister {
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

export interface IAuthLogin {
  email: string;
  password: string;
}
