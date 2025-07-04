<script setup lang="ts">
import { ref } from "vue";
import { useAppStore } from "@/shared/stores/application";
import { Header } from "@/widgets/app-header";
import { Footer } from "@/widgets/app-footer";
import { usePlatform } from "@/shared/lib/composables/use-platform";
import { Drawer, Button } from "@/shared/ui";

const appStore = useAppStore();
const { theme } = usePlatform();
</script>

<template>
  <Drawer
    v-model="appStore.showDrawer"
    sidebar-class="w-80"
    name="sidebar"
    class="bg-base-100 text-base-content relative"
  >
    <div style="z-index: var(--z-header)" class="sticky top-4 mx-4">
      <Header />
    </div>
    <div class="min-h-screen">
      <slot />
    </div>
    <Footer />
  </Drawer>
</template>

<style>
html[data-lock-scroll="true"] {
  overflow: hidden;
}

html[data-lock-scroll="true"] body {
  padding-right: var(--scrollbar-width);
}
</style>
