<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { ProductCard, ProductCardSkeleton } from "@/entities/product-card";
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

userStore.fetchFavoriteProducts();
const hasProducts = computed(
  () =>
    userStore.fetchingFavoriteProducts || userStore.favoriteProducts.length > 0,
);

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
    custom-class="h-[260px] md:h-[280px] lg:h-[380px]"
  >
    <div
      v-if="hasProducts"
      class="w-full flex items-center overflow-x-auto gap-4 pb-4 pl-px"
    >
      <template v-if="userStore.fetchingFavoriteProducts">
        <ProductCardSkeleton
          class="min-w-0 flex-shrink-0 flex-grow-0 basis-full"
          v-for="i in 5"
          :key="i"
          size="small"
        />
      </template>
      <template v-else-if="userStore.favoriteProducts.length > 0">
        <ProductCard
          v-for="product in userStore.favoriteProducts"
          :key="product.id"
          :product="product"
          size="small"
        />
      </template>
    </div>
  </TabSection>
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
