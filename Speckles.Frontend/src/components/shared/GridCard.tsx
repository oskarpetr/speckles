import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  secondaryElement?: JSX.Element;
  link: string;
  imageSrc: string;
  imageAlt: string;
}

export default function GridCard({
  title,
  secondaryElement,
  link,
  imageSrc,
  imageAlt,
}: Props) {
  return (
    <div className="rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300">
      <Link href={link}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={0}
          priority
          // placeholder="blur"
          // blurDataURL={base64}
          className="w-full h-full p-0 object-cover object-center"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black-primary bg-opacity-0 group-hover:bg-opacity-10 transition-colors"></div>

        <div className="flex justify-between items-center absolute bottom-0 left-0 px-8 pb-4 pt-12 w-full bg-gradient-to-t from-[#12121280] to-[#12121200]">
          <div className="font-bold text-white">{title}</div>
          {secondaryElement}
        </div>
      </Link>
    </div>
  );
}

interface SkeletonProps {
  title: string;
  secondaryElement?: JSX.Element;
}

export function SkeletonGridCard({ title, secondaryElement }: SkeletonProps) {
  return (
    <div className="rounded-lg overflow-hidden group w-full aspect-w-16 aspect-h-10 bg-neutral-300">
      <div>
        <div className="absolute top-0 left-0 w-full h-full bg-black-primary bg-opacity-0 group-hover:bg-opacity-10 transition-colors"></div>

        <div className="flex justify-between items-center absolute bottom-0 left-0 px-8 pb-4 pt-12 w-full bg-gradient-to-t from-[#12121280] to-[#12121200]">
          <div className="font-bold text-white">{title}</div>
          {secondaryElement}
        </div>
      </div>
    </div>
  );
}
