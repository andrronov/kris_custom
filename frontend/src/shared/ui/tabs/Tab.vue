<script setup lang="ts">
import { inject, computed } from "vue";
import { StateKey } from "./symbols";

const props = withDefaults(
  defineProps<{
    name: string | number;
    visible?: boolean;
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    visible: true,
    disabled: false,
    loading: false,
  },
);

const emit = defineEmits<{
  selected: [name: string | number];
}>();

const state = inject(StateKey);
if (!state) {
  throw new Error(`[Tabs/Tab] Could not resolve ${state}`);
}

const active = computed(() => state.active());
const variant = computed(() => state.variant());
const size = computed(() => state.size());

const isDisabled = computed(() => props.disabled || props.loading);
const isActive = computed(() => props.name === active.value);

const activateTab = (name: string | number) => {
  if (isDisabled.value) {
    return;
  }
  state.selectTab(name);
  emit("selected", name);
};

const classes = computed(() => [
  "tab grow",
  {
    "tab-active": isActive.value,
    [`tab-${size.value}`]: size.value,
    [`tab-${variant.value}`]:
      variant.value === "bordered" || variant.value === "lifted",
  },
  { rounded: variant.value === "separated" },

  ...(variant.value === "boxed" ? [isActive.value ? "shadow-sm" : ""] : []),
  ...(variant.value === "boxed"
    ? [isDisabled.value ? "opacity-70 pointer-events-none" : ""]
    : []),

  ...(variant.value === "separated"
    ? [isActive.value ? "bg-primary text-primary-content" : "bg-base-200/50"]
    : []),
]);
</script>

<template>
  <a v-if="visible" role="tab" :class="classes" @click="activateTab(name)">
    <slot :is-active="isActive"></slot>
  </a>
</template>

<style>
.tab-active-secondary {
  @apply bg-secondary font-bold !important;
}
.tab-lifted.tab-active:not(.tab-disabled):not([disabled]):before,
.tab-lifted.tab-active:not(.tab-disabled):not([disabled]):after {
  display: none !important;
}

.tab-lifted.tab-active:not(.tab-disabled) {
  @apply bg-base-200/50 !important;
}
.tab-lifted:not(.tab-disabled) {
  @apply bg-base-200/40 !important;
}
.tab-lifted.tab-active:not(.tab-disabled) {
  @apply bg-base-200 !important;
}

html[data-theme="light"]
  .tabs-boxed
  .tab-active:not(.tab-disabled):not([disabled]) {
  @apply rounded-md bg-base-200 text-base-content !important;
}

html[data-theme="dark"]
  .tabs-boxed
  .tab-active:not(.tab-disabled):not([disabled]) {
  @apply rounded-md bg-base-300 text-base-content !important;
}
</style>
