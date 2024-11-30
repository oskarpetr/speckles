import { ITagShort } from "@/types/Tag.types";
import Link from "next/link";

interface Props {
  tags: ITagShort[];
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

function Tag({ tag }: { tag: ITagShort }) {
  return (
    <Link
      href={`/tags/${tag.tagId}`}
      className="focus:ring-4 ring-0 transition-all ring-green-light ring-opacity-50 text-sm bg-green-primary bg-opacity-10 hover:bg-opacity-20 border border-green-primary border-opacity-10 px-4 py-1.5 rounded-full font-semibold"
    >
      {tag.name}
    </Link>
  );
}
