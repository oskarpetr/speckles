import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import Section from "../shared/Section";
import Icon from "../shared/Icon";
import { cn } from "@/utils/cn";
import FormError from "./FormError";

interface Props {
  title: string;
  avatarTitle: string;
  avatarSubtitle: string;
  avatar: string | null;
  setAvatar:
    | Dispatch<SetStateAction<string | null>>
    | Dispatch<SetStateAction<string>>;
  error: string | undefined;
  touched: boolean;
}

export default function AvatarSelector({
  title,
  avatarTitle,
  avatarSubtitle,
  avatar,
  setAvatar,
  error,
  touched,
}: Props) {
  // input ref
  const inputRef = useRef<HTMLInputElement>(null);

  // hovered state
  const [hovered, setHovered] = useState(false);

  // on change
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];

    if (image) {
      const reader = new FileReader();

      reader.readAsDataURL(image);
      reader.onload = () => {
        setAvatar(reader.result as string);
      };
    }
  };

  return (
    <Section title={title} chevron={false}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />

      <div className="flex items-center gap-8">
        <button
          type="button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => inputRef.current?.click()}
          className="w-[120px] h-[120px] relative"
        >
          {avatar ? (
            <img src={avatar} className="h-full rounded-full object-cover" />
          ) : (
            <div className="w-full h-full rounded-full bg-neutral-200 border border-black-primary border-opacity-10 transition-colors"></div>
          )}

          <div
            className={cn(
              "absolute w-full h-full top-0 rounded-full flex items-center justify-center transition-all",
              hovered ? "bg-black-primary" : "bg-none",
              hovered && avatar
                ? "bg-opacity-30"
                : hovered
                ? "bg-opacity-10"
                : "",
              avatar && !hovered ? "opacity-0" : "opacity-100"
            )}
          >
            <Icon name="Camera" size={32} color={avatar ? "white" : "black"} />
          </div>
        </button>

        <div>
          <div className="font-bold text-lg">{avatarTitle}</div>
          <div className="opacity-50">{avatarSubtitle}</div>
        </div>
      </div>

      <FormError error={error} touched={touched} />
    </Section>
  );
}
