import { IComment } from "@/types/dtos/Comment.types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toastError } from "../shared/Toast";
import Link from "next/link";
import Avatar from "../shared/Avatar";
import { formatDistance } from "date-fns";
import Like from "../shared/Like";
import { useCommentDelete, useCommentLikeMutation } from "@/hooks/useApi";
import { IMenuItem } from "@/types/MenuItem.types";
import DropdownMenu from "../shared/DropdownMenu";
import PopupTooltip from "../shared/PopupTooltip";
import Icon from "../shared/Icon";
import { useParams } from "next/navigation";
import EditCommentForm from "../forms/EditCommentForm";

interface Props {
  comment: IComment;
}

export default function Comment({ comment }: Props) {
  // asset id param
  const { assetId } = useParams();

  // session
  const { data: session, status } = useSession();
  const isCommentOwner = comment.author.userId === session?.user.userId;

  // like state
  const [liked, setLiked] = useState(comment.liked);

  // comment like mutation
  const commentLikeMutation = useCommentLikeMutation(comment.commentId, liked);

  // comment delete
  const commentDelete = useCommentDelete(assetId as string, comment.commentId);

  // edit state
  const [editingMode, setEditingMode] = useState(false);

  // comment items
  const commentItems: IMenuItem[] = [
    {
      text: "Edit comment",
      onClick: () => setEditingMode(true),
    },
    {
      text: "Delete comment",
      onClick: commentDelete.mutate,
    },
  ];

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

  const onUpdateSuccess = () => {
    setEditingMode(false);
  };

  // comment distance
  const commentDistance = formatDistance(
    new Date(comment.createdAt),
    new Date(),
    { addSuffix: true }
  );

  return !editingMode ? (
    <div className="flex gap-6">
      <Avatar user={comment.author} size={60} link />

      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={`/profiles/${comment.author.username}`}>
              <div className="font-extrabold">{comment.author.fullName}</div>
            </Link>

            <div className="opacity-50 font-semibold text-sm">
              {commentDistance}
            </div>
          </div>

          {isCommentOwner && (
            <PopupTooltip
              button={
                <Icon name="DotsThree" size={24} className="cursor-pointer" />
              }
              anchor="right start"
              className="ml-4"
            >
              <DropdownMenu items={commentItems} />
            </PopupTooltip>
          )}
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
  ) : (
    <EditCommentForm
      commentId={comment.commentId}
      text={comment.text}
      onSuccess={onUpdateSuccess}
    />
  );
}
