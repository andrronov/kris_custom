<script setup lang="ts">
import { ref, useTemplateRef, watch } from "vue";
import { OTP_LEN } from "@/shared/config";

defineProps<{
  errorMessage?: string;
}>();

const initialState = Array(OTP_LEN).fill("");
const otp = ref([...initialState]);
const modelValue = defineModel({
  type: String,
  required: true,
});
const inputs = useTemplateRef<HTMLInputElement[]>("inputs");

const handleKeyDown = (e: KeyboardEvent) => {
  if (
    !/^[0-9]{1}$/.test(e.key) &&
    e.key !== "Backspace" &&
    e.key !== "Delete" &&
    e.key !== "Tab" &&
    !e.metaKey
  ) {
    e.preventDefault();
  }

  if (e.key === "Delete" || e.key === "Backspace") {
    const index = otp.value.indexOf("");
    if (index > 0 && inputs.value?.length) {
      otp.value.splice(index - 1, 1, "");
      inputs.value[index - 1].focus();
    }
  }
};

const handleInput = (index: number, value: string) => {
  otp.value.splice(index, 1, value);
  if (value && index < otp.value.length - 1 && inputs.value?.length) {
    inputs.value[index + 1].focus();
  }
};

const handleFocus = (target: HTMLInputElement) => {
  target.select();
};

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault();
  const text = e.clipboardData?.getData("text");
  if (!text) return;

  if (!new RegExp(`^[0-9]{${otp.value.length}}$`).test(text)) {
    return;
  }
  otp.value = text.split("");
};

watch(
  () => otp.value,
  (v) => {
    modelValue.value = v.join("");
  },
  { deep: true },
);
watch(
  () => modelValue.value,
  (v) => {
    if (v.length === 0) {
      otp.value = [...initialState];
    }
  },
);
</script>

<template>
  <form
    id="otp-form"
    class="relative flex gap-2 transition-all duration-300"
    :class="{ '-translate-y-2': errorMessage }"
  >
    <span
      v-if="errorMessage"
      class="absolute w-full text-center -bottom-6 md:-bottom-7 left-1/2 translate-x-[-50%] text-error"
    >
      {{ errorMessage }}
    </span>
    <input
      v-for="(digit, index) in otp"
      :key="index"
      type="text"
      maxlength="1"
      pattern="\d*"
      ref="inputs"
      class="flex w-full items-center justify-center rounded-lg border border-secondary/40 focus:border-secondary bg-base-100 transition-all duration-200 p-2 text-center text-2xl font-medium text-gray-5 outline-none sm:text-4xl"
      :value="digit"
      @input="handleInput(index, ($event.target as HTMLInputElement)?.value)"
      @keydown="handleKeyDown($event)"
      @focus="handleFocus($event.target as HTMLInputElement)"
      @paste="handlePaste($event)"
    />
  </form>
</template>
