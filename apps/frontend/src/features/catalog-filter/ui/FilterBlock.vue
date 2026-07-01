<script setup lang="ts">
import { useBreakpoints } from "@/shared/lib/composables/use-breakpoints";
import FilterMenu from "./FilterMenu.vue";

const { lgOrLarger } = useBreakpoints();

const show = defineModel<boolean>({ required: true });
</script>

<template>
  <div
    v-show="show && lgOrLarger"
    class="sticky top-[144px] flex flex-col w-64 bg-base-200 h-full max-h-[calc(100vh-234px)] overflow-y-auto rounded-xl"
  >
    <FilterMenu />
  </div>
</template>
