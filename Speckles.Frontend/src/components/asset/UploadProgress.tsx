import { progress } from "framer-motion";
import Section from "../shared/Section";
import { formatFileSize } from "@/utils/formatters";

interface Props {
  items: Item[];
}

interface Item {
  name: string;
  progress: number;
  bytes: number;
}

export default function UploadProgress({ items }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {items.map((item, index) => (
        <Section
          key={index}
          title={item.name}
          chevron={false}
          className="relative w-full"
        >
          <div className="absolute top-0 right-0">
            {item.progress.toFixed(1)}%
          </div>

          <div className="relative bg-neutral-200 rounded-full w-full h-3">
            <div
              className="absolute bg-green-primary rounded-full h-3"
              style={{
                width: `${item.progress}%`,
              }}
            ></div>
          </div>

          <div className="mt-2 text-sm text-neutral-500 text-right transition-all">
            {item.progress === 100
              ? "Completed"
              : `${formatFileSize(
                  (item.progress / 100) * item.bytes
                )} / ${formatFileSize(item.bytes)}`}
          </div>
        </Section>
      ))}
    </div>
  );
}
