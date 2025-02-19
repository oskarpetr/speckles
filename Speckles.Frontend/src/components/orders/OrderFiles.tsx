import { Fragment } from "react";
import FadeIn from "../animation/FadeIn";
import Image from "next/image";
import { getAssetFileExtension } from "@/utils/images";
import { formatFileSize } from "@/utils/formatters";
import Link from "next/link";
import RoundedButton from "../shared/RoundedButton";
import { IOrder } from "@/types/dtos/Order.types";
import { gridCardDelay } from "../shared/GridCard";

interface Props {
  order: IOrder;
}

export default function OrderFiles({ order }: Props) {
  return (
    <div className="flex flex-col gap-6 h-fit bg-neutral-100 p-8 rounded-lg border border-black-primary border-opacity-10">
      {order.asset.files.map((file, index) => (
        <Fragment key={`file_${file.fileId}`}>
          <FadeIn
            delay={gridCardDelay(0.2, index)}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <Image
                src={getAssetFileExtension(file.fileName)}
                alt={file.fileName}
                width={256}
                height={0}
                className="w-16"
              />

              <div>
                <div className="font-bold text-lg">{file.name}</div>
                <div className="opacity-50">{formatFileSize(file.size)}</div>
              </div>
            </div>

            <Link
              href={`/api/download?assetId=${order.asset.assetId}&fileName=${file.fileId}`}
            >
              <RoundedButton icon="DownloadSimple" colorType="secondary" />
            </Link>
            {/* <Link
              href={`/api/download?assetId=${order.asset.assetId}&fileName=${file.fileName}`}
              className="flex gap-2 items-center bg-neutral-200 hover:bg-neutral-300 transition-colors px-7 py-2.5 rounded-lg border border-black-primary border-opacity-10 font-semibold"
            >
              <DownloadSimple size={20} />
              Download
            </Link> */}
          </FadeIn>

          {index !== order.asset.files.length - 1 && (
            <FadeIn delay={gridCardDelay(0.2, index)}>
              <div className="border-b border-black-primary border-opacity-10"></div>
            </FadeIn>
          )}
        </Fragment>
      ))}
    </div>
  );
}
