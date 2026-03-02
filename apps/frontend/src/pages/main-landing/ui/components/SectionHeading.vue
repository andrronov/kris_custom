<script setup lang="ts">
withDefaults(
  defineProps<{
    mobileOnly?: boolean;
  }>(),
  {
    mobileOnly: false,
  },
);
</script>

<template>
  <div class="section-heading flex flex-col items-start gap-2 mb-4">
    <h2 class="text-3xl md:text-4xl text-primary font-semibold">
      <slot />
    </h2>
    <p :class="{ 'md:hidden': mobileOnly }" class="text-secondary text-lg">
      <slot name="subtitle" />
    </p>
  </div>
</template>
