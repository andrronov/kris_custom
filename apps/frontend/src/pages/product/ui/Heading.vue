<script setup lang="ts">
import type { ProductWithImages } from "@kris-customs/shared/types";
import { useLocalize } from "@/shared/lib/composables/use-localize";
import { LikeProduct } from "@/entities/product-card";

defineProps<{
  product: ProductWithImages;
}>();

const { l } = useLocalize();
</script>

<template>
  <div class="flex items-center gap-4">
    <h1 class="text-5xl text-primary font-bold">
      {{ l(product.name) }}
    </h1>
    <LikeProduct
      :id="product.id"
      color="primary"
      variant="outline"
      size="base"
      class="fill-primary"
    />
  </div>
</template>
