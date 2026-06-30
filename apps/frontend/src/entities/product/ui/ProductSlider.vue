<script setup lang="ts">
import { Slider } from "@/shared/ui";
import type { ProductWithImages } from "@kris-customs/shared/types";
import {
  ProductCardSkeleton,
  ProductCard,
  PRODUCT_CARD_CLASSES,
} from "../index";

defineProps<{
  loading: boolean;
  products: ProductWithImages[];
}>();
</script>

<template>
  <Slider class="py-4 slider_container" :loading>
    <template #skeleton="{ defaultClass }">
      <ProductCardSkeleton size="base" v-for="s in 6" :class="defaultClass" />
    </template>
    <template #default="{ defaultClass }">
      <ProductCard
        size="base"
        v-for="product in products"
        :key="product.id"
        :class="[defaultClass, PRODUCT_CARD_CLASSES.base]"
        :product
      />
    </template>
  </Slider>
</template>
