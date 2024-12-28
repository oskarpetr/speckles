export interface IAddress {
  addressId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface IAddressShort {
  addressId: string;
  city: string;
  country: string;
}
