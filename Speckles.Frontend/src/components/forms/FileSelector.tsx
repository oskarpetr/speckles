import { Dispatch, SetStateAction, useState } from "react";
import AddFileModal from "../modals/AddFileModal";
import Section from "../shared/Section";
import { formatFileSize } from "@/utils/formatters";
import Image from "next/image";
import { getAssetFileExtension } from "@/utils/images";
import Icon from "../shared/Icon";
import { IFile } from "@/types/dtos/File.types";
import { cn } from "@/utils/cn";

interface Props {
  files: IFile[];
  setFiles: Dispatch<SetStateAction<IFile[]>>;
}

export default function FileSelector({ files, setFiles }: Props) {
  // modal state
  const [open, setOpen] = useState(false);

  return (
    <Section title="Files" chevron={false}>
      <div className="grid grid-cols-2 gap-4">
        {files.map((file) => (
          <FileSelectorItem key={file.fileId} file={file} setFiles={setFiles} />
        ))}

        <div
          className="px-4 py-2 h-16 bg-black-primary bg-opacity-5 border-2 border-dashed border-black-primary border-opacity-10 rounded-lg flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="flex gap-2 justify-center items-center">
            <Icon name="Plus" size={28} className="opacity-50" />
            <div className="opacity-50">Add file</div>
          </div>
        </div>
      </div>

      <AddFileModal open={open} setOpen={setOpen} setFiles={setFiles} />
    </Section>
  );
}

interface ItemProps {
  file: IFile;
  setFiles: Dispatch<SetStateAction<IFile[]>>;
}

function FileSelectorItem({ file, setFiles }: ItemProps) {
  // hovered state
  const [hovered, setHovered] = useState(false);

  const deleteFile = () => {
    setFiles((prev) => prev.filter((fil) => fil.fileId !== file.fileId));
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2 h-16 bg-black-primary bg-opacity-5 flex items-center gap-4 rounded-lg border border-black-primary border-opacity-10"
    >
      <Image
        src={getAssetFileExtension(file.fileName)}
        alt={file.fileName}
        width={256}
        height={0}
        className="w-10"
      />

      <div>
        <div className="font-semibold">
          {file.name.length > 15
            ? file.name.substring(0, 15) + "..."
            : file.name}
        </div>
        <div className="text-sm opacity-50">
          {file.fileName.length > 10
            ? file.fileName.substring(0, 10) + "..."
            : file.fileName}
          • {formatFileSize(file.size)}
        </div>
      </div>

      <button
        onClick={deleteFile}
        className={cn(
          "flex justify-center items-center bg-red-600 w-9 h-9 rounded-full absolute -top-3 -right-3 transition-opacity",
          hovered ? "opacity-100" : "opacity-0"
        )}
      >
        <Icon name="X" color="white" size={20} />
      </button>
    </div>
  );
}
