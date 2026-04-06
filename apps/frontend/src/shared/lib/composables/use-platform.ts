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

  const platform = computed(() => {
    const name = route.meta.platform;

    const isLanding = name === "landing";

    return {
      name,
      isLanding,
    } as const;
  });

  const mainPlatformLinks = computed(() => ({
    catalog: {
      id: undefined,
      name: t("navigation.catalog"),
      to: {
        // TODO: change to catalog link
        name: "main-landing",
        hash: anchor.prepare("faq"),
      } as RouteLocationRaw<"main-landing">,
    },
    home: {
      id: undefined,
      name: t("navigation.home"),
      to: {
        name: "main-landing",
      } as RouteLocationRaw<"main-landing">,
    },
  }));

  const platformRoutes = computed(() => ({
    landing: {
      primary: [mainPlatformLinks.value.catalog],
      secondary: [
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
          name: t("navigation.how_get_them"),
          to: {
            name: "main-landing",
            hash: anchor.prepare("how-get-new-nails"),
          } as RouteLocationRaw<"main-landing">,
        },
        {
          id: undefined,
          name: t("navigation.why_us"),
          to: {
            name: "main-landing",
            hash: anchor.prepare("why-us"),
          } as RouteLocationRaw<"main-landing">,
        },
        {
          id: undefined,
          name: t("navigation.faq"),
          to: {
            name: "main-landing",
            hash: anchor.prepare("faq"),
          } as RouteLocationRaw<"main-landing">,
        },
      ],
    },
    product: {
      primary: [mainPlatformLinks.value.home, mainPlatformLinks.value.catalog],
      secondary: [
        {
          id: undefined,
          name: t("navigation.main"),
          to: {
            name: "product",
            hash: anchor.prepare("main"),
          } as RouteLocationRaw<"product">,
        },
      ],
    },
  }));

  const currentPlatformRoutes = computed(() => {
    return platformRoutes.value[platform.value.name];
  });

  watchEffect(() => {
    document.documentElement.setAttribute("data-theme", theme.value);
  });

  return {
    theme,
    platform,
    currentPlatformRoutes,
    platformRoutes,
  };
};
