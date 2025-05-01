<script setup lang="ts">
import { ref } from "vue";
import { Image } from "@/shared/ui";
import type { Product } from "@/shared/types";
import LikeProduct from "./LikeProduct.vue";
import ProductBadge from "./ProductBadge.vue";
import ProductPrice from "./ProductPrice.vue";

// зарефакторить - убрать дефолт
const props = withDefaults(
  defineProps<{
    product?: Product;
  }>(),
  {
    product: () => ({
      id: "1",
      name: "Base Beauty",
      price: [49.99, 59.99],
      image: ["/images/nails_exp.jpg", "/images/hero.jpg"],
    }),
  },
);

const imageStyles =
  "w-full z-100 h-[270px] md:h-[300px] lg:h-[400px] object-cover pointer-events-none";
const isHovering = ref(false);
</script>

<template>
  <div
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @touchstart="isHovering = true"
    @touchend="isHovering = false"
    @touchcancel="isHovering = false"
    class="w-full max-w-[265px] min-h-[305px] md:max-w-[295px] md:min-h-[335px] lg:max-w-[395px] lg:min-h-[435px] flex-shrink-0 rounded-3xl relative flex flex-col cursor-pointer overflow-hidden items-center shadow-sm shadow-secondary"
  >
    <ProductBadge />
    <LikeProduct />

    <div class="relative" :class="imageStyles">
      <Image
        :src="product.image[0]"
        :class="['image-transition', imageStyles]"
        :style="{ opacity: isHovering ? 0 : 1 }"
      />
      <Image
        :src="product.image[1]"
        :class="['image-transition', imageStyles]"
        :style="{ opacity: isHovering ? 1 : 0 }"
      />
    </div>

    <div class="w-full h-16 flex justify-center flex-col items-center">
      <p class="font-medium text-primary text-lg">
        {{ product.name }}
      </p>
      <ProductPrice :price="product.price" />
    </div>
  </div>
</template>

<style scoped>
.image-transition {
  @apply absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out;
}
</style>
