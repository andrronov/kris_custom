<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/shared/stores/user";
import { FadingImages } from "@/shared/ui";
import type { Product } from "@/shared/types";

import LikeProduct from "./LikeProduct.vue";
import ProductBadge from "./ProductBadge.vue";
import ProductPrice from "./ProductPrice.vue";

// зарефакторить - убрать дефолт
const props = withDefaults(
  defineProps<{
    product?: Product;
    showLike?: boolean;
  }>(),
  {
    showLike: true,
    product: () => ({
      id: "1",
      name: "Base Beauty",
      price: [49.99, 59.99],
      decor: ["/images/nails_exp.jpg", "/images/hero.jpg"],
    }),
  },
);

const userStore = useUserStore();
const liked = computed(() => userStore.favorites.has(props.product.id));
</script>

<template>
  <div
    class="w-full max-w-[265px] min-h-[305px] md:max-w-[295px] md:min-h-[335px] lg:max-w-[395px] lg:min-h-[435px] flex-shrink-0 rounded-3xl relative flex flex-col cursor-pointer overflow-hidden items-center shadow-sm shadow-secondary"
  >
    <ProductBadge />
    <LikeProduct
      v-if="props.showLike"
      :liked
      @toggle="userStore.toggleFavorite(props.product.id)"
    />

    <FadingImages
      class="relative"
      :images="product.decor"
      img-styles="h-[270px] md:h-[300px] lg:h-[400px] w-full"
    />

    <div class="w-full h-16 flex justify-center flex-col items-center">
      <p class="font-medium text-primary text-lg">
        {{ product.name }}
      </p>
      <ProductPrice :price="product.price" />
    </div>
  </div>
</template>
