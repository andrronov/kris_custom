<script setup lang="ts">
import { computed, nextTick, useTemplateRef, watch } from "vue";
import { Flip } from "@/shared/services/gsap";
import { ProductCard } from "@/entities/product";
import type { ProductWithImages } from "@kris-customs/shared/types";
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

const gridRef = useTemplateRef("grid-ref");
watch(
  () => showFilters,
  async () => {
    if (!gridRef.value) return;
    const state = Flip.getState(gridRef.value.children);
    await nextTick();

    Flip.from(state, {
      duration: 0.65,
      ease: "power2.inOut",
      absolute: true,
      stagger: 0.02,
    });
  },
);
</script>

<template>
  <div ref="grid-ref" class="w-full grid gap-4" :class="classes">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
