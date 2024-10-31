import { IComment } from "@/types/Comment.types";
import Section from "../common/Section";
import Link from "next/link";
import Image from "next/image";
import { getAvatar } from "@/utils/images";
import { formatDate } from "@/utils/formatters";
import { formatDistance } from "date-fns";

interface Props {
  comments: IComment[];
}

export default function Comments({ comments }: Props) {
  return (
    <div className="w-[600px]">
      <Section title="Comments" />

      <div className="flex flex-col gap-8">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.commentId} comment={comment} />
          ))
        ) : (
          <div className="opacity-80">No comments.</div>
        )}
      </div>
    </div>
  );
}

function Comment({ comment }: { comment: IComment }) {
  return (
    <Link href={`/members/${comment.member.username}`} className="flex gap-4">
      <Image
        src={getAvatar(comment.member.memberId)}
        alt={`${comment.member.username}'s Avatar`}
        width={60}
        height={60}
        className="rounded-full w-16 h-16"
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="font-extrabold">{comment.member.username}</div>
          <div className="opacity-50 font-semibold">
            {formatDistance(new Date(comment.date), new Date(), {
              addSuffix: true,
            })}
          </div>
        </div>
        <div className="opacity-80">{comment.text}</div>
      </div>
    </Link>
  );
}
