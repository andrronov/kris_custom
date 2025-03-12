import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { SUPPORTED_THEMES, FALLBACK_THEME } from "@/shared/config";
import { isDefined } from "@/shared/lib/utils";
import { useAppStore } from "@/shared/stores/application";
import type { AppTheme } from "@/shared/types";

export const usePlatform = () => {
  const appStore = useAppStore();
  const route = useRoute();

  const theme = computed<AppTheme>(() => {
    if (isDefined(route.meta.theme)) {
      return route.meta.theme as AppTheme;
    }

    if (appStore.storedTheme === "auto") {
      return appStore.systemTheme;
    }

    const isSupported = SUPPORTED_THEMES.includes(appStore.storedTheme);

    return isSupported ? appStore.storedTheme : FALLBACK_THEME;
  });

  watchEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.value);
  });

  return {
    theme,
  };
};
