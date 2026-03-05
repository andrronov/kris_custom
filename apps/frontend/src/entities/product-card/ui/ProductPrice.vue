<script setup lang="ts">
import type { Product } from "@kris-customs/shared/types";

defineProps<{
  price: string | number;
}>();
</script>

<template>
  <p>
    <template v-if="typeof price === 'number'"> ${{ price }} </template>
    <template v-else>
      ${{ price }}
      <!-- <span class="line-through ml-1">${{ price[1] }}</span> -->
    </template>
  </p>
</template>
