<script setup lang="ts">
import { LanguageDropdown } from "@/features/settings";
import { ICONS } from "@/shared/assets";
import { Icon, Button, Logo, Image } from "@/shared/ui";
import { useAppStore } from "@/shared/stores/application";

const appStore = useAppStore();
</script>

<template>
  <header
    style="box-shadow: 0 -1px 0 0 var(--primary) inset"
    class="flex h-16 items-center justify-between px-2 text-base-content"
  >
    <div class="container flex items-center h-full w-full">
      <div class="inline-flex w-fit items-center justify-start">
        <!-- <Link> -->
        <Logo class="flex-1" />
        <!-- </Link> -->
      </div>
      <!-- <RouterNav /> -->
      <div class="ml-auto inline-flex min-w-fit items-center justify-end">
        <div class="flex items-center gap-4">
          <Button
            color="primary"
            variant="outline"
            @click="appStore.toggleTheme()"
          >
            <Icon :name="ICONS.user" class="w-8 h-8" />
          </Button>
          <LanguageDropdown alignment="right" />
        </div>
      </div>
    </div>

    <!-- <div class="flex w-20 justify-between items-center">
      <Button class="ml-2 lg:hidden" color="ghost" shape="square">
        <Icon :name="ICONS.menu" class="h-8 w-8" />
      </Button>
    </div>

    <Logo class="mx-auto" />

    <div class="opacity-0 flex w-2 justify-between items-center">
      <Button class="ml-2 lg:hidden" color="ghost" shape="square">
        <Icon :name="ICONS.menu" class="h-8 w-8" />
      </Button>
    </div> -->
  </header>
</template>
