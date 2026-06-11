<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { ProductWithImages } from "@kris-customs/shared/types";
import { SectionHeading } from "@/entities/page";
import { ProductSlider } from "@/entities/product";

const { products, loading } = defineProps<{
  products: ProductWithImages[];
  loading?: boolean;
}>();

const { t } = useI18n();
</script>

<template>
  <section class="py-6 pb-16 flex flex-col w-full">
    <SectionHeading>
      {{ t("product.may_like.title") }}
    </SectionHeading>
    <ProductSlider :loading="loading" :products="products" />
  </section>
</template>
