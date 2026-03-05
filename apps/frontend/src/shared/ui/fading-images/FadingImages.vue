<script setup lang="ts">
import { ref, useAttrs, onMounted, onBeforeUnmount } from "vue";
import type { Language, ProductImage } from "@kris-customs/shared/types";
import { getMediaUrl } from "@/shared/lib/utils";
import { Image } from "@/shared/ui";

type Options = {
  changeInterval?: number;
};

const {
  images,
  imgStyles,
  lang = "en",
  options,
} = defineProps<{
  images: ProductImage[];
  imgStyles?: string;
  lang?: Language;
  options?: Options;
}>();

const attrs = useAttrs();

const isHovering = ref(false);
const imagesSrc = images.map((img) => getMediaUrl(img.imageKey));

let intervalId: ReturnType<typeof setInterval>;
onMounted(() => {
  if (options?.changeInterval) {
    intervalId = setInterval(
      () => (isHovering.value = !isHovering.value),
      options?.changeInterval,
    );
  }
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

const imageStyles = "z-100 object-cover";
</script>

<template>
  <div
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @touchstart="isHovering = true"
    @touchend="isHovering = false"
    @touchcancel="isHovering = false"
    v-bind="attrs"
    :class="[imageStyles, imgStyles]"
  >
    <Image
      :src="imagesSrc[0]"
      :class="['image-transition', imageStyles, imgStyles]"
      :style="{ opacity: isHovering ? 0 : 1 }"
      :alt="images[0].altText?.[lang]"
    />
    <Image
      :src="imagesSrc[1]"
      :class="['image-transition', imgStyles, imageStyles]"
      :style="{ opacity: isHovering ? 1 : 0 }"
      :alt="images[1].altText?.[lang]"
    />
  </div>
</template>

<style scoped>
.image-transition {
  @apply absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out;
}
</style>
