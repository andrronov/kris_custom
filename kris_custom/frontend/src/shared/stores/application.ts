import { useColorMode } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

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

  return {
    systemTheme,
    storedTheme,
    toggleTheme,
    showDrawer,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
});
