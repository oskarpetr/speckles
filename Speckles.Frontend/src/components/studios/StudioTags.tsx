import { Dispatch, SetStateAction } from "react";
import Button from "../shared/Button";
import FadeIn from "../animation/FadeIn";
import { ITag } from "@/types/Tag.types";

interface Props {
  tags: ITag[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

export default function StudioTags({ tags, selected, setSelected }: Props) {
  return (
    <FadeIn delay={0} className="flex flex-col gap-2 w-80 h-fit sticky top-44">
      {tags.map((tag, index) => (
        <FadeIn key={`tag_${tag.tagId}`} delay={0 + index * 0.05}>
          <Button
            key={tag.tagId}
            text={tag.name}
            type={selected === tag.tagId ? "primary" : "white"}
            onClick={() => setSelected(tag.tagId)}
            margin={false}
            secondaryText={tag.assets.length.toString()}
          />
        </FadeIn>
      ))}
    </FadeIn>
  );
}
