<script setup lang="ts">
import { computed, useAttrs, ref } from "vue";
import { ICONS } from "@/shared/assets";
import { nothing } from "@/shared/lib/utils";
import type { ComponentColor, ComponentSize } from "@/shared/types";
import Icon from "../icon/Icon.vue";

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
</script>

<template>
  <label
    class="flex flex-col font-medium"
    :class="{
      'gap-y-1': $slots.default || $slots.optional,
    }"
  >
    <div class="flex items-end justify-between font-normal">
      <span data-testid="ui/input-label" class="text-base-content/90">
        <slot></slot>
      </span>
      <span class="text-sm text-base-content/50">
        <slot name="optional"></slot>
      </span>
    </div>
    <div class="relative flex items-center">
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
            },
          ],
        ]"
        v-bind="attrs"
        @input="!lazy ? handleInput($event) : nothing"
        @blur="lazy ? handleInput($event) : nothing"
        data-testid="ui/input"
        :dimmed="dimmed"
        :filled="filled"
        :type="type"
        :disabled="disabled"
        :maxlength="maxlength"
        :inputmode="type === 'number' ? 'decimal' : undefined"
      />
      <button
        data-testid="hide-password-button"
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
    <span
      v-if="errorMessage"
      class="text-xs font-medium text-error"
      data-testid="error-message"
    >
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
