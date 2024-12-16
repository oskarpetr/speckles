import { IMemberShort } from "./Member.types";

export interface IComment {
  commentId: string;
  text: string;
  date: string;
  author: IMemberShort;
  likes: number;
  liked: boolean;
}
