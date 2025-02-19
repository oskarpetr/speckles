import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Section from "../shared/Section";
import Image from "next/image";
import { IImage } from "@/types/dtos/Image.types";
import AddImageModal from "../modals/AddImageModal";
import Icon from "../shared/Icon";
import { cn } from "@/utils/cn";

interface Props {
  images: IImage[];
  setImages: Dispatch<SetStateAction<IImage[]>>;
  thumbnailId: string | null;
  setThumbnailId: Dispatch<SetStateAction<string | null>>;
}

export default function ImageSelector({
  images,
  setImages,
  thumbnailId,
  setThumbnailId,
}: Props) {
  // modal state
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (images.length > 0 && !thumbnailId) {
      setThumbnailId(images[0].imageId);
    }
  }, [images]);

  return (
    <Section title="Images" chevron={false}>
      <div className="grid grid-cols-2 gap-4">
        {images.map((image) => (
          <ImageSelectorItem
            key={image.imageId}
            image={image}
            setImages={setImages}
            thumbnailId={thumbnailId}
            setThumbnailId={setThumbnailId}
          />
        ))}

        <div
          className="px-4 py-2 h-36 bg-black-primary bg-opacity-5 border-2 border-dashed border-black-primary border-opacity-10 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="flex flex-col gap-2 justify-center items-center">
            <Icon name="Plus" size={28} className="opacity-50" />
            <div className="opacity-50">Add image</div>
          </div>
        </div>
      </div>

      <AddImageModal open={open} setOpen={setOpen} setImages={setImages} />
    </Section>
  );
}

interface ItemProps {
  image: IImage;
  setImages: Dispatch<SetStateAction<IImage[]>>;
  thumbnailId: string | null;
  setThumbnailId: Dispatch<SetStateAction<string | null>>;
}

function ImageSelectorItem({
  image,
  setImages,
  thumbnailId,
  setThumbnailId,
}: ItemProps) {
  // hovered state
  const [hovered, setHovered] = useState(false);

  const deleteImage = () => {
    setImages((prev) => prev.filter((img) => img.imageId !== image.imageId));
  };

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => setThumbnailId(image.imageId)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden bg-black-primary bg-opacity-5 flex items-center gap-4 rounded-lg transition-all border border-black-primary border-opacity-10">
        <Image
          src={image.base64!}
          alt={image.alt}
          width={200}
          height={0}
          className="w-full h-36 object-cover rounded-sm"
        />
      </div>

      <button
        onClick={deleteImage}
        className={cn(
          "flex justify-center items-center bg-red-600 w-9 h-9 rounded-full absolute top-3 right-3 transition-opacity",
          hovered ? "opacity-100" : "opacity-0"
        )}
      >
        <Icon name="X" color="white" size={20} />
      </button>

      <div
        className={cn(
          "rounded-lg absolute bottom-0 left-0 h-20 pl-6 w-full bg-gradient-to-t from-[#12121280] to-[#12121200] transition-all",
          image.imageId === thumbnailId ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-white font-bold mt-11">Thumbnail</div>
      </div>
    </div>
  );
}
