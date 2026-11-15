export interface Profile {
  name: string;
  email: string;
  address: ProfileAddress;
  skills: string[];
}

export interface ProfileAddress {
  city: string;
  street: string;
}
