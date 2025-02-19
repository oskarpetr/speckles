import { IFile } from "@/types/dtos/File.types";
import { IImage } from "@/types/dtos/Image.types";
import {
  deleteObject,
  listAll,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { storage } from "./firebase";

// upload asset images
export async function uploadAssetImages(assetId: string, images: IImage[]) {
  const uploadPromises = images.map(async (image) => {
    const imageRef = ref(storage, `assets/${assetId}/images/${image.imageId}`);
    const blob = base64ToBlob(image.base64!, "image/jpeg");

    await uploadBytes(imageRef, blob, { contentType: "image/jpeg" });
  });

  await Promise.all(uploadPromises);
}

// upload asset files
export async function uploadAssetFiles(assetId: string, files: IFile[]) {
  const uploadPromises = files.map(async (file) => {
    const imageRef = ref(storage, `assets/${assetId}/files/${file.fileId}`);

    await uploadString(imageRef, file.base64!, "data_url");
  });

  await Promise.all(uploadPromises);
}

// delete asset
export async function deleteAsset(assetId: string) {
  const folderRef = ref(storage, `assets/${assetId}`);

  const result = await listAll(folderRef);
  const deletePromises = result.items.map((fileRef) => deleteObject(fileRef));

  await Promise.all(deletePromises);
}

// convert base64 to blob
function base64ToBlob(base64: string, contentType: string): Blob {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}
