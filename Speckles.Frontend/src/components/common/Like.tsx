import { motion, useAnimationControls } from "framer-motion";
import Icon from "./Icon";
import { Dispatch, SetStateAction } from "react";
import { BEZIER_CURVE } from "@/utils/animation";
import { cn } from "@/utils/cn";

interface Props {
  liked: boolean;
  setLiked: Dispatch<SetStateAction<boolean>>;
  iconSize: "big" | "small";
  color: "black" | "white";
  number?: number;
}

export default function Like({
  liked,
  setLiked,
  iconSize,
  color,
  number,
}: Props) {
  // toggle like animation
  const likeControls = useAnimationControls();

  const toggleLike = async () => {
    setLiked((prev) => !prev);

    await likeControls.start({ scale: 1.2 });
    await likeControls.start({ scale: 1 });
  };

  return (
    <div
      className="cursor-pointer flex items-center gap-1.5"
      onClick={toggleLike}
    >
      <motion.div
        animate={likeControls}
        transition={{ duration: 0.3, ease: BEZIER_CURVE }}
      >
        <Icon
          name="Heart"
          size={iconSize === "big" ? 28 : 20}
          className={cn(
            "transition-colors",
            color === "black" ? "text-black-primary" : "text-white"
          )}
          weight={liked ? "fill" : "regular"}
        />
      </motion.div>

      {number && <div className="opacity-70 font-bold">{number}</div>}
    </div>
  );
}
