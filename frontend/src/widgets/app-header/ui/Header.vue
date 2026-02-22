<script setup lang="ts">
import { Search } from "@/features/search";
import { useBreakpoints } from "@/shared/lib/composables/use-breakpoints";
import { useAppStore } from "@/shared/stores/application";
import { Logo, Icon, Link, Button } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

import HeaderNav from "./HeaderNav.vue";

const appStore = useAppStore();
const { lgAndSmaller } = useBreakpoints();

const openCart = () => {
  appStore.openCartbar();
};
const openUserbar = () => {
  appStore.openUserbar();
};
</script>

<template>
  <header class="flex flex-col h-16 items-center header justify-between px-2">
    <div class="container flex items-center h-full w-full justify-between">
      <Link to="/">
        <Logo class="flex-1" />
      </Link>
      <HeaderNav v-if="!lgAndSmaller" />
      <div class="inline-flex min-w-fit gap-3 ml-6 items-center justify-end">
        <Search />
        <Button
          variant="link"
          @click="openUserbar()"
          class="text-primary-content"
        >
          <Icon :name="ICONS.user" class="w-8 h-8" />
        </Button>
        <Button variant="link" @click="openCart()" class="text-primary-content">
          <Icon :name="ICONS.cart" class="w-8 h-8" />
        </Button>
      </div>
    </div>
  </header>
</template>
