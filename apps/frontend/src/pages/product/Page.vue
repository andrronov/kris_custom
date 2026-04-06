<script setup lang="ts">
import { ref, shallowRef, computed } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import type {
  ProductWithImages,
  ProductImage,
} from "@kris-customs/shared/types";
import { createAsyncProcess } from "@/shared/lib/utils";
import { LikeProduct, ProductPrice } from "@/entities/product-card";
import { useLocalize } from "@/shared/lib/composables/use-localize";
import { MEDIA_URL } from "@/shared/config";
import { api } from "@/shared/api";
import { Slider, Image, Radio, Button, Skeleton } from "@/shared/ui";

import Heading from "./ui/Heading.vue";

const route = useRoute();
const { t } = useI18n();
const { l } = useLocalize();

const product = shallowRef<ProductWithImages | null>(null);

const {
  run: getProduct,
  loading,
  error,
} = createAsyncProcess(async () => {
  const { slug } = route.params as { slug: string };
  const [data, error] = await api.getProductBySlug(slug);

  if (error) {
    console.log(error);
    return;
  }

  product.value = data;
});

getProduct();

const getProductImages = (image: ProductImage) => {
  return `${MEDIA_URL}/${image.imageKey}`;
};

const size = ref("");
const shape = ref("");
const length = ref("");
const sizes = ["xs", "s", "m", "l", "xl"];
const shapes = ["stillet", "mindal", "square"];
const lengths = ["short", "mid", "long"];
</script>

<template>
  <section class="mt-10 py-6 pb-16 flex flex-col w-full container" id="main">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
      <Skeleton v-if="loading" class="w-full lg:hidden h-11" />
      <Heading
        v-else-if="product"
        class="flex lg:hidden items-center gap-4"
        :product="product"
      />
      <Slider #default="{ defaultClass }" class="py-4 slider_container">
        <template v-if="loading">
          <Skeleton
            v-for="s in 2"
            class="min-h-[380px] lg:min-h-[750px]"
            :class="defaultClass"
          />
        </template>
        <template v-else-if="product">
          <Image
            v-for="img in product.productImages"
            :src="getProductImages(img)"
            class="w-full"
            :class="defaultClass"
          />
        </template>
      </Slider>
      <div class="flex flex-col gap-4 items-center h-full">
        <Skeleton v-if="loading" class="w-full h-11" />
        <Heading
          v-else-if="product"
          class="hidden lg:flex items-center gap-4"
          :product="product"
        />
        <Skeleton v-if="loading" class="w-full h-24" />
        <p v-else-if="product" class="text-center text-lg">
          {{ l(product.description) }}
        </p>
        <div
          class="w-full flex flex-col items-center gap-3 rounded-xl py-2 border-2 border-primary"
        >
          <!-- <span class="text-lg font-medium">
            {{ t("product.choose.size") }}
          </span>
          <div class="flex flex-wrap justify-center items-center gap-2">
            <Radio
              v-for="option in sizes"
              :key="option"
              v-model="size"
              :value="option"
              class="min-w-20"
            >
              {{ option }}
            </Radio>
          </div> -->
          <span class="text-lg font-medium">
            {{ t("product.choose.shape") }}
          </span>
          <div class="flex items-center gap-2">
            <Radio
              v-for="option in shapes"
              :key="option"
              v-model="shape"
              :value="option"
              class="min-w-20"
            >
              {{ option }}
            </Radio>
          </div>
          <span class="text-lg font-medium">
            {{ t("product.choose.length") }}
          </span>
          <div class="flex items-center gap-2">
            <Radio
              v-for="option in lengths"
              :key="option"
              v-model="length"
              :value="option"
              class="min-w-20"
            >
              {{ option }}
            </Radio>
          </div>
          <Skeleton v-if="loading" class="w-52 h-11" />
          <ProductPrice
            v-else-if="product"
            class="text-4xl font-bold text-primary pt-2"
            :price="product.basePrice"
          />
          <Button class="w-full max-w-72 lg:max-w-96" size="lg" color="primary">
            {{ t("common.buttons.cart") }}
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>
