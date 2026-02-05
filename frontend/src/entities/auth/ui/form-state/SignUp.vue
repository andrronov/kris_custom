<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/shared/stores/application";
import { Input, Button, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

import { form } from "../../lib/state";
import { useAuth } from "../../lib/use-auth";

const emit = defineEmits<{
  (e: "mailSent"): void;
  (e: "switch"): void;
}>();

const { t } = useI18n();
const appStore = useAppStore();
const { submitAuth, submitting, formErrors } = useAuth(() => emit("mailSent"));

const useEmail = ref(false);
</script>

<template>
  <div class="w-full flex flex-col items-center gap-2">
    <h3 class="text-xl text-center font-bold">
      {{ t("auth.sign_up.title") }}
    </h3>
    <Input
      class="w-full"
      v-model="form.username"
      name="name"
      :error-message="formErrors.username"
    >
      {{ t("auth.sign_up.name") }}
    </Input>
    <section class="flex flex-col mt-2 w-full items-center gap-2">
      <h4 class="text-lg font-medium">
        {{ t("auth.sign_up.with") }}
      </h4>
      <template v-if="!useEmail">
        <Button
          full-width
          color="secondary"
          class="mt-2 md:mt-4 gap-1.5"
          @click="useEmail = true"
        >
          <Icon :name="ICONS.email" class="w-4 h-4" />
          {{ t("auth.email") }}
        </Button>
        <p class="mt-2 md:mt-4 text-base">
          {{ t("auth.sign_up.have_account") }}&nbsp;
          <Button @click="emit('switch')" variant="link" class="text-base">
            {{ t("common.buttons.sign_in") }}
          </Button>
        </p>
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
          {{ t("auth.sign_up.confirm") }}
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
