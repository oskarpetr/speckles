import { Fragment } from "react";
import FadeIn from "../animation/FadeIn";
import Image from "next/image";
import { getAssetFileExtension } from "@/utils/images";
import { formatFileSize } from "@/utils/formatters";
import { IOrder } from "@/types/dtos/Order.types";
import { gridCardDelay } from "../shared/GridCard";
import GrayCard from "../shared/GrayCard";
import DownloadFileButton from "./DownloadFileButton";

interface Props {
  order: IOrder;
}

export default function OrderFiles({ order }: Props) {
  return (
    <GrayCard>
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
                <div className="opacity-50">
                  {file.fileName} • {formatFileSize(file.size)}
                </div>
              </div>
            </div>

            <DownloadFileButton
              assetId={order.asset.assetId}
              fileId={file.fileId}
              fileName={file.fileName}
            />
          </FadeIn>

          {index !== order.asset.files.length - 1 && (
            <FadeIn delay={gridCardDelay(0.2, index)}>
              <div className="border-b border-black-primary border-opacity-10"></div>
            </FadeIn>
          )}
        </Fragment>
      ))}
    </GrayCard>
  );
}
