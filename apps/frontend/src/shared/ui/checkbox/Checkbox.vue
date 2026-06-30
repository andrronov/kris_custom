<script setup lang="ts">
import { computed, useAttrs } from "vue";
import type { ComponentSize, ComponentBrandColors } from "@/shared/types";

const props = withDefaults(
  defineProps<{
    color?: ComponentBrandColors;
    customColor?: string;
    size?: ComponentSize;
    disabled?: boolean;
  }>(),
  {
    color: undefined,
    customColor: undefined,
    size: "sm",
  },
);

const modelValue = defineModel<boolean>({ required: true });

const attrs = useAttrs();

const classes = computed(() => [
  "checkbox my-1 self-baseline rounded border-[1.5px]",
  {
    [`checkbox-${props.size}`]: props.size,
    [`checkbox-${props.color}`]: props.color,
  },
  {
    "disabled:bg-transparent disabled:border-base-300 disabled:opacity-50":
      props.disabled && !modelValue.value,
  },
]);

function extractHSLValues(hslString: string) {
  const cleanString = hslString.replace(/[^\d,%]/g, "");

  const values = cleanString.split(",");

  return values.join(", ");
}
</script>

<style scoped>
.checkbox:checked {
  border: none !important;
}
</style>

<template>
  <label
    data-testid="checkbox"
    class="inline-flex items-center space-x-3 text-sm"
    :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
  >
    <input
      v-model="modelValue"
      type="checkbox"
      :class="classes"
      :style="customColor && { '--bc': extractHSLValues(customColor) }"
      :disabled="disabled"
      v-bind="attrs"
    />
    <span v-if="$slots.default" :class="{ 'text-base-content/20': disabled }">
      <slot></slot>
    </span>
  </label>
</template>
