<script setup lang="ts">
const { mobileOnly = false } = defineProps<{
  mobileOnly?: boolean;
}>();
</script>

<template>
  <div class="section-heading flex flex-col items-start gap-2 mb-4 container">
    <h2 class="text-3xl md:text-4xl text-primary font-semibold">
      <slot />
    </h2>
    <p :class="{ 'md:hidden': mobileOnly }" class="text-secondary text-lg">
      <slot name="subtitle" />
    </p>
  </div>
</template>
