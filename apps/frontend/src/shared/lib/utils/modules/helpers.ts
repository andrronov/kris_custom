import { MEDIA_URL } from "@/shared/config";

export function getStorageKey(key: string) {
  return `kc-${key}`;
}

export function getMediaUrl(path: string) {
  return `${MEDIA_URL}/${path}`;
}
