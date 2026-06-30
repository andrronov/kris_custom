<script setup lang="ts">
import { computed } from "vue";
import { useToggle } from "@vueuse/core";

import { ICONS } from "@/shared/assets";
import { Icon } from "@/shared/ui";

type Variant = "outline" | "clean";
type Size = "sm" | "md";

const {
  variant = "outline",
  size = "md",
  openInitially = false,
} = defineProps<{
  title: string;
  variant?: Variant;
  size?: Size;
  openInitially?: boolean;
}>();

const [showPanel, togglePanel] = useToggle(openInitially);

const VARIANT = {
  outline: {
    button:
      "bg-base-300 border-2 border-transparent p-4 hover:bg-base-200 hover:border-secondary",
    padding: "1.5rem",
    wrapper: "rounded-full bg-base-100",
  },
  clean: {
    button: "p-2 hover:bg-base-300",
    padding: "1rem 0",
    wrapper: "bg-base-200",
  },
} satisfies Record<
  Variant,
  {
    button: string;
    padding: string;
    wrapper: string;
  }
>;

const SIZE = {
  sm: {
    title: "text-base lg:text-lg",
    icon: "size-5",
    content: "text-base leading-6",
  },

  md: {
    title: "text-lg lg:text-2xl",
    icon: "size-8",
    content: "text-lg leading-8",
  },
} satisfies Record<
  Size,
  {
    title: string;
    icon: string;
    content: string;
  }
>;

const variantClass = computed(() => VARIANT[variant]);
const sizeClass = computed(() => SIZE[size]);
</script>

<template>
  <div class="rounded-full text-base-content" :class="variantClass.wrapper">
    <button
      class="flex w-full items-center justify-between gap-2 text-left font-medium shadow-sm transition-all duration-150"
      :class="[sizeClass.title, variantClass.button]"
      @click.prevent="togglePanel()"
    >
      <span class="break-words" :class="sizeClass.title">
        {{ title }}
      </span>

      <span class="shrink-0 p-1">
        <Icon
          :name="showPanel ? ICONS.up : ICONS.down"
          :class="sizeClass.icon"
        />
      </span>
    </button>

    <div class="content-wrapper" :class="{ 'is-open': showPanel }">
      <div
        :aria-hidden="!showPanel"
        class="content whitespace-pre-line"
        :class="sizeClass.content"
        :style="{ '--content-padding': variantClass.padding }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 250ms ease;

  &.is-open {
    grid-template-rows: 1fr;
  }
}

.content {
  overflow: hidden;
  padding: 0;
  transition: padding 250ms ease;

  .is-open & {
    padding: var(--content-padding);
  }
}
</style>
