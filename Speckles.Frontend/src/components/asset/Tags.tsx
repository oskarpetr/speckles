import { ITagShort } from "@/types/Tag.types";
import TagItem from "./TagItem";

interface Props {
  tags: ITagShort[];
}

export default function Tags({ tags }: Props) {
  return (
    tags.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagItem key={tag.tagId} tag={tag} />
        ))}
      </div>
    )
  );
}
