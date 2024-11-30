import { IMemberShort } from "./Member.types";

export interface IComment {
  commentId: string;
  text: string;
  date: string;
  member: IMemberShort;
  likes: number;
  liked: boolean;
}
