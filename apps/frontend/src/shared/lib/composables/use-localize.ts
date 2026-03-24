import { useAppStore } from "@/shared/stores/application";
import { FALLBACK_LANGUAGE } from "@kris-customs/shared/config";
import type { LocalizedString } from "@kris-customs/shared/types";

export function useLocalize() {
  const appStore = useAppStore();

  const l = (locale: LocalizedString | null | undefined): string => {
    if (!locale) return "";

    return locale[appStore.lang] || locale[FALLBACK_LANGUAGE] || "";
  };

  return { l };
}
