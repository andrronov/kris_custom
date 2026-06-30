<script setup lang="ts">
import { computed } from "vue";
import type { ProductWithImages } from "@kris-customs/shared/types";
import { ProductCard } from "@/entities/product";
import { useBreakpoints } from "@/shared/lib/composables/use-breakpoints";

const { showFilters } = defineProps<{
  products: ProductWithImages[];
  showFilters: boolean;
}>();

const { lgAndSmaller } = useBreakpoints();

const classes = computed(() => {
  if (lgAndSmaller.value) return "grid-cols-2";
  return showFilters ? "grid-cols-3" : "grid-cols-4";
});
</script>

<template>
  <div class="w-full grid gap-4" :class="classes">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
