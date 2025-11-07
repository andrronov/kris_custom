<script setup lang="ts">
import { ref, computed, type Component } from "vue";
import { whenever } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { LanguageDropdown, ThemeSwitcher } from "@/features/settings";
import { UserSidebar } from "@/widgets/app-sidebar/user-sidebar";
import { Button, Icon, Tabs, Tab } from "@/shared/ui";
import { nothing } from "@/shared/lib/utils";
import { ICONS } from "@/shared/assets";
import { useUserStore } from "@/shared/stores/user";

import UserTabs from "./UserTabs.vue";
import HomeTab from "./tab/HomeTab.vue";
import ProfileTab from "./tab/ProfileTab.vue";
import OrdersTab from "./tab/OrdersTab.vue";
import type { UserTab } from "../types";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { t } = useI18n();

const activeTab = ref<UserTab>("home");
const tabComponent = computed(
  () =>
    ({
      home: HomeTab,
      profile: ProfileTab,
      orders: OrdersTab,
    })[activeTab.value],
);

const close = (cb = nothing) => {
  emit("close");
  cb();
};
</script>

<template>
  <div class="flex flex-col gap-4 md:gap-8 h-full overflow-hidden">
    <div class="w-full flex items-center justify-between">
      <div class="flex items-center divide-x-2 divide-secondary">
        <ThemeSwitcher class="pl-1 pr-3" />
        <LanguageDropdown alignment="left" class="px-3" />
      </div>
      <Button @click="close()" size="sm" color="ghost" shape="circle">
        <Icon :name="ICONS.close" class="w-6 h-6" />
      </Button>
    </div>
    <div
      class="relative w-full h-full flex flex-col items-center p-2 pb-12 md:pb-16 rounded-lg border border-secondary bg-base-100 overflow-y-auto"
    >
      <div
        class="flex flex-col w-full h-full gap-10 overflow-y-auto overflow-x-hidden"
      >
        <component
          :is="tabComponent"
          @click-login="() => (activeTab = 'profile')"
        />
      </div>
      <div class="w-full absolute bottom-0 left-0">
        <UserTabs v-model="activeTab" />
      </div>
    </div>
  </div>
</template>
