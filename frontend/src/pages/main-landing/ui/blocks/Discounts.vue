<script setup lang="ts">
import { Image, Button } from "@/shared/ui";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type { DiscountCard } from "@/shared/types";
import Card from "./DiscountCard.vue";

const { t } = useI18n();

const discounts = computed<DiscountCard[]>(() => {
  return [
    {
      title: t("main_landing.discounts.buy_two.title"),
      description: t("main_landing.discounts.buy_two.description"),
      link: "",
      image: "/images/mock/discount/nail-hand-1.jpg",
    },
    {
      title: t("main_landing.discounts.first_time.title"),
      description: t("main_landing.discounts.first_time.description"),
      link: "",
      image: "/images/mock/discount/nail-hand-2.jpg",
    },
    {
      title: t("main_landing.discounts.refer.title"),
      description: t("main_landing.discounts.refer.description"),
      link: "",
      image: "/images/mock/discount/nail-hand-3.jpg",
    },
    {
      title: t("main_landing.discounts.birthday.title"),
      description: t("main_landing.discounts.birthday.description"),
      link: "",
      image: "/images/mock/discount/nail-hand-4.jpg",
    },
  ];
});
</script>

<template>
  <section
    class="container cards py-12 flex items-center justify-between gap-4 overflow-x-auto overflow-y-hidden w-full"
  >
    <Card
      v-for="discount in discounts"
      :key="discount.title"
      :discount="discount"
    />
  </section>
</template>

<style>
.container {
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: transparent;
}

.container::-webkit-scrollbar {
  display: none;
}

.cards:has(.discount-card:hover) .discount-card {
  opacity: 0.5;
  filter: grayscale(30%);
  transition: all 0.3s;
}

.cards:has(.discount-card:hover) .discount-card:hover {
  opacity: 1 !important;
  filter: none !important;
  transform: scale(1.05);
  box-shadow: 8px 8px 20px var(--secondary);
}
</style>
