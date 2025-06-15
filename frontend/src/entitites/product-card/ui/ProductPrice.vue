<script setup lang="ts">
import type { ProductPrice } from "@/shared/types";

defineProps<{
  price: ProductPrice;
}>();
</script>

<template>
  <p>
    <template v-if="typeof price === 'number'"> ${{ price }} </template>
    <template v-else>
      ${{ price[0] }} <span class="line-through ml-1">${{ price[1] }}</span>
    </template>
  </p>
</template>
