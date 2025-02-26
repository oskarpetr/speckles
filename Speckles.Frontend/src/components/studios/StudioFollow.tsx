import { useState } from "react";
import Button from "../shared/Button";
import Like from "../shared/Like";
import { useFollowMutation } from "@/hooks/useApi";
import { IUserFollowPostBody } from "@/types/dtos/UserFollow.types";
import { useSession } from "next-auth/react";
import { existsInLocalFollowing, localFollowingToggle } from "@/utils/local";

interface Props {
  slug: string;
  studioName: string;
  following: boolean;
}

export default function StudioFollow({ slug, studioName, following }: Props) {
  // session
  const { data: session, status } = useSession();

  // determine if studio is followed
  const determineFollowing = () => {
    if (status === "authenticated") {
      return following;
    } else {
      return existsInLocalFollowing(slug);
    }
  };

  // followed state
  const [followed, setFollowed] = useState(determineFollowing);

  // follow mutation
  const followMutation = useFollowMutation(studioName, followed);

  // toggle follow
  const toggleFollow = () => {
    setFollowed(!followed);

    if (status === "authenticated") {
      const body: IUserFollowPostBody = {
        userId: session?.user.userId ?? "",
        slug: slug,
      };

      followMutation.mutate(body);
    } else {
      localFollowingToggle(slug, followed);
    }
  };

  return (
    <div className="absolute -top-2 -right-3">
      <Button type="white" size="small" circle={true} onClick={toggleFollow}>
        <Like
          liked={followed}
          setLiked={setFollowed}
          iconSize="small"
          color="black"
        />
      </Button>
    </div>
  );
}
