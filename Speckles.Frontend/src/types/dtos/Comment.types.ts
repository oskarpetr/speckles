import { IUserShort } from "./User.types";

export interface IComment {
  commentId: string;
  text: string;
  createdAt: string;
  author: IUserShort;
  likes: number;
  liked: boolean;
}
