export interface IUser {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
  id: string;
}

export interface IGenericResponse {
  status: string;
  message: string;
}
