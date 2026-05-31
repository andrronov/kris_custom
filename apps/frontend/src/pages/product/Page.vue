<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import type {
  ProductWithImages,
  ProductImage,
} from "@kris-customs/shared/types";
import { createAsyncProcess } from "@/shared/lib/utils";
import { ProductPrice } from "@/entities/product-card";
import { useLocalize } from "@/shared/lib/composables/use-localize";
import { MEDIA_URL } from "@/shared/config";
import { api } from "@/shared/api";
import { ICONS } from "@/shared/assets";
import {
  Slider,
  Image,
  Radio,
  Input,
  Button,
  Select,
  Skeleton,
  Icon,
} from "@/shared/ui";
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
const quantity = ref(1);

const productFeatures = [
  {
    icon: ICONS.deliveryTruckSpeed,
    text: "Free shipping included",
  },
  {
    icon: ICONS.starsFilled,
    text: "Handmade to order",
  },
  {
    icon: ICONS.alarmComplete,
    text: "Delivery in 3-5 days",
  },
];

const quantityOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];
</script>

<!--
SECTIONS TO ADD:
    - FAQ
    - REASONS WHY NAILS (reference: https://ersanails.com/products/candy-blossom)
    - REVIEWS
    - ADDITIONAL ITEMS
    - YOU MAY ALSO LIKE / RECENTLY VIEWED
-->

<template>
  <section class="mt-10 py-6 pb-16 flex flex-col w-full container" id="main">
    <div
      class="grid grid-cols-1 xl:grid-cols-[minmax(650px,_1.25fr)_minmax(300px,_1fr)] gap-4 items-stretch"
    >
      <Skeleton v-if="loading" class="w-full xl:hidden h-11" />
      <Heading
        v-else-if="product"
        class="flex xl:hidden items-center justify-center gap-4"
        :product="product"
      />
      <Slider
        #default="{ defaultClass }"
        controls
        class="slider_container min-h-full xl:max-h-[770px]"
      >
        <template v-if="loading">
          <Skeleton
            v-for="s in 2"
            class="min-h-[380px] xl:min-h-[750px]"
            :class="defaultClass"
          />
        </template>
        <template v-else-if="product">
          <Image
            v-for="img in product.productImages"
            :src="getProductImages(img)"
            class="w-full rounded-xl object-cover h-full"
            :class="defaultClass"
          />
        </template>
      </Slider>
      <div class="flex flex-col gap-4 items-center h-full">
        <Skeleton v-if="loading" class="w-full h-11" />
        <Heading
          v-else-if="product"
          class="hidden xl:flex items-center gap-4"
          :product="product"
        />
        <Skeleton v-if="loading" class="w-full h-24" />
        <p v-else-if="product" class="text-center text-lg">
          {{ l(product.description) }}
        </p>
        <div
          class="w-full flex flex-col items-center gap-2.5 xl:gap-3.5 rounded-xl py-2 border-2 border-primary"
        >
          <span class="text-lg font-medium">
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
          </div>
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
          <span class="text-lg font-medium">
            {{ t("product.choose.quantity") }}
          </span>
          <Input v-model="quantity" type="number" controls class="max-w-64" />
          <Skeleton v-if="loading" class="w-52 h-11" />
          <ProductPrice
            v-else-if="product"
            class="text-4xl font-bold text-primary pt-2"
            :price="product.basePrice"
          />
          <Button
            class="w-full max-w-72 xl:max-w-[424px]"
            size="lg"
            color="primary"
          >
            {{ t("common.buttons.cart") }}
          </Button>
          <ul class="flex flex-wrap justify-center items-center gap-2 lg:gap-3">
            <li
              class="inline-flex items-center gap-[6px]"
              v-for="(feature, index) in productFeatures"
              :key="index"
            >
              <Icon :name="feature.icon" class="size-6" />
              <span class="text-sm lg:text-base">{{ feature.text }}</span>
            </li>
          </ul>
        </div>
        <Button size="md" color="primary" variant="outline" full-width>
          How to measure nail size?
        </Button>
      </div>
    </div>
  </section>
</template>
