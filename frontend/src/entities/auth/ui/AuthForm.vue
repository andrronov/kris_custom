<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Button } from "@/shared/ui";
import type { AuthFormState } from "@/shared/types";

import SignIn from "./form-state/SignIn.vue";
import SignUp from "./form-state/SignUp.vue";

const { initialState } = defineProps<{
  initialState: AuthFormState;
}>();

const { t } = useI18n();

const formState = ref(initialState);
</script>

<template>
  <div class="flex flex-col items-center gap-2 w-full">
    <SignIn v-if="formState === 'signin'" />
    <SignUp v-if="formState === 'signup'" />
    <Button @click="formState = formState === 'signin' ? 'signup' : 'signin'">
      switch
    </Button>
  </div>
</template>
