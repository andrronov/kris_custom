<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  name: string;
  filled?: boolean;
}>();

const classes = computed(() => [
  "icon",
  {
    "icon-filled": props.filled,
  },
]);
</script>

<template>
  <Icon :icon="name" v-bind="$attrs" :class="classes" />
</template>

<style scoped lang="scss">
.icon-filled {
  :deep(path) {
    @apply fill-inherit
  }
}
</style>
