<script setup lang="ts">
import { useRouter } from "vue-router";
import type { ProductWithImages } from "@kris-customs/shared/types";
import { useLocalize } from "@/shared/lib/composables/use-localize";
import { useAppStore } from "@/shared/stores/application";
import { FadingImages } from "@/shared/ui";

import type { ProductCardSize } from "../types";

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

const appStore = useAppStore();

const cardClass = {
  image: "aspect-square w-full object-cover",
  params: {
    base: "h-auto min-h-[64px] py-2",
    small: "h-auto min-h-[32px] py-2",
  }[size],
};

const navigateTo = (slug: string) => {
  router.push(`/product/${slug}`);
};
</script>

<template>
  <div
    class="w-full h-full flex flex-col relative rounded-3xl overflow-hidden cursor-pointer items-center shadow-sm shadow-secondary"
    @click="navigateTo(product.slug)"
  >
    <LikeProduct
      v-if="showLike"
      :id="product.id"
      :size="size"
      class="absolute right-4 top-3 z-50"
    />

    <FadingImages
      class="relative w-full aspect-square"
      :images="product.productImages"
      :img-styles="cardClass.image"
      :options="{ changeInterval: 4500 }"
    />

    <div
      class="w-full flex flex-col justify-center items-center flex-grow"
      :class="cardClass.params"
    >
      <p
        class="font-medium text-primary text-sm md:text-base lg:text-lg text-center px-2"
      >
        {{ l(product.name) }}
      </p>
      <ProductPrice :price="product.basePrice" />
    </div>
  </div>
</template>
