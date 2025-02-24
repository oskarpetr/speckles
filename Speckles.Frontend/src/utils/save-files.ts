"use client";

import JSZip from "jszip";
import { getFileDownloadUrl } from "./firebase/firebase-fns";
import { IFile } from "@/types/dtos/File.types";
import { toastError, toastSuccess } from "@/components/shared/Toast";
import toastMessages from "./toastMessages";
import { saveAs } from "file-saver";
import { IOrder } from "@/types/dtos/Order.types";

// download all files
export const downloadAllFiles = async (order: IOrder) => {
  try {
    const zip = new JSZip();

    for (const file of order.asset.files) {
      const url = await getFileDownloadUrl(order.asset.assetId, file.fileId);

      const response = await fetch(url);
      const blob = await response.blob();
      console.log(file.fileId);
      zip.file(file.fileName, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });

    saveAs(zipBlob, `${order.asset.name}.zip`);
  } catch (error) {
    toastError(toastMessages.user.fileDownloadFailed);
  }
};

// download file
export const downloadFile = async (
  assetId: string,
  fileId: string,
  fileName: string
) => {
  try {
    const fileUrl = await getFileDownloadUrl(assetId, fileId);

    const response = await fetch(fileUrl);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    link.click();

    URL.revokeObjectURL(link.href);

    toastSuccess(toastMessages.user.fileDownloaded);
  } catch (error) {
    toastError(toastMessages.user.fileDownloadFailed);
  }
};
