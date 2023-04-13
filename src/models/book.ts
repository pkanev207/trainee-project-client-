export interface BookModel {
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
