<script setup lang="ts">
import { computed, useAttrs, ref, useSlots } from "vue";
import { ICONS } from "@/shared/assets";
import { nothing } from "@/shared/lib/utils";
import type { ComponentColor, ComponentSize } from "@/shared/types";
import Icon from "../icon/Icon.vue";
import Button from "../button/Button.vue";

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    bordered?: boolean;
    borderOffset?: boolean;
    size?: ComponentSize;
    color?: ComponentColor;
    ghost?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    showCount?: boolean;
    maxlength?: number;
    noNumericSpinners?: boolean;
    hideEye?: boolean;
    dimmed?: boolean;
    filled?: boolean;
    lazy?: boolean;
    controls?: boolean;
    max?: number;
    min?: number;
  }>(),
  {
    placeholder: undefined,
    errorMessage: undefined,
    color: undefined,
    maxlength: undefined,
    disabled: false,
    bordered: true,
    showCount: false,
    size: "md",
    ghost: false,
    noNumericSpinners: true,
    hideEye: false,
    dimmed: false,
    filled: false,
    lazy: false,
    controls: false,
    max: undefined,
    min: undefined,
  },
);

const modelValue = defineModel<string | number | undefined>({
  default: undefined,
});

const attrs = useAttrs();

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const isPassword = computed(() => attrs.type === "password");

const classes = computed(() => [
  "input w-full ym-disable-keys",
  {
    [`input-${props.size}`]: props.size,
    [`input-${props.color}`]: props.color,
    [`focus:outline-offset-0`]: !props.borderOffset,
    "input-bordered": props.bordered && !props.dimmed,
    "input-disabled text-base-content/20": props.disabled,
    "input-no-numeric": props.noNumericSpinners,
    "!bg-transparent": props.ghost,
  },
]);

const type = computed<"text" | "password" | string>(() => {
  if (typeof attrs.type !== "string") {
    return "text";
  }

  if (isPassword.value) {
    return showPassword.value ? "text" : "password";
  }

  return attrs.type;
});

const handleInput = (e: InputEvent | Event) => {
  const targetValue = (e.target as HTMLInputElement).value;
  if (props.maxlength && targetValue.length > props.maxlength) {
    return;
  }

  modelValue.value =
    attrs.type === "number" ? Number(targetValue) : targetValue;
};

const handleBlur = () => {
  if (props.max && props.min && attrs.type === "number") {
    modelValue.value = Math.max(
      props.min,
      Math.min(props.max, Number(modelValue.value)),
    );
  }
};

const showControls = computed(() => props.controls && type.value === "number");
const decrementDisabled = computed(() =>
  props.min ? Number(modelValue.value) <= props.min : false,
);
const incrementDisabled = computed(() =>
  props.max ? Number(modelValue.value) >= props.max : false,
);

const incrementValue = () => {
  if (!showControls) return;
  modelValue.value = Number(modelValue.value) + 1;
};
const decrementValue = () => {
  if (!showControls) return;
  modelValue.value = Number(modelValue.value) - 1;
};
</script>

<template>
  <label
    class="flex flex-col font-medium"
    :class="{
      'gap-y-1': $slots.default || $slots.optional,
    }"
  >
    <div class="flex items-end justify-between font-normal">
      <span class="text-base-content/90">
        <slot></slot>
      </span>
      <span class="text-sm text-base-content/50">
        <slot name="optional"></slot>
      </span>
    </div>
    <div class="relative flex items-center">
      <Button
        v-if="showControls"
        :disabled="decrementDisabled"
        @click="decrementValue"
        class="absolute left-0 top-0 hover:bg-inherit"
        color="ghost"
        data-slot="decrement"
        :size
      >
        <Icon :name="ICONS.minus" />
      </Button>
      <Button
        v-if="showControls"
        :disabled="incrementDisabled"
        @click="incrementValue"
        class="absolute right-0 top-0 hover:bg-inherit"
        color="ghost"
        data-slot="increment"
        :size
      >
        <Icon :name="ICONS.plus" />
      </Button>
      <span
        class="absolute inset-y-0 left-0 flex items-center pl-2"
        :class="[
          props.disabled ? 'text-base-content/20' : 'text-base-content/50',
        ]"
      >
        <slot name="prefix">
          <Icon
            v-if="type === 'search'"
            :name="ICONS.searchLoop"
            class="text-base-content/50"
          />
        </slot>
      </span>
      <input
        :value="modelValue"
        :placeholder="placeholder"
        :class="[
          classes,
          [
            {
              'pl-10': $slots.prefix || type === 'search',
              'px-[50px]': showControls,
            },
          ],
        ]"
        v-bind="attrs"
        @input="!lazy ? handleInput($event) : nothing"
        @blur="handleBlur"
        :dimmed="dimmed"
        :filled="filled"
        :type="type"
        :disabled="disabled"
        :maxlength="maxlength"
        :inputmode="type === 'number' ? 'decimal' : undefined"
      />
      <button
        v-if="!hideEye && isPassword"
        @click="togglePasswordVisibility()"
        class="-ml-8 cursor-pointer"
        type="button"
        tabindex="-1"
      >
        <Icon
          class="h-5 w-5 opacity-60"
          :name="showPassword ? ICONS.eyeOpen : ICONS.eyeClosed"
        />
      </button>
    </div>
    <span
      v-if="showCount && typeof modelValue === 'string'"
      class="ml-auto text-xs"
    >
      {{ `${modelValue.length} / ${maxlength}` }}
    </span>
    <span v-if="errorMessage" class="text-xs font-medium text-error">
      {{ errorMessage }}
    </span>
  </label>
</template>

<style scoped>
.input-md {
  @apply !h-9;
}
</style>

<style>
:root {
  --input-bg: var(--base-100);
}

html[data-theme="light"] .input[dimmed="false"][filled="false"],
html[data-theme="light"] .input[dimmed="false"][filled="true"],
html[data-theme="dark"] .input[dimmed="false"][filled="true"] {
  --input-bg: var(--base-200);
}

.input,
.input-disabled {
  background-color: var(--input-bg) !important;
}

.input-disabled {
  border-color: var(--base-300) !important;
}

html[data-theme="dark"] .input-bordered:not([disabled]) {
  @apply border-opacity-10 !important;
}

.input-no-numeric::-webkit-outer-spin-button,
.input-no-numeric::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.input-no-numeric[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
