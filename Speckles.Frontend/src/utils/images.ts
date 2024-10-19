const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL;

export function getStudioLogo(studioId: string) {
  return `${STORAGE_URL}/logos%2F${studioId}.png?alt=media`;
}

export function getAssetImage(imageId: string) {
  return `${STORAGE_URL}/assets%2F${imageId}.jpg?alt=media`;
}
