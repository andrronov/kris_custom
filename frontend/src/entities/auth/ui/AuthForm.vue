<script setup lang="ts">
import { computed, ref } from "vue";
import { Icon } from "@/shared/ui";
import type { AuthFormState } from "@/shared/types";
import { ICONS } from "@/shared/assets";
import { useAuth } from "../lib/use-auth";

import SignIn from "./form-state/SignIn.vue";
import SignUp from "./form-state/SignUp.vue";
import Otp from "./form-state/Otp.vue";

const { initialState } = defineProps<{
  initialState: AuthFormState;
}>();

const { resetFormState } = useAuth();

const formState = ref(initialState);
const canGoBack = computed(() => formState.value === "otp");

const returnTo = (state: AuthFormState) => {
  formState.value = state;
  resetFormState();
};
</script>

<template>
  <div class="flex flex-col items-center gap-2 w-full sm:max-w-[400px] mx-auto">
    <div
      v-if="canGoBack"
      @click="returnTo(initialState)"
      class="flex w-fit gap-1 items-center absolute top-4 left-5 cursor-pointer"
    >
      <Icon :name="ICONS.arrowBack" class="w-auto h-5" />
    </div>
    <SignIn
      v-if="formState === 'signin'"
      @switch="formState = 'signup'"
      @mailSent="formState = 'otp'"
    />
    <SignUp
      v-if="formState === 'signup'"
      @mailSent="formState = 'otp'"
      @switch="formState = 'signin'"
    />
    <Otp v-if="formState === 'otp'" @back="returnTo('signup')" />
  </div>
</template>
