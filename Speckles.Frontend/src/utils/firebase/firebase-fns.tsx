import { IFile } from "@/types/dtos/File.types";
import { IImage } from "@/types/dtos/Image.types";
import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "./firebase";
import { Dispatch, SetStateAction } from "react";

// upload studio logo
export async function uploadStudioLogo(studioId: string, base64: string) {
  const logoRef = ref(storage, `logos/${studioId}.webp`);
  const blob = base64ToBlob(base64, "image/webp");

  await uploadBytes(logoRef, blob, { contentType: "image/webp" });
}

// upload avatar
export async function uploadAvatar(userId: string, base64: string) {
  const avatarRef = ref(storage, `avatars/${userId}.webp`);
  const blob = base64ToBlob(base64, "image/webp");

  await uploadBytes(avatarRef, blob, { contentType: "image/webp" });
}

// check if avatar exists
export async function checkAvatarExists(userId: string) {
  const avatarRef = ref(storage, `avatars/${userId}.webp`);

  try {
    await getMetadata(avatarRef);
    return true;
  } catch (error: any) {
    if (error.code === "storage/object-not-found") {
      return false;
    } else {
      return false;
    }
  }
}

// upload asset images
export async function uploadAssetImages(
  assetId: string,
  images: IImage[],
  setPercetange: Dispatch<SetStateAction<number>>
) {
  const uploadPromises = images.map(async (image) => {
    const imageRef = ref(
      storage,
      `assets/${assetId}/images/${image.imageId}.webp`
    );
    const blob = base64ToBlob(image.base64!, "image/webp");

    const uploadTask = uploadBytesResumable(imageRef, blob, {
      contentType: "image/webp",
    });

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPercetange(progress);
    });

    await uploadTask;
  });

  await Promise.all(uploadPromises);
}

// upload asset files
export async function uploadAssetFiles(
  assetId: string,
  files: IFile[],
  setPercetange: Dispatch<SetStateAction<number>>
) {
  const uploadPromises = files.map(async (file) => {
    const fileRef = ref(storage, `assets/${assetId}/files/${file.fileId}`);
    const blob = base64ToBlob(file.base64!, "application/octet-stream");

    const uploadTask = uploadBytesResumable(fileRef, blob, {
      contentType: "application/octet-stream",
    });

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPercetange(progress);
    });

    await uploadTask;
  });

  await Promise.all(uploadPromises);
}

// upload project images
export async function uploadProjectImages(
  projectId: string,
  images: IImage[],
  setPercetange: Dispatch<SetStateAction<number>>
) {
  const uploadPromises = images.map(async (image) => {
    const imageRef = ref(
      storage,
      `projects/${projectId}/${image.imageId}.webp`
    );
    const blob = base64ToBlob(image.base64!, "image/webp");

    const uploadTask = uploadBytesResumable(imageRef, blob, {
      contentType: "image/webp",
    });

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPercetange(progress);
    });

    await uploadTask;
  });

  await Promise.all(uploadPromises);
}

// delete asset
export async function deleteAsset(assetId: string) {
  const folderRef = ref(storage, `assets/${assetId}`);

  const result = await listAll(folderRef);
  const deletePromises = result.items.map((fileRef) => deleteObject(fileRef));
  await Promise.all(deletePromises);

  const subfolderPromises = result.prefixes.map(async (subfolderRef) => {
    const subfolderResult = await listAll(subfolderRef);
    const subfolderDeletePromises = subfolderResult.items.map((fileRef) =>
      deleteObject(fileRef)
    );
    await Promise.all(subfolderDeletePromises);
  });

  await Promise.all(subfolderPromises);
}

// delete project
export async function deleteProject(projectId: string) {
  const folderRef = ref(storage, `projects/${projectId}`);

  const result = await listAll(folderRef);
  const deletePromises = result.items.map((fileRef) => deleteObject(fileRef));
  await Promise.all(deletePromises);
}

// delete studio
export async function deleteStudio(studioId: string, assetIds: string[]) {
  const logoRef = ref(storage, `logos/${studioId}.webp`);
  await deleteObject(logoRef);

  const deletePromises = assetIds.map((assetId) => deleteAsset(assetId));
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

// get base64 file size
export function getBase64FileSize(base64: string) {
  const base64Data = base64.split(",")[1];

  const byteLength =
    (base64Data.length * 3) / 4 -
    (base64Data.endsWith("==") ? 2 : base64Data.endsWith("=") ? 1 : 0);

  return byteLength;
}

// fetch file as base64
export async function fetchFileAsBase64(url: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  } catch (error) {
    return null;
  }
}

// get file download url
export async function getFileDownloadUrl(assetId: string, fileId: string) {
  const fileRef = ref(storage, `assets/${assetId}/files/${fileId}`);
  const url = await getDownloadURL(fileRef);

  return url;
}
