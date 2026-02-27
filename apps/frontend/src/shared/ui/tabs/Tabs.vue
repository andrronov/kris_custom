<script setup lang="ts">
import { computed, provide } from "vue";
import type { ComponentSize, ComponentTabVariant } from "@/shared/types";
import { StateKey } from "./symbols";

const props = withDefaults(
  defineProps<{
    value?: string;
    variant?: ComponentTabVariant;
    size?: ComponentSize;
  }>(),
  {
    value: "",
    variant: "bordered",
    size: "md",
  },
);

const modelValue = defineModel<string | number>({
  required: false,
  default: "",
});

const emit = defineEmits<{
  update: [value: string | number];
}>();

const active = computed(() => modelValue.value || props.value);
const variant = computed(() => props.variant);
const size = computed(() => props.size);

const onUpdate = (tab: string | number) => {
  if (modelValue.value) {
    modelValue.value = tab;
  }

  emit("update", tab);
};

provide(StateKey, {
  active: () => active.value,
  variant: () => variant.value,
  size: () => size.value,
  selectTab: (tab: string | number) => onUpdate(tab),
});

const classes = computed(() => [
  "tabs",
  {
    "tabs-boxed": props.variant === "boxed",
  },
  { "flex gap-2 items-center": variant.value === "separated" },
  { "p-1 bg-base-100/75 font-medium": variant.value === "boxed" },
]);
</script>

<template>
  <div role="tabpanel" :class="classes">
    <slot></slot>
  </div>
</template>
