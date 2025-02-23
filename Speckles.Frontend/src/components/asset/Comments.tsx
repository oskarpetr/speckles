"use client";

import { IComment } from "@/types/dtos/Comment.types";
import FadeIn from "../animation/FadeIn";
import CommentItem from "./CommentItem";
import NoItemsYet from "../shared/NoItemsYet";
import { gridCardDelay } from "../shared/GridCard";
import AddCommentForm from "../forms/AddCommentForm";
import Separator from "../shared/Separator";
import { useSession } from "next-auth/react";
import { Fragment } from "react";

interface Props {
  comments: IComment[];
}

export default function Comments({ comments }: Props) {
  // session
  const { status } = useSession();

  return (
    <FadeIn delay={0} className="flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <FadeIn delay={gridCardDelay(0, index)} key={comment.commentId}>
              <CommentItem comment={comment} />
            </FadeIn>
          ))
        ) : (
          <NoItemsYet items="comments" />
        )}
      </div>

      {status === "authenticated" && (
        <Fragment>
          <Separator />
          <AddCommentForm />
        </Fragment>
      )}
    </FadeIn>
  );
}
