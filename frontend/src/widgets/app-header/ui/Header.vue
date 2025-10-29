<script setup lang="ts">
import { useRoute } from "vue-router";
import { Search } from "@/features/search";
import { Logo, Icon, Link, RouterNav, Button } from "@/shared/ui";
import { usePlatform } from "@/shared/lib/composables/use-platform";
import { useUserStore } from "@/shared/stores/user";
import { useCartStore } from "@/shared/stores/cart";
import { useAppStore } from "@/shared/stores/application";
import { ICONS } from "@/shared/assets";

const route = useRoute();

const appStore = useAppStore();
const { currentPlatformRoutes } = usePlatform();
const userStore = useUserStore();
const cartStore = useCartStore();

const openCart = () => {
  appStore.openCartbar();
};
const openUserbar = () => {
  appStore.openUserbar();
};
</script>

<template>
  <header
    class="flex h-16 items-center bg-primary/75 backdrop-blur-sm rounded-full justify-between px-2 text-primary-content"
  >
    <div class="container flex items-center h-full w-full justify-between">
      <Link to="/">
        <Logo class="flex-1" />
      </Link>
      <div class="inline-flex w-full ml-10 items-center justify-start">
        <RouterNav
          :bordered="false"
          :exact-active="false"
          class="flex-shrink hidden gap-4 w-full uppercase font-normal text-primary-content justify-center lg:flex"
        >
          <template v-if="currentPlatformRoutes.primary.length">
            <template
              v-for="item in currentPlatformRoutes.primary"
              :key="item.id"
            >
              <Link
                :id="item.id && `${item.id}_header`"
                :to="item.to"
                class="text-sm font-medium"
                :active-class="
                  typeof item.to === 'object' && item.to?.hash === route.hash
                    ? 'router-link-active'
                    : ''
                "
              >
                {{ item.name }}
              </Link>
            </template>
            <Icon
              :name="ICONS.verticalDivider"
              class="w-10 h-full text-secondary -mx-5"
            />
          </template>
          <template
            v-for="item in currentPlatformRoutes.secondary"
            :key="item.id"
          >
            <Link
              :id="item.id && `${item.id}_header`"
              :to="item.to"
              class="text-sm font-medium"
              :active-class="
                typeof item.to === 'object' && item.to?.hash === route.hash
                  ? 'router-link-active'
                  : ''
              "
            >
              {{ item.name }}
            </Link>
          </template>
        </RouterNav>
      </div>
      <div class="inline-flex min-w-fit gap-3 ml-6 items-center justify-end">
        <Search />
        <!-- <Button
          variant="link"
          @click="appStore.toggleDrawer"
          class="text-primary-content"
        >
          <Icon :name="ICONS.heartOutline" class="w-8 h-8" />
        </Button> -->
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
