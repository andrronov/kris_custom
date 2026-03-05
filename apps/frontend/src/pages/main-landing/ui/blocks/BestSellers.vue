<script setup lang="ts">
import { shallowRef } from "vue";
import type { ProductWithImages } from "@kris-customs/shared/types";
import { useI18n } from "vue-i18n";
import { ProductCard, ProductCardSkeleton } from "@/entities/product-card";
import { Button, Slider, Skeleton } from "@/shared/ui";
import { api } from "@/shared/api";
import { createAsyncProcess } from "@/shared/lib/utils";

import SectionHeading from "../components/SectionHeading.vue";

const { t } = useI18n();

const products = shallowRef<ProductWithImages[]>([]);
const { run: getProducts, loading } = createAsyncProcess(async () => {
  const [data, error] = await api.getPopularProducts(6);
  products.value = data ?? [];
});

getProducts();
</script>

<template>
  <section class="py-6 pb-16 flex flex-col w-full">
    <SectionHeading class="container">
      <template #default>
        {{ t("main_landing.best_sellers.title") }}
      </template>
      <template #subtitle>
        {{ t("main_landing.best_sellers.description") }}
      </template>
    </SectionHeading>

    <Slider #default="{ defaultClass }" class="py-4 slider_container">
      <ProductCardSkeleton
        size="base"
        v-if="loading"
        v-for="s in 6"
        :class="defaultClass"
      />
      <ProductCard
        v-else
        size="base"
        v-for="product in products"
        :key="product.id"
        :class="defaultClass"
        :product
      />
    </Slider>
    <Button color="primary" variant="outline" class="self-center mt-4">
      {{ t("common.buttons.view_catalog") }}
    </Button>
  </section>
</template>

<style scoped>
.slider_container {
  padding-left: 0.7rem;
  padding-right: 0.7rem;
}

@media (min-width: theme("screens.sm")) {
  .slider_container {
    padding-left: calc((100vw - theme("screens.sm")) / 2);
    padding-right: calc((100vw - theme("screens.sm")) / 2);
  }
}

@media (min-width: theme("screens.md")) {
  .slider_container {
    padding-left: calc((100vw - theme("screens.md")) / 2);
    padding-right: calc((100vw - theme("screens.md")) / 2);
  }
}

@media (min-width: theme("screens.lg")) {
  .slider_container {
    padding-left: max(2rem, calc((100vw - theme("screens.lg")) / 2));
    padding-right: max(2rem, calc((100vw - theme("screens.lg")) / 2));
  }
}

@media (min-width: theme("screens.xl")) {
  .slider_container {
    padding-left: max(2rem, calc((100vw - theme("screens.xl")) / 2));
    padding-right: max(2rem, calc((100vw - theme("screens.xl")) / 2));
  }
}

@media (min-width: theme("screens.2xl")) {
  .slider_container {
    padding-left: calc((100vw - theme("screens.2xl")) / 2);
    padding-right: calc((100vw - theme("screens.2xl")) / 2);
  }
}
</style>
