<script setup lang="ts">
import { onMounted } from "vue";
import { useAppStore } from "@/shared/stores/application";
import { AuthModal } from "@/features/auth";
import { Header } from "@/widgets/app-header";
import { Footer } from "@/widgets/app-footer";
import { UserSidebar } from "@/widgets/app-sidebar/user-sidebar";
import { CartSidebar } from "@/widgets/app-sidebar/cart-sidebar";
import { usePlatform } from "@/shared/lib/composables/use-platform";
import { useUserStore } from "@/shared/stores/user";
import { useCartStore } from "@/shared/stores/cart";
import { Drawer, Button } from "@/shared/ui";
import { whenever } from "@vueuse/core";

const appStore = useAppStore();
const userStore = useUserStore();
const cartStore = useCartStore();
const { theme } = usePlatform();

onMounted(() => {
  if (userStore.authorized) {
    userStore.sync();
  }
});
</script>

<template>
  <Drawer
    v-model="appStore.showDrawer"
    sidebar-class="w-80 md:w-[520px]"
    name="sidebar"
    class="bg-base-100 text-base-content relative"
  >
    <div class="sticky z-[var(--z-header)] top-4 mx-4">
      <Header />
    </div>
    <div class="min-h-screen">
      <slot />
    </div>
    <Footer />
    <template v-if="appStore.sidebarType" #content="{ close }">
      <component
        :is="appStore.sidebarType === 'user' ? UserSidebar : CartSidebar"
        @close="close"
      />
    </template>
  </Drawer>
  <AuthModal />
</template>

<style>
html[data-lock-scroll="true"] {
  overflow: hidden;
}

html[data-lock-scroll="true"] body {
  padding-right: var(--scrollbar-width);
}
</style>
