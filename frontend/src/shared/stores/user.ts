import { ref } from "vue";
import { useStorage, type RemovableRef, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  // const user = useLocalStorage
  const show = ref(false);

  const openUserbar = () => {
    show.value = true;
  };

  const closeUserbar = () => {
    show.value = false;
  };

  return {
    show,
    openUserbar,
    closeUserbar,
  };
});
