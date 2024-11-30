import { IComment } from "@/types/Comment.types";
import Link from "next/link";
import { formatDistance } from "date-fns";
import FadeIn from "../animation/FadeIn";
import Avatar from "../common/Avatar";
import { useState } from "react";
import Like from "../common/Like";

interface Props {
  comments: IComment[];
}

export default function Comments({ comments }: Props) {
  return (
    <FadeIn delay={0} className="flex flex-col gap-8 w-[600px]">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <FadeIn delay={index * 0.05} key={comment.commentId}>
            <Comment comment={comment} />
          </FadeIn>
        ))
      ) : (
        <div className="opacity-80">No comments yet.</div>
      )}
    </FadeIn>
  );
}

function Comment({ comment }: { comment: IComment }) {
  const [liked, setLiked] = useState(comment.liked);

  // toggle like comment
  const toggleLikeComment = async () => {
    if (liked) {
      comment.likes -= 1;
    } else {
      comment.likes += 1;
    }

    // request
  };

  return (
    <div className="flex gap-6">
      <Link href={`/members/${comment.member.username}`}>
        <Avatar
          memberId={comment.member.memberId}
          fullName={comment.member.fullName}
          size={60}
        />
      </Link>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Link href={`/members/${comment.member.username}`}>
            <div className="font-extrabold">{comment.member.fullName}</div>
          </Link>

          <div className="opacity-50 font-semibold text-sm">
            {formatDistance(new Date(comment.date), new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>

        <div className="opacity-80">{comment.text}</div>

        <button onClick={toggleLikeComment} className="mt-2">
          <Like
            liked={liked}
            setLiked={setLiked}
            iconSize="small"
            color="black"
            number={comment.likes}
          />
        </button>
      </div>
    </div>
  );
}
