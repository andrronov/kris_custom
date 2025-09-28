import { computed, watchEffect } from "vue";
import { useRoute, type RouteLocationRaw } from "vue-router";
import { useI18n } from "vue-i18n";
import { SUPPORTED_THEMES, FALLBACK_THEME } from "@/shared/config";
import { isDefined, anchor } from "@/shared/lib/utils";
import { useAppStore } from "@/shared/stores/application";
import type { AppTheme } from "@/shared/types";

export const usePlatform = () => {
  const appStore = useAppStore();
  const route = useRoute();
  const { t } = useI18n();

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

  const platformRoutes = computed(() => [
    {
      id: undefined,
      name: t("navigation.discounts"),
      to: {
        name: "main-landing",
        hash: anchor.prepare("discounts"),
      } as RouteLocationRaw<"main-landing">,
    },
    {
      id: undefined,
      name: t("navigation.best_sellers"),
      to: {
        name: "main-landing",
        hash: anchor.prepare("best-sellers"),
      } as RouteLocationRaw<"main-landing">,
    },
    {
      id: undefined,
      name: t("navigation.catalog"),
      to: {
        name: "main-landing",
        hash: anchor.prepare("best-sellers"),
      } as RouteLocationRaw<"main-landing">,
    },
    {
      id: undefined,
      name: t("navigation.about"),
      to: {
        name: "main-landing",
        hash: anchor.prepare("best-sellers"),
      } as RouteLocationRaw<"main-landing">,
    },
  ]);

  watchEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.value);
  });

  return {
    theme,
    platformRoutes,
  };
};
