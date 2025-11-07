import { useColorMode, useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref, watchEffect, computed } from "vue";
import { i18n } from "@/shared/services/i18n";
import { useModal } from "@/shared/lib/composables/use-modal";
import type { Language, SidebarType, AuthModalState } from "@/shared/types";

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

  const sidebarType = ref<SidebarType>(null);

  const showDrawer = computed({
    get: () => sidebarType.value !== null,
    set: (value: boolean) => {
      sidebarType.value = value ? sidebarType.value : null;
    },
  });

  const openUserbar = () => (sidebarType.value = "user");
  const openCartbar = () => (sidebarType.value = "cart");
  const closeDrawer = () => (sidebarType.value = null);
  const toggleDrawer = (type: SidebarType) => {
    sidebarType.value = sidebarType.value === type ? null : type;
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

  const authModalState = ref<AuthModalState>("signup");
  const {
    visible: authModalVisible,
    close: closeAuthModal,
    open: openAuthModal,
  } = useModal(false, {
    onOpen: (state?: AuthModalState) => {
      authModalState.value = state || "signup";
    },
  });

  return {
    systemTheme,
    storedTheme,
    toggleTheme,
    showDrawer,
    sidebarType,
    openUserbar,
    openCartbar,
    closeDrawer,
    toggleDrawer,
    lang,
    changeLocale,
    authModalVisible,
    closeAuthModal,
    openAuthModal,
    authModalState,
  };
});
