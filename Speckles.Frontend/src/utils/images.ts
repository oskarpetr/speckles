const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

export function getStudioLogo(studioId: string) {
  const uri = encodeURIComponent(`logos/${studioId}.jpg`);
  return `${STORAGE_URL}/${uri}?alt=media`;
}

export function getAssetImage(assetId: string, imageId: string) {
  const uri = encodeURIComponent(`assets/${assetId}/images/${imageId}`);
  return `${STORAGE_URL}/${uri}?alt=media`;
}

export function getAvatar(userId: string) {
  const uri = encodeURIComponent(`avatars/${userId}.jpg`);
  return `${STORAGE_URL}/${uri}?alt=media`;
}

export function getAssetFile(assetId: string, fileName: string) {
  const uri = encodeURIComponent(`assets/${assetId}/files/${fileName}`);
  return `${STORAGE_URL}/${uri}?alt=media`;
}

export function getAssetFileExtension(fileName: string) {
  const split = fileName.split(".");
  let extension = split[split.length - 1].toLowerCase();

  const imageExtensions = ["png", "jpg", "jpeg", "gif", "bmp", "webp", "tiff"];
  if (imageExtensions.includes(extension)) extension = "image";

  return `/images/extensions/${extension}.png`;
}
