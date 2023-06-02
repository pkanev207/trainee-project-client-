export interface IUserModel {
  _id?: string;
  name: string;
  email?: string;
  password?: string;
  role: string;
  finishedBooks?: [string];
  currentBooks?: [string];
  futureBooks?: [string];
  likedBooks?: [string];
  createdAt?: string;
  updatedAt?: string;
}
