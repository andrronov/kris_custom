<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { DiscountCard } from "@/shared/types";
import { Button, Image, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

const { t } = useI18n();

const props = defineProps<{
  discount: DiscountCard;
}>();
</script>

<template>
  <div
    class="discount-card relative h-48 min-w-[300px] w-full rounded-3xl bg-base-100 flex flex-col justify-between items-center p-4 cursor-pointer transition-all duration-300"
  >
    <Image
      :src="discount.image"
      layout="fullWidth"
      class="absolute w-full h-full object-cover object-center rounded-3xl top-0 left-0 opacity-40"
    />
    <div class="w-full z-50">
      <h3 class="text-2xl font-bold text-secondary">{{ discount.title }}</h3>
      <p class="text-lg italic">{{ discount.description }}</p>
    </div>
    <Button
      class="absolute bottom-4 right-4 z-50 self-start"
      size="md"
      color="secondary"
      variant="outline"
    >
      <Icon class="text-2xl" :name="ICONS.arrowRight" />
    </Button>
  </div>
</template>

<style scoped lang="scss">
.discount-card {
  box-shadow: 2.5px 2.5px 5px var(--secondary);
}
</style>
