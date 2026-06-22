<script setup lang="ts">
import { useRoute } from "vue-router";
import { usePlatform } from "@/shared/lib/composables/use-platform";
import { RouterNav, Icon, Link } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

const route = useRoute();
const { currentPlatformRoutes } = usePlatform();
</script>

<template>
  <div
    class="inline-flex w-full lg:ml-10 items-center justify-start px-4 lg:px-0"
  >
    <RouterNav
      :bordered="false"
      :exact-active="false"
      class="flex-shrink flex gap-4 min-w-max w-full uppercase font-normal text-primary-content justify-center"
    >
      <template v-if="currentPlatformRoutes.primary.length">
        <template v-for="item in currentPlatformRoutes.primary" :key="item.id">
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
          v-if="
            currentPlatformRoutes.primary.length &&
            currentPlatformRoutes.secondary.length
          "
          :name="ICONS.verticalDivider"
          class="w-10 h-full text-secondary -mx-5"
        />
      </template>
      <template v-for="item in currentPlatformRoutes.secondary" :key="item.id">
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
</template>
