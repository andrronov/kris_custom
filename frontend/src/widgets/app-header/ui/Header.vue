<script setup lang="ts">
import { useRoute } from "vue-router";
import { LanguageDropdown, ThemeSwitcher } from "@/features/settings";
import { Logo, Link, RouterNav } from "@/shared/ui";
import { usePlatform } from "@/shared/lib/composables/use-platform";

const route = useRoute();

const { platformRoutes } = usePlatform();
</script>

<template>
  <header
    class="flex h-16 items-center bg-primary/75 backdrop-blur-sm rounded-full justify-between px-2 text-primary-content"
  >
    <div class="container flex items-center h-full w-full justify-between">
      <RouterNav
        :bordered="false"
        :exact-active="false"
        class="flex-shrink-1 hidden gap-4 w-full uppercase font-normal text-primary-content justify-start lg:flex"
      >
        <template v-for="item in platformRoutes" :key="item.id">
          <Link
            :id="item.id && `${item.id}_header`"
            :to="item.to"
            class="text-sm font-medium"
            :active-class="
              item.to?.hash === route.hash ? 'router-link-active' : ''
            "
          >
            {{ item.name }}
          </Link>
        </template>
      </RouterNav>
      <div class="inline-flex w-full ml-10 items-center justify-start">
        <Link to="/">
          <Logo class="flex-1" />
        </Link>
      </div>
      <div class="inline-flex min-w-fit items-center justify-end">
        <div class="flex items-center divide-x-2 divide-secondary">
          <ThemeSwitcher class="pl-1 pr-3" />
          <LanguageDropdown alignment="right" class="pl-3" />
        </div>
      </div>
    </div>
  </header>
</template>
