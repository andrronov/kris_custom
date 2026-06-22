<script setup lang="ts">
import { useBreakpoints } from "@/shared/lib/composables/use-breakpoints";

const { lgOrLarger } = useBreakpoints();

const show = defineModel<boolean>({ required: true });
</script>

<template>
  <div v-if="show && lgOrLarger" class="flex flex-col w-64 bg-base-300">
    block
  </div>
</template>
