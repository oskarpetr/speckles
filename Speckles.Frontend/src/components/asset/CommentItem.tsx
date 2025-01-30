import { IComment } from "@/types/dtos/Comment.types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toastError } from "../shared/Toast";
import Link from "next/link";
import Avatar from "../shared/Avatar";
import { formatDistance } from "date-fns";
import Like from "../shared/Like";
import { useCommentLikeMutation } from "@/hooks/useApi";

interface Props {
  comment: IComment;
}

export default function Comment({ comment }: Props) {
  // session
  const { status } = useSession();

  // like state
  const [liked, setLiked] = useState(comment.liked);

  const commentLikeMutation = useCommentLikeMutation(comment.commentId, liked);

  // toggle like comment
  const toggleLikeComment = () => {
    if (status !== "authenticated") {
      toastError("You need to be logged in.");
      return;
    }

    if (liked) {
      comment.likes--;
    } else {
      comment.likes++;
    }

    commentLikeMutation.mutate();
  };

  const commentDistance = formatDistance(
    new Date(comment.createdAt),
    new Date(),
    { addSuffix: true }
  );

  return (
    <div className="flex gap-6">
      <Avatar user={comment.author} size={60} link />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Link href={`/profiles/${comment.author.username}`}>
            <div className="font-extrabold">{comment.author.fullName}</div>
          </Link>

          <div className="opacity-50 font-semibold text-sm">
            {commentDistance}
          </div>
        </div>

        <div className="opacity-80">{comment.text}</div>

        <button onClick={toggleLikeComment} className="mt-2">
          <Like
            liked={liked}
            setLiked={status === "authenticated" ? setLiked : () => {}}
            iconSize="small"
            color="black"
            number={comment.likes}
          />
        </button>
      </div>
    </div>
  );
}
