<script setup lang="ts">
import { Skeleton } from "@/shared/ui";
import type { ProductCardSize } from "../types";
import { PRODUCT_CARD_CLASSES } from "../data";

const { size = "base" } = defineProps<{
  size?: ProductCardSize;
}>();

const skeletonClass = PRODUCT_CARD_CLASSES[size];
</script>

<template>
  <Skeleton
    class="w-full rounded-3xl overflow-hidden shadow-sm shadow-secondary"
    :class="skeletonClass"
  />
</template>
