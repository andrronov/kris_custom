<script setup lang="ts">
import { Collapsible } from "@/shared/ui";

defineProps<{
  title: string;
}>();
</script>

<template>
  <Collapsible :title variant="clean" size="sm" open-initially>
    <slot />
  </Collapsible>
</template>
