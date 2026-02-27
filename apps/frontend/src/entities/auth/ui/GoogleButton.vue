<script setup lang="ts">
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";
import { Button, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

defineProps<{
  loading?: boolean;
}>();

const emit = defineEmits<{
  success: [res: AuthCodeFlowSuccessResponse];
  error: [error: AuthCodeFlowErrorResponse];
}>();

const handleOnSuccess = (response: AuthCodeFlowSuccessResponse) => {
  emit("success", response);
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  emit("error", errorResponse);
};

const { isReady, login } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
});
</script>

<template>
  <Button
    full-width
    color="accent"
    :disabled="!isReady"
    :loading="loading"
    @click="() => login()"
  >
    <Icon :name="ICONS.google" />
    <slot />
  </Button>
</template>
