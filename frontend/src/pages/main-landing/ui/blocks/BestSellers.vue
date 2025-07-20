<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ProductCard } from "@/entitites/product-card";
import { Button } from "@/shared/ui";

const { t } = useI18n();
</script>

<template>
  <section class="py-6 pb-16 flex flex-col w-full">
    <h2 class="container text-4xl text-primary font-semibold mb-3">
      {{ t("main_landing.best_sellers.title") }}
    </h2>
    <p class="container text-lg text-secondary">
      {{ t("main_landing.best_sellers.description") }}
    </p>
    <div class="flex items-center gap-4 overflow-x-auto mt-6 py-4 no-scrollbar">
      <ProductCard v-for="item in 6" :key="item" />
    </div>
    <Button color="primary" variant="outline" class="self-center mt-4">
      {{ t("common.buttons.view_catalog") }}
    </Button>
  </section>
</template>
