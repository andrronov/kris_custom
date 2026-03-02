<script setup lang="ts">
import { computed, useSlots, useAttrs } from "vue";
import type {
  ComponentColor,
  ComponentShape,
  ComponentSize,
} from "@/shared/types";

const props = withDefaults(
  defineProps<{
    href?: string;
    shape?: ComponentShape;
    size?: ComponentSize;
    variant?: "outline" | "link" | "dropdown-item";
    color?: ComponentColor;
    fullWidth?: boolean;
    animation?: boolean;
    loading?: boolean;
    active?: boolean;
    disabled?: boolean;
  }>(),
  {
    href: undefined,
    shape: undefined,
    variant: undefined,
    color: undefined,
    size: "md",
    animation: true,
    disabled: false,
    active: false,
    loading: false,
    responsive: false,
    fullWidth: false,
  },
);

const attrs = useAttrs();

const slots = useSlots();

const disabled = computed(() => {
  return props.disabled || props.loading;
});

const classes = computed(() => [
  "btn normal-case no-underline underline-offset-4 animate-none",
  ((slots.start && !props.loading) || slots.end) && "gap-2",
  [props.shape ? [`btn-${props.shape}`] : "rounded-default"],
  {
    "btn-block": props.fullWidth,
    "no-animation": !props.animation,
    "btn-active": props.active,
    "btn-disabled": disabled.value,
    [`btn-${props.size}`]: props.size,
    [`btn-${props.variant}`]: props.variant,
    [`btn-${props.color}`]: props.color,
  },
  { "border-2": props.variant === "outline" },
  {
    "justify-start font-normal text-left !h-auto py-2.5 leading-5":
      props.variant === "dropdown-item",
  },
]);
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    role="button"
    v-bind="attrs"
    :class="classes"
    class="hover:text-white!important"
    :disabled="href ? undefined : disabled"
  >
    <span v-if="loading" class="loading loading-spinner loading-sm"></span>

    <slot name="start" />
    <slot></slot>
    <slot name="end" />
  </component>
</template>

<style scoped>
.btn-md {
  @apply min-h-8 h-9;
}
.btn-md.btn-square {
  @apply w-9;
}
.btn-lg {
  @apply min-h-12 h-14 rounded-xl;
}
.btn-link {
  @apply px-0 text-base-content;
}
</style>
