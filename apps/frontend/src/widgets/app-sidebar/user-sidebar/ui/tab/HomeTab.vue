<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/shared/stores/user";
import { getDayTime } from "@/shared/lib/utils/modules/dates";
import { Button } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

import TabSection from "../blocks/TabSection.vue";

const emit = defineEmits<{
  clickLogin: [];
}>();

const { t } = useI18n();
const userStore = useUserStore();

const handleLogin = () => {
  emit("clickLogin");
};

const timeLabel = computed(() => t(`common.datetime.${getDayTime().label}`));
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <template v-if="!userStore.authorized">
      <h3 class="heading">
        {{ t("user-sidebar.sign_in") }}
      </h3>
      <Button @click="handleLogin" class="w-full" color="secondary" size="lg">
        {{ t("common.buttons.open_user_tab") }}
      </Button>
    </template>
    <template v-else>
      <h3 class="heading">
        {{ `${t("common.good")} ${timeLabel}, ${userStore.user?.name}!` }}
      </h3>
    </template>
  </div>
  <TabSection
    id="user-sidebar-section-favorites"
    :label="t('user-sidebar.favorites')"
    :icon="ICONS.likeHeart"
  />
  <TabSection
    id="user-sidebar-section-coupons"
    :label="t('user-sidebar.coupons')"
    :icon="ICONS.coupon"
  />
  <TabSection
    id="user-sidebar-section-recently-viewed"
    :label="t('user-sidebar.recently_viewed')"
    :icon="ICONS.recentlyViewed"
  />
</template>

<style>
.heading {
  @apply !leading-snug text-2xl md:text-4xl pt-4 font-medium text-center;
}
</style>
