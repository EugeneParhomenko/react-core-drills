export type UsersApiResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
};
