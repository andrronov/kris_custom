<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="flex flex-col items-center justify-center gap-2 relative">
      <span class="text-lg font-medium">
        {{ title }}
      </span>
      <slot name="additional" />
    </div>
    <slot />
  </div>
</template>
