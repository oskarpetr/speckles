"use client";

import { IComment } from "@/types/dtos/Comment.types";
import FadeIn from "../animation/FadeIn";
import CommentItem from "./CommentItem";
import NoItemsYet from "../shared/NoItemsYet";
import { gridCardDelay } from "../shared/GridCard";

interface Props {
  comments: IComment[];
}

export default function Comments({ comments }: Props) {
  return (
    <FadeIn delay={0} className="flex flex-col gap-8">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <FadeIn delay={gridCardDelay(0, index)} key={comment.commentId}>
            <CommentItem comment={comment} />
          </FadeIn>
        ))
      ) : (
        <NoItemsYet items="comments" />
      )}
    </FadeIn>
  );
}
