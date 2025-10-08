<script setup lang="ts">
import { whenever } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { LanguageDropdown, ThemeSwitcher } from "@/features/settings";
import { UserSidebar } from "@/widgets/app-sidebar/user-sidebar";
import { Button, Icon } from "@/shared/ui";
import { nothing } from "@/shared/lib/utils";
import { ICONS } from "@/shared/assets";
import { useUserStore } from "@/shared/stores/user";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const userStore = useUserStore();
const { t } = useI18n();

const close = (cb = nothing) => {
  emit("close");
  cb();
};
</script>

<template>
  <div class="flex flex-col gap-4 h-full overflow-hidden">
    <div class="w-full flex items-center justify-between">
      <div class="flex items-center divide-x-2 divide-secondary">
        <ThemeSwitcher class="pl-1 pr-3" />
        <LanguageDropdown alignment="left" class="px-3" />
      </div>
      <Button @click="close()" size="sm" color="ghost" shape="circle">
        <Icon :name="ICONS.close" class="w-6 h-6" />
      </Button>
    </div>
    <h3
      class="text-2xl md:text-4xl pt-4 font-medium text-center text-secondary"
    >
      {{ t("user-sidebar.sign_in") }}
    </h3>
    <div class="flex flex-col w-full items-center justify-between gap-2">
      <Button class="w-full" color="secondary" variant="outline">
        {{ t("common.buttons.sign_in") }}
      </Button>
      <Button class="w-full" color="secondary">
        {{ t("common.buttons.sign_up") }}
      </Button>
    </div>
  </div>
</template>
