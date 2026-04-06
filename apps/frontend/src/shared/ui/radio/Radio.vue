<script setup lang="ts">
import { computed, useSlots } from "vue";
import type { ComponentSize, ComponentColor } from "@/shared/types";

const props = withDefaults(
  defineProps<{
    value: string;
    groupName?: string;
    color?: ComponentColor;
    size?: ComponentSize;
    disabled?: boolean;
  }>(),
  {
    color: undefined,
    groupName: undefined,
    disabled: false,
    size: "md",
  },
);

const slots = useSlots();

const classes = computed(() => [
  "radio",
  {
    [`radio-${props.size}`]: props.size,
    [`radio-${props.color}`]: props.color,
  },
]);

const model = defineModel<string>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  model.value = target.value;
};

const checked = computed(() => model.value === props.value);
</script>

<template>
  <label
    class="inline-flex"
    :class="[
      { 'items-center gap-x-2': slots.default },
      [disabled ? 'cursor-not-allowed' : 'cursor-pointer'],
    ]"
  >
    <input
      type="radio"
      :class="classes"
      :disabled="disabled"
      :name="groupName"
      :value="value"
      :checked="checked"
      @input="handleInput"
      class="hidden"
    />
    <span
      :class="[
        { 'text-base-content/60': disabled },
        checked ? 'border-primary bg-base-200 text-primary' : 'border-base',
      ]"
      class="w-full p-2 border rounded-xl transition-all duration-300 text-center"
    >
      <slot></slot>
    </span>
  </label>
</template>
