export interface IAuthState {
  name: string | null;
  token: string | null;
  role: string | null;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
  id: string;
}
export interface IUserState {
  token: string | null;
  name: string | null;
  role: string | null;
}

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

export interface IGenericResponse {
  name: string;
  token: string;
  status: string;
  message: string;
  role: string;
}

export interface IRegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface ILoginCredentials {
  username: string;
  password: string;
}

export interface IBooksState {
  bookSearch: string | null;
  pageNumber: number | null;
}

export interface IBookModel {
  _id: string;
  title: string;
  description: string;
  imgUrl: string;
  author: string;
  user: { _id?: string; name?: string; role?: string };
  userName?: string;
  likes?: [string];
  uploadedByUsers?: [string];
  createdAt: string;
  updatedAt: string;
}

export interface IBookFormProps {
  _id?: string;
  title?: string;
  description?: string;
  imgUrl?: string;
  cloudinaryId?: string;
  userName?: string;
  author?: string;
  user?: { _id?: string; name: string; role: string };
  cover?: HTMLImageElement;
  // handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface IPagination {
  page: number;
  pages: number;
  changePage: (num: any) => void;
}

export interface ISearchBarProps {
  setPage: (str: any) => void;
}

export interface IDataError {
  data: {
    message: string;
    stack?: string;
  };
  status: number;
}
