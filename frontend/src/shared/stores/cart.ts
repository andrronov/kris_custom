import { ref } from "vue";
import { useStorage, type RemovableRef, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const show = ref(false);

  const openCartbar = () => {
    show.value = true;
  };

  const closeCartbar = () => {
    show.value = false;
  };

  return {
    show,
    openCartbar,
    closeCartbar,
  };
});
