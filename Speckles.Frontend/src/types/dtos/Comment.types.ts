import { IUserShort } from "./User.types";

export interface IComment {
  commentId: string;
  text: string;
  createdAt: string;
  author: IUserShort;
  likes: number;
  liked: boolean;
}

export interface ICommentPostBody {
  assetId: string;
  userId: string;
  text: string;
}

export interface ICommentPutBody {
  text: string;
}
