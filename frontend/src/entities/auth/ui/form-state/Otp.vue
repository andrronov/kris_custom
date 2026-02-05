<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useCountdown } from "@vueuse/core";
import { useAppStore } from "@/shared/stores/application";
import { Button, OtpInput } from "@/shared/ui";
import { OTP_RESEND_COUNTDOWN } from "@/shared/config";
import { nothing } from "@/shared/lib/utils";

import { form, INITIAL_FORM_STATE } from "../../lib/state";
import { useAuth } from "../../lib/use-auth";

const { t } = useI18n();
const appStore = useAppStore();
const {
  submitAuth,
  submitting,
  verifyEmail,
  verifyingEmail,
  formErrors,
  resetFormErrors,
} = useAuth(
  () => nothing,
  () => nothing,
  () => appStore.closeAuthModal(),
);

const otpSent = ref(false);

const sendOtpAgain = async () => {
  await submitAuth(true);
  otpSent.value = true;
  resetFormErrors();
  form.otp = INITIAL_FORM_STATE.otp;
};

const { remaining, start } = useCountdown(OTP_RESEND_COUNTDOWN);
const canResend = computed(() => remaining.value === 0);

start();

const { remaining: messageRemaining, start: messageStart } = useCountdown(5);
watch(otpSent, (is) => {
  if (is) messageStart();
});
</script>

<template>
  <div class="w-full flex flex-col items-center gap-2">
    <h3 class="text-xl text-center font-bold">
      {{ t("auth.otp.title") }}
    </h3>
    <p class="text-lg font-medium">
      {{ t("auth.otp.description") }}
    </p>
    <OtpInput
      v-model="form.otp"
      :error-message="formErrors.otp"
      class="w-full my-3 md:my-6"
    />
    <Button
      @click="verifyEmail()"
      :loading="verifyingEmail"
      :disabled="submitting"
      color="secondary"
      class="max-w-44"
      full-width
    >
      {{ t("common.buttons.confirm") }}
    </Button>
    <div v-if="!otpSent" class="mt-2">
      <p v-if="!canResend" class="font-medium text-center">
        {{ t("auth.otp.resend", { seconds: remaining }) }}
      </p>
      <Button
        v-else
        @click="sendOtpAgain()"
        :loading="submitting"
        :disabled="verifyingEmail"
        color="secondary"
        variant="link"
        class="max-w-44"
        full-width
      >
        {{ t("common.buttons.resend_code") }}
      </Button>
    </div>
    <div v-else-if="messageRemaining > 0" class="mt-2">
      <p class="font-medium text-success text-center">
        {{ t("auth.otp.sent_success") }}
      </p>
    </div>
  </div>
</template>
