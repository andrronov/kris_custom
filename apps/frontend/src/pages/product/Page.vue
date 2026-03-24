<script setup lang="ts">
import { shallowRef } from "vue";
import { useRoute } from "vue-router";
import type { ProductWithImages } from "@kris-customs/shared/types";
import { createAsyncProcess } from "@/shared/lib/utils";
import { api } from "@/shared/api";
import { Slider, Image } from "@/shared/ui";

const route = useRoute();
const { slug } = route.params as { slug: string };

const product = shallowRef<ProductWithImages | null>(null);

const {
  run: getProduct,
  loading,
  error,
} = createAsyncProcess(async () => {
  const [data, error] = await api.getProductBySlug(slug);

  if (error) {
    console.log(error);
    return;
  }

  product.value = data;
});

getProduct();

const images = Array.from({ length: 10 }, () => "/images/nails_exp.jpg");
</script>

<template>
  <div class="mt-10">
    <h1>product</h1>
    <p>{{ product }}</p>

    <!-- <Slider #default="{ defaultClass }" class="py-4 slider_container">
      <Image
        v-for="img in 10"
        src="/images/nails_exp.jpg"
        class="max-w-96 h-96"
        :class="defaultClass"
      />
    </Slider> -->

    <Slider>
      <template #default="{ defaultClass }">
        <Image
          v-for="img in images"
          :class="defaultClass"
          :src="img"
          class="max-w-96 h-96"
        />
      </template>

      <template #thumbnails="{ currentSlide, onThumbClick }">
        <Image
          v-for="(img, i) in images"
          :key="i"
          :class="{ active: i === currentSlide }"
          @click="onThumbClick(i)"
          :src="img"
          class="thumb w-12 h-12"
        />
      </template>
    </Slider>
  </div>
</template>
