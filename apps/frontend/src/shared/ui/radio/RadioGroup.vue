<script setup lang="ts">
import type { ComponentSize, ComponentColor } from "@/shared/types";
import Radio from "./Radio.vue";

withDefaults(
  defineProps<{
    groupName: string;
    size?: ComponentSize;
    options: {
      value: string;
      label?: string;
      color?: ComponentColor;
      disabled?: boolean;
    }[];
  }>(),
  {
    size: "md",
  },
);

const modelValue = defineModel<string>({ required: true });
</script>

<template>
  <div>
    <Radio
      v-for="(option, index) in options"
      :key="index"
      :size="size"
      v-model="modelValue"
      :group-name="groupName"
      :value="option.value"
      :disabled="option.disabled"
      :color="option.color"
      class="md:px-4"
    >
      {{ option.label }}
    </Radio>
  </div>
</template>
