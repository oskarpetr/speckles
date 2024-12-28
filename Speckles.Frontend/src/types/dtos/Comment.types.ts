import { IUserShort } from "./User.types";

export interface IComment {
  commentId: string;
  text: string;
  date: string;
  author: IUserShort;
  likes: number;
  liked: boolean;
}
