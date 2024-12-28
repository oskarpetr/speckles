import { ITagShort } from "@/types/Tag.types";
import Link from "next/link";

interface Props {
  tag: ITagShort;
}

export default function TagItem({ tag }: Props) {
  return (
    <Link
      href={`/tags/${tag.tagId}`}
      className="focus:ring-4 ring-0 transition-all ring-green-light ring-opacity-50 text-sm bg-green-primary bg-opacity-10 hover:bg-opacity-20 border border-green-primary border-opacity-10 px-4 py-1.5 rounded-full font-semibold"
    >
      {tag.name}
    </Link>
  );
}
