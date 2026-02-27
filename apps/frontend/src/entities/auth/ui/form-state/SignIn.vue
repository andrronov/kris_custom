<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/shared/stores/application";
import { ICONS } from "@/shared/assets";
import { Button, Input } from "@/shared/ui";

import { form } from "../../lib/state";
import { useAuth } from "../../lib/use-auth";
import GoogleButton from "../GoogleButton.vue";
import { nothing } from "@/shared/lib/utils";

const emit = defineEmits<{
  (e: "mailSent"): void;
}>();

const appStore = useAppStore();
const { submitAuth, submitting, formErrors } = useAuth(
  () => emit("mailSent"),
  () => nothing,
  () => appStore.closeAuthModal(),
);

const { t } = useI18n();

const useEmail = ref(false);
</script>

<template>
  <div class="w-full flex flex-col items-center gap-8">
    <h3 class="text-xl text-center font-bold">
      {{ t("auth.sign_in.with") }}
    </h3>
    <section class="flex flex-col w-full items-center gap-4">
      <template v-if="!useEmail">
        <GoogleButton
          :loading="submitting"
          @success="(response) => submitAuth(false, response.access_token)"
          @error="(error) => console.log(error)"
        >
          {{ t("auth.google_login") }}
        </GoogleButton>
        <Button
          full-width
          color="secondary"
          class="gap-1.5"
          @click="useEmail = true"
        >
          <Icon :name="ICONS.email" class="w-4 h-4" />
          {{ t("auth.email") }}
        </Button>
      </template>
      <template v-else>
        <Input
          class="w-full"
          v-model="form.email"
          type="email"
          name="email"
          placeholder="example@example.com"
          :error-message="formErrors.email"
        >
          {{ t("auth.sign_up.email") }}
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
        <Button
          full-width
          variant="outline"
          color="secondary"
          size="sm"
          @click="useEmail = false"
        >
          {{ t("common.cancel") }}
        </Button>
      </template>
    </section>
  </div>
</template>
