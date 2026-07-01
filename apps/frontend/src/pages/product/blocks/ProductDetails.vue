<script setup lang="ts">
import { reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import type {
  ProductImage,
  ProductWithImages,
} from "@kris-customs/shared/types";
import {
  PRODUCT_SIZES,
  PRODUCT_SHAPES,
  PRODUCT_LENGTHS,
} from "@kris-customs/shared/config";
import { ProductPrice } from "@/entities/product";
import { useLocalize } from "@/shared/lib/composables/use-localize";
import { ICONS } from "@/shared/assets";
import { MEDIA_URL } from "@/shared/config";
import {
  Slider,
  Image,
  Radio,
  RadioGroup,
  Input,
  Button,
  Skeleton,
  Icon,
} from "@/shared/ui";

import Heading from "../ui/Heading.vue";
import MeasureModal from "../ui/MeasureModal.vue";
import ContentModal from "../ui/ContentModal.vue";
import ProductDetailsOption from "../ui/ProductDetailsOption.vue";

defineProps<{
  product: ProductWithImages | null;
  loading: boolean;
}>();

const { t } = useI18n();
const { l } = useLocalize();

const INITIAL_OPTIONS = {
  size: "",
  shape: "",
  length: "",
  quantity: 1,
};
const options = reactive(INITIAL_OPTIONS);

const sanitizeOptions = (options: readonly string[], key: string) => {
  return options.map((option) => ({
    label: t(`product.${key}.${option}`),
    value: option,
  }));
};

const productOptions = computed(() => ({
  size: sanitizeOptions(PRODUCT_SIZES, "sizes"),
  shape: sanitizeOptions(PRODUCT_SHAPES, "shapes"),
  length: sanitizeOptions(PRODUCT_LENGTHS, "lengths"),
}));

const getProductImages = (image: ProductImage) => {
  return `${MEDIA_URL}/${image.imageKey}`;
};

const productFeatures = computed(() => [
  {
    icon: ICONS.deliveryTruckSpeed,
    text: t("product.features.free_shipping"),
  },
  {
    icon: ICONS.starsFilled,
    text: t("product.features.handmade"),
  },
  {
    icon: ICONS.alarmComplete,
    text: t("product.features.delivery"),
  },
]);
</script>

<template>
  <section class="mt-10 py-6 pb-16 flex flex-col w-full container" id="main">
    <template v-if="product || loading">
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
          :key="product?.id"
          :loading
          controls
          class="min-h-full xl:max-h-[770px]"
        >
          <template #skeleton="{ defaultClass }">
            <Skeleton
              v-for="s in 2"
              class="min-h-[380px] xl:min-h-[750px]"
              :class="defaultClass"
            />
          </template>
          <template v-if="product" #default="{ defaultClass }">
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
          <p v-else-if="product" class="text-center text-base lg:text-lg">
            {{ l(product.description) }}
          </p>

          <div
            class="w-full flex flex-col items-center gap-2.5 xl:gap-3.5 rounded-xl py-2 border-2 border-primary"
          >
            <ProductDetailsOption :title="t('product.choose.size')">
              <template #additional>
                <MeasureModal
                  class="md:absolute -top-[2px] left-full md:ml-5 w-max !uppercase"
                />
              </template>
              <RadioGroup
                v-model="options.size"
                :options="productOptions.size"
                group-name="product-size"
                class="flex flex-wrap justify-center items-center gap-2 [&>*]:min-w-20 lg:[&>*]:min-w-24"
              />
            </ProductDetailsOption>
            <ProductDetailsOption :title="t('product.choose.shape')">
              <RadioGroup
                v-model="options.shape"
                :options="productOptions.shape"
                group-name="product-shape"
                class="flex flex-wrap justify-center items-center gap-2 [&>*]:min-w-20"
              />
            </ProductDetailsOption>
            <ProductDetailsOption :title="t('product.choose.length')">
              <RadioGroup
                v-model="options.length"
                :options="productOptions.length"
                group-name="product-length"
                class="flex flex-wrap justify-center items-center gap-2 [&>*]:min-w-20"
              />
            </ProductDetailsOption>
            <ProductDetailsOption :title="t('product.choose.quantity')">
              <Input
                v-model="options.quantity"
                type="number"
                :min="1"
                :max="10"
                controls
                class="max-w-64"
              />
            </ProductDetailsOption>

            <Skeleton v-if="loading" class="w-52 h-11" />
            <ProductPrice
              v-else-if="product"
              class="text-4xl font-bold text-primary pt-2"
              :price="product.basePrice"
            />
            <Button
              :disabled="loading"
              class="w-full max-w-72 xl:max-w-[424px]"
              size="lg"
              color="primary"
            >
              {{ t("common.buttons.cart") }}
            </Button>

            <ul
              class="flex flex-wrap justify-center items-center gap-2 2xl:gap-3"
            >
              <li
                class="inline-flex items-center gap-1 2xl:gap-[6px]"
                v-for="(feature, index) in productFeatures"
                :key="index"
              >
                <Icon :name="feature.icon" class="size-5 2xl:size-6" />
                <span class="text-sm lg:text-base">{{ feature.text }}</span>
              </li>
            </ul>
          </div>

          <div class="flex flex-col items-center gap-2 w-full">
            <ContentModal />
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex flex-col items-center justify-center gap-4 py-24">
        <h2 class="font-bold text-xl lg:text-3xl text-primary">
          {{ t("product.not_found") }}
        </h2>
      </div>
    </template>
  </section>
</template>
