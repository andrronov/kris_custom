<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import type { ProductWithImages } from "@kris-customs/shared/types";
import { useLocalize } from "@/shared/lib/composables/use-localize";
import { useUserStore } from "@/shared/stores/user";
import { useAppStore } from "@/shared/stores/application";
import { FadingImages } from "@/shared/ui";

import type { ProductCardSize } from "../types";
import { PRODUCT_CARD_CLASSES } from "../data";

import LikeProduct from "./LikeProduct.vue";
import ProductBadge from "./ProductBadge.vue";
import ProductPrice from "./ProductPrice.vue";

const router = useRouter();
const { l } = useLocalize();

const {
  product,
  showLike = true,
  size = "base",
} = defineProps<{
  product: ProductWithImages;
  showLike?: boolean;
  size?: ProductCardSize;
}>();

const userStore = useUserStore();
const appStore = useAppStore();

const liked = computed(() => userStore.favorites.has(product.id));

const cardClass = {
  card: PRODUCT_CARD_CLASSES[size],
  image: {
    base: "h-[270px] md:h-[300px] lg:h-[400px] w-full",
    small: "h-[180px] md:h-[200px] lg:h-[300px] w-full",
  }[size],
  params: {
    base: "h-16",
    small: "h-16",
  }[size],
};

const navigateTo = (slug: string) => {
  router.push(`/product/${slug}`);
};
</script>

<template>
  <div
    class="w-full flex-shrink-0 rounded-3xl relative flex flex-col cursor-pointer overflow-hidden items-center shadow-sm shadow-secondary"
    :class="cardClass.card"
    @click="navigateTo(product.slug)"
  >
    <!-- <ProductBadge /> -->
    <LikeProduct
      v-if="showLike"
      :liked
      :size
      @toggle="userStore.toggleFavorite(product.id)"
    />

    <FadingImages
      class="relative"
      :images="product.productImages"
      :img-styles="cardClass.image"
    />

    <div
      class="w-full flex justify-center flex-col items-center"
      :class="cardClass.params"
    >
      <p class="font-medium text-primary text-base md:text-lg">
        {{ l(product.name) }}
      </p>
      <ProductPrice :price="product.basePrice" />
    </div>
  </div>
</template>
