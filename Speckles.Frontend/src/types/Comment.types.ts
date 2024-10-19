import { IMemberDto } from "./Member.types";

export interface IComment {
  commentId: string;
  text: string;
  date: string;
  member: IMemberDto;
}
