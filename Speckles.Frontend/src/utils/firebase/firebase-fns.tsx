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

// upload studio logo
export async function uploadStudioLogo(studioId: string, base64: string) {
  const logoRef = ref(storage, `logos/${studioId}.webp`);
  const blob = base64ToBlob(base64, "image/webp");

  await uploadBytes(logoRef, blob, { contentType: "image/webp" });
}

// upload asset images
export async function uploadAssetImages(assetId: string, images: IImage[]) {
  const uploadPromises = images.map(async (image) => {
    const imageRef = ref(
      storage,
      `assets/${assetId}/images/${image.imageId}.webp`
    );
    const blob = base64ToBlob(image.base64!, "image/webp");

    await uploadBytes(imageRef, blob, { contentType: "image/webp" });
  });

  await Promise.all(uploadPromises);
}

// upload asset files
export async function uploadAssetFiles(assetId: string, files: IFile[]) {
  const uploadPromises = files.map(async (file) => {
    const fileRef = ref(storage, `assets/${assetId}/files/${file.fileId}`);
    await uploadString(fileRef, file.base64!, "data_url");
  });

  await Promise.all(uploadPromises);
}

// delete asset
export async function deleteAsset(assetId: string) {
  console.log("here");
  const folderRef = ref(storage, `assets/${assetId}`);

  const result = await listAll(folderRef);
  console.log(result);
  const deletePromises = result.items.map((fileRef) => deleteObject(fileRef));
  await Promise.all(deletePromises);
  console.log(deletePromises);

  const subfolderPromises = result.prefixes.map(async (subfolderRef) => {
    const subfolderResult = await listAll(subfolderRef);
    const subfolderDeletePromises = subfolderResult.items.map((fileRef) =>
      deleteObject(fileRef)
    );
    await Promise.all(subfolderDeletePromises);
  });
  console.log(subfolderPromises);
  await Promise.all(subfolderPromises);
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
