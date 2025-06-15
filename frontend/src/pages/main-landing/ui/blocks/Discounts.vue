<script setup lang="ts">
import { Image, Button } from "@/shared/ui";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const discounts = computed(() => {
  return [
    {
      title: t("main_landing.discounts.buy_two.title"),
      description: t("main_landing.discounts.buy_two.description"),
      image: "first-time-customer.jpg",
    },
    {
      title: t("main_landing.discounts.first_time.title"),
      description: t("main_landing.discounts.first_time.description"),
      image: "first-time-customer.jpg",
    },
    {
      title: t("main_landing.discounts.refer.title"),
      description: t("main_landing.discounts.refer.description"),
      image: "refer-a-friend.jpg",
    },
    {
      title: t("main_landing.discounts.birthday.title"),
      description: t("main_landing.discounts.birthday.description"),
      image: "birthday-discount.jpg",
    },
  ];
});
</script>

<template>
  <section
    class="container py-12 flex items-center justify-between gap-4 overflow-x-auto overflow-y-hidden w-full"
  >
    <div
      v-for="(discount, index) in discounts"
      :key="index"
      class="relative h-48 min-w-[300px] w-full rounded-3xl bg-base-100 border border-secondary flex flex-col justify-between items-center p-4"
    >
      <Image
        src="/images/hero.jpg"
        layout="fullWidth"
        class="absolute w-full h-full object-cover rounded-3xl top-0 left-0 opacity-50"
      />
      <div class="w-full z-50">
        <h3 class="text-2xl font-bold text-secondary">{{ discount.title }}</h3>
        <p class="text-lg">{{ discount.description }}</p>
      </div>
      <Button
        class="mt-3 z-50 self-start"
        size="md"
        color="secondary"
        variant="outline"
      >
        {{ t("common.buttons.learn_more") }}
      </Button>
    </div>
  </section>
</template>

<style scoped>
.container {
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: transparent;
}

.container::-webkit-scrollbar {
  display: none;
}
</style>
