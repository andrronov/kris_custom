import { useColorMode, useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";
import { i18n } from "@/shared/services/i18n";
import type { Language } from "@/shared/types";

export const useAppStore = defineStore("app", () => {
  const { system: systemTheme, store: storedTheme } = useColorMode({
    selector: "#app",
    attribute: "data-color-mode",
    modes: {
      light: "light",
      dark: "dark",
    },
    initialValue: "dark",
    storageKey: "kc-theme",
  });

  const toggleTheme = () => {
    storedTheme.value = storedTheme.value === "light" ? "dark" : "light";
  };

  const showDrawer = ref(false);
  const openDrawer = () => {
    showDrawer.value = true;
  };
  const closeDrawer = () => {
    showDrawer.value = false;
  };
  const toggleDrawer = () => {
    if (showDrawer.value) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  const lang = useStorage<Language>("kc-lang", i18n.locale.value);

  const changeLocale = (value: Language) => {
    lang.value = value;
  };

  watchEffect(() => {
    const value = lang.value;

    i18n.locale.value = value;

    if (!import.meta.env.SSR) {
      document.documentElement.lang = value;
    }
  });

  return {
    systemTheme,
    storedTheme,
    toggleTheme,
    showDrawer,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    lang,
    changeLocale,
  };
});
