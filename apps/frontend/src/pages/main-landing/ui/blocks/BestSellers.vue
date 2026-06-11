<script setup lang="ts">
import { shallowRef } from "vue";
import type { ProductWithImages } from "@kris-customs/shared/types";
import { useI18n } from "vue-i18n";
import { ProductSlider } from "@/entities/product";
import { Button } from "@/shared/ui";
import { api } from "@/shared/api";
import { SectionHeading } from "@/entities/page";
import { createAsyncProcess } from "@/shared/lib/utils";

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
    <SectionHeading>
      <template #default>
        {{ t("main_landing.best_sellers.title") }}
      </template>
      <template #subtitle>
        {{ t("main_landing.best_sellers.description") }}
      </template>
    </SectionHeading>

    <ProductSlider :loading :products />

    <Button color="primary" variant="outline" class="self-center mt-4">
      {{ t("common.buttons.view_catalog") }}
    </Button>
  </section>
</template>
