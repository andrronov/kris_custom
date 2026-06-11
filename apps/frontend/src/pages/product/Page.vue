<script setup lang="ts">
import { shallowRef, computed, watch } from "vue";
import { useRoute } from "vue-router";
import type { ProductWithImages } from "@kris-customs/shared/types";
import { createAsyncProcess, scrollToTop, anchor } from "@/shared/lib/utils";
import { api } from "@/shared/api";

import ProductDetails from "./blocks/ProductDetails.vue";
import Faq from "./blocks/Faq.vue";
import MayLike from "./blocks/MayLike.vue";

const route = useRoute();

const product = shallowRef<ProductWithImages | null>(null);
const mayLikeProducts = shallowRef<ProductWithImages[]>([]);

const routeSlug = computed(() => {
  const { slug } = route.params as { slug: string };
  return slug;
});

const { run: getProduct, loading } = createAsyncProcess(async () => {
  const [data, error] = await api.getProductBySlug(routeSlug.value);

  if (error) {
    product.value = null;
    return;
  }

  product.value = data;
});

const { run: getMayLikeProducts, loading: mayLikeLoading } = createAsyncProcess(
  async () => {
    const [data, error] = await api.getMayLikeProducts(routeSlug.value);

    if (error) {
      throw error;
    }

    mayLikeProducts.value = data;
  },
);

watch(
  () => route.path,
  (newPath, oldPath) => {
    if (newPath && newPath !== oldPath) {
      scrollToTop("smooth");
      getProduct();
      getMayLikeProducts();
    }
  },
  { immediate: true },
);
</script>

<template>
  <ProductDetails :id="anchor.get('main')" :loading :product />
  <Faq :id="anchor.get('faq')" />
  <MayLike
    :id="anchor.get('you-may-like')"
    :key="routeSlug"
    :products="mayLikeProducts"
    :loading="mayLikeLoading"
  />
</template>

<!--
SECTIONS TO ADD:
    - FAQ
    - REASONS WHY NAILS (reference: https://ersanails.com/products/candy-blossom)
    - REVIEWS
    - ADDITIONAL ITEMS
    - YOU MAY ALSO LIKE / RECENTLY VIEWED
-->

<!--
    Add `Customize` button for future feature
-->
