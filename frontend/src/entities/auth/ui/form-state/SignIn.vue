<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Button, Input } from "@/shared/ui";

import { form } from "../../lib/state";
import { useAuth } from "../../lib/use-auth";

const emit = defineEmits<{
  (e: "switch"): void;
  (e: "mailSent"): void;
}>();

const { submitAuth, submitting, formErrors } = useAuth(() => emit("mailSent"));

const { t } = useI18n();
</script>

<template>
  <div class="w-full flex flex-col items-center gap-2">
    <h3 class="text-xl text-center font-bold">
      {{ t("auth.sign_in.title") }}
    </h3>
    <Input
      v-model="form.email"
      class="w-full"
      placeholder="example@example.com"
      name="email"
      type="email"
      :error-message="formErrors.email"
    >
      {{ t("auth.email") }}
    </Input>
    <Button
      @click="submitAuth()"
      :loading="submitting"
      full-width
      color="secondary"
      class="mt-2"
    >
      {{ t("auth.sign_in.confirm") }}
    </Button>
    <p class="mt-2 md:mt-4 text-base">
      {{ t("auth.sign_up.have_account") }}&nbsp;
      <Button
        @click="emit('switch')"
        :disabled="submitting"
        variant="link"
        class="text-base"
      >
        {{ t("common.buttons.sign_up") }}
      </Button>
    </p>
  </div>
</template>
