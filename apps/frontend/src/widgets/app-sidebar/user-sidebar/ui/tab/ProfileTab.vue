<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ICONS } from "@/shared/assets";
import { Button, Icon } from "@/shared/ui";
import { useAppStore } from "@/shared/stores/application";
import { useUserStore } from "@/shared/stores/user";

const { t } = useI18n();
const appStore = useAppStore();
const userStore = useUserStore();

const openAuthModal = () => {
  appStore.openAuthModal();
  appStore.closeDrawer();
};
</script>

<template>
  <div class="flex flex-col h-full items-center justify-center gap-1">
    <Icon :name="ICONS.user" class="w-32 h-32 md:w-40 md:h-40" />
    <div class="w-full flex flex-col items-center gap-6">
      <template v-if="!userStore.authorized">
        <h3 class="text-2xl md:text-4xl font-normal text-center">
          {{ t("user-sidebar.guest") }}
        </h3>
        <div class="w-full flex flex-col gap-3">
          <Button
            @click="openAuthModal()"
            class="w-full"
            color="secondary"
            size="lg"
          >
            {{ t("common.buttons.log_in") }}
          </Button>
        </div>
      </template>
      <template v-else>
        <p>
          {{ userStore.user }}
        </p>
        <Button @click="userStore.logout">
          {{ t("common.buttons.log_out") }}
        </Button>
      </template>
    </div>
  </div>
</template>
