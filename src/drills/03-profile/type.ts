export interface Profile extends EditableProfile {
  id: string;
}

export interface EditableProfile {
  name: string;
  email: string;
  address: ProfileAddress;
  skills: string[];
}

export interface ProfileAddress {
  city: string;
  street: string;
}
