import { IComment } from "@/types/dtos/Comment.types";
import { postCommentLike } from "@/utils/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toastError } from "../shared/Toast";
import Link from "next/link";
import Avatar from "../shared/Avatar";
import { formatDistance } from "date-fns";
import Like from "../shared/Like";

interface Props {
  comment: IComment;
}

export default function Comment({ comment }: Props) {
  // session
  const { data: session, status } = useSession();

  // like state
  const [liked, setLiked] = useState(comment.liked);

  const commentLikeQuery = useQuery({
    queryKey: ["comments", comment.commentId, "like", session?.user?.userId],
    queryFn: () =>
      postCommentLike(
        comment.commentId,
        session?.user?.userId ?? "",
        liked ? "remove" : "add"
      ),
    enabled: false,
  });

  // toggle like comment
  const toggleLikeComment = async () => {
    if (status === "unauthenticated") {
      toastError("You need to be logged in.");
      return;
    }

    if (liked) {
      comment.likes--;
    } else {
      comment.likes++;
    }

    commentLikeQuery.refetch();
  };

  const commentDistance = formatDistance(new Date(comment.date), new Date(), {
    addSuffix: true,
  });

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
