import { ITag } from "@/types/Tag.types";
import Link from "next/link";

interface Props {
  tags: ITag[];
}

export default function Tags({ tags }: Props) {
  return (
    tags.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Tag key={tag.tagId} tag={tag} />
        ))}
      </div>
    )
  );
}

function Tag({ tag }: { tag: ITag }) {
  return (
    <Link
      href={`/tags/${tag.tagId}`}
      className="text-sm bg-green-primary bg-opacity-20 border border-black-primary border-opacity-10 px-4 py-1.5 rounded-full font-bold"
    >
      {tag.name}
    </Link>
  );
}
