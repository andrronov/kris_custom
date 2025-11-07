<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ICONS } from "@/shared/assets";
import { Button, Icon } from "@/shared/ui";
import { useAppStore } from "@/shared/stores/application";
import type { AuthModalState } from "@/shared/types";

const { t } = useI18n();
const appStore = useAppStore();

const openAuthModal = (state: AuthModalState = "signup") => {
  appStore.openAuthModal(state);
  appStore.closeDrawer();
};
</script>

<template>
  <div class="flex flex-col h-full items-center justify-center gap-1">
    <Icon :name="ICONS.user" class="w-32 h-32 md:w-40 md:h-40" />
    <div class="w-full flex flex-col items-center gap-6">
      <h3 class="text-2xl md:text-4xl font-normal text-center">
        {{ t("user-sidebar.guest") }}
      </h3>
      <div class="w-full flex flex-col gap-3">
        <Button
          @click="openAuthModal('signin')"
          class="w-full"
          color="secondary"
          variant="outline"
          size="lg"
        >
          {{ t("common.buttons.sign_in") }}
        </Button>
        <Button
          @click="openAuthModal('signup')"
          class="w-full"
          color="secondary"
          size="lg"
        >
          {{ t("common.buttons.sign_up") }}
        </Button>
      </div>
    </div>
  </div>
</template>
