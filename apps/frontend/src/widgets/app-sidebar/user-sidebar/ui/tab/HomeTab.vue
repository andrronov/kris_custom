<script setup lang="ts">
import { Button, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";
import { useI18n } from "vue-i18n";

import TabSection from "../blocks/TabSection.vue";

const emit = defineEmits<{
  clickLogin: [];
}>();

const { t } = useI18n();

const handleLogin = () => {
  emit("clickLogin");
};
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h3 class="!leading-snug text-2xl md:text-4xl pt-4 font-normal text-center">
      {{ t("user-sidebar.sign_in") }}
    </h3>
    <Button @click="handleLogin" class="w-full" color="secondary" size="lg">
      {{ t("common.buttons.open_user_tab") }}
    </Button>
  </div>
  <TabSection
    id="user-sidebar-section-recently-viewed"
    :label="t('user-sidebar.recently_viewed')"
    :icon="ICONS.recentlyViewed"
  />
  <TabSection
    id="user-sidebar-section-favorites"
    :label="t('user-sidebar.favorites')"
    :icon="ICONS.likeHeart"
  />
</template>
