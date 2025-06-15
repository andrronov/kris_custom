<script setup lang="ts">
import { useRoute } from "vue-router";
import { ICONS } from "@/shared/assets";
import { usePlatform } from "@/shared/lib/composables/use-platform";
import { useAppStore } from "@/shared/stores/application";
import { Icon } from "@/shared/ui";

const route = useRoute();

const appStore = useAppStore();

const { theme } = usePlatform();
</script>

<template>
  <button
    data-testid="theme-switcher"
    v-if="!route.meta.theme"
    class="hover:cursor-pointer hover:brightness-125"
    @click="appStore.toggleTheme()"
  >
    <Icon
      class="w-8 h-8 text-primary"
      :name="theme === 'light' ? ICONS.sun : ICONS.moon"
    />
  </button>
</template>
