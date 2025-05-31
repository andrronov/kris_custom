<script setup lang="ts">
import { ref } from "vue";
import { Image } from "@/shared/ui";
import type { ProductImage } from "@/shared/types";

type Options = {
  changeInterval?: number;
  autoChange?: boolean;
};

defineProps<{
  images: Omit<ProductImage, string>;
  imgStyles?: string;
  options?: Options;
}>();

const imageStyles = "w-full z-100 object-cover";

const isHovering = ref(false);
</script>

<template>
  <div
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @touchstart="isHovering = true"
    @touchend="isHovering = false"
    @touchcancel="isHovering = false"
    class="relative"
    :class="[imageStyles, imgStyles]"
  >
    <Image
      :src="images[0]"
      :class="['image-transition', imageStyles, imgStyles]"
      :style="{ opacity: isHovering ? 0 : 1 }"
    />
    <Image
      :src="images[1]"
      :class="['image-transition', imgStyles, imageStyles]"
      :style="{ opacity: isHovering ? 1 : 0 }"
    />
  </div>
</template>

<style scoped>
.image-transition {
  @apply absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out;
}
</style>
