<script setup lang="ts">
import { useBreakpoints } from "@/shared/lib/composables/use-breakpoints";

import FilterMenu from "./FilterMenu.vue";
import FilterClearButton from "./FilterClearButton.vue";

const { lgOrLarger } = useBreakpoints();
const show = defineModel<boolean>({ required: true });
</script>

<template>
  <Transition name="sidebar-fade">
    <div
      v-show="show && lgOrLarger"
      class="sticky top-[144px] flex flex-col w-64 shrink-0 bg-base-200 h-full max-h-[calc(100vh-234px)] overflow-y-auto rounded-xl"
    >
      <FilterClearButton class="top-0" />
      <FilterMenu />
    </div>
  </Transition>
</template>

<style scoped>
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition: all 0.55s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-fade-leave-active {
  position: absolute;
  z-index: -10;
}

.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}
</style>
