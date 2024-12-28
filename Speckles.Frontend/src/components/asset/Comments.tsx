"use client";

import { IComment } from "@/types/dtos/Comment.types";
import FadeIn from "../animation/FadeIn";
import CommentItem from "./CommentItem";

interface Props {
  comments: IComment[];
}

export default function Comments({ comments }: Props) {
  return (
    <FadeIn delay={0} className="flex flex-col gap-8">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <FadeIn delay={index * 0.05} key={comment.commentId}>
            <CommentItem comment={comment} />
          </FadeIn>
        ))
      ) : (
        <div className="opacity-80">No comments yet.</div>
      )}
    </FadeIn>
  );
}
