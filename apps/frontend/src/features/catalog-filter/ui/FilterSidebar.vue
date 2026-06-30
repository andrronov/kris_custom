<script setup lang="ts">
import { useBreakpoints } from "@/shared/lib/composables/use-breakpoints";
import { Drawer } from "@/shared/ui";
import FilterMenu from "./FilterMenu.vue";

const { lgAndSmaller } = useBreakpoints();

const show = defineModel<boolean>({ required: true });
</script>

<template>
  <Drawer
    v-if="lgAndSmaller"
    v-model="show"
    name="filter-sidebar"
    align="drawer-start"
  >
    <template #content>
      <FilterMenu />
    </template>
  </Drawer>
</template>
