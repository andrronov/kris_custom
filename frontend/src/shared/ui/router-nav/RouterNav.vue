<script setup lang="ts">
withDefaults(
  defineProps<{
    exactActive?: boolean;
  }>(),
  {
    exactActive: true,
  },
);
</script>

<template>
  <nav
    class="flex flex-row flex-nowrap gap-2 overflow-y-hidden"
    style="-webkit-overflow-scrolling: touch"
  >
    <div
      v-bind="$attrs"
      class="flex h-14 w-full flex-row gap-x-4 [&>*]:relative [&>*]:flex [&>*]:h-full [&>*]:flex-shrink-0 [&>*]:items-center [&>*]:gap-1 [&>*]:px-2 [&>*]:no-underline [&>*]:before:absolute [&>*]:before:left-0 [&>*]:before:top-[95%] [&>*]:before:z-[0] [&>*]:before:hidden [&>*]:before:h-1 [&>*]:before:w-full [&>*]:before:rounded-t-full [&>*]:before:content-['']"
      :class="[
        exactActive
          ? '[&>.router-link-exact-active]:text-primary'
          : '[&>.router-link-active]:text-base-100',
      ]"
    >
      <slot></slot>
    </div>
  </nav>
</template>
