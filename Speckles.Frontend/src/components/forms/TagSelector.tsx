import { Dispatch, SetStateAction, useEffect } from "react";
import Section from "../shared/Section";
import AddTagForm from "./AddTagForm";
import { ITagShort } from "@/types/dtos/Tag.types";
import TagItem from "../asset/TagItem";
import NoItemsYet from "../shared/NoItemsYet";

interface Props {
  tags: ITagShort[];
  setTags: Dispatch<SetStateAction<ITagShort[]>>;
}

export default function TagSelector({ tags, setTags }: Props) {
  return (
    <Section title="Tags" chevron={false} className="h-60">
      <AddTagForm tags={tags} setTags={setTags} />

      <div className="mt-6">
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagItem key={tag.tagId} tag={tag} enableLink={false} />
            ))}
          </div>
        ) : (
          <NoItemsYet items="tags" />
        )}
      </div>
    </Section>
  );
}
