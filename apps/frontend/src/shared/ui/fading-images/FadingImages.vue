<script setup lang="ts">
import { ref, useAttrs, onMounted, onBeforeUnmount } from "vue";
import type { ProductImage } from "@kris-customs/shared/types";
import { useLocalize } from "@/shared/lib/composables/use-localize";
import { useDevice } from "@/shared/lib/composables/use-device";
import { getMediaUrl } from "@/shared/lib/utils";
import { Image } from "@/shared/ui";

type Options = {
  changeInterval?: number;
};

const { images, imgStyles, options } = defineProps<{
  images: ProductImage[];
  imgStyles?: string;
  options?: Options;
}>();

const attrs = useAttrs();
const { l } = useLocalize();
const { isMobileOrTablet } = useDevice();

const isHovering = ref(false);
const imagesSrc = images.map((img) => getMediaUrl(img.imageKey));

let intervalId: ReturnType<typeof setInterval>;
onMounted(() => {
  if (options?.changeInterval && isMobileOrTablet) {
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
    v-bind="attrs"
    :class="[imageStyles, imgStyles]"
  >
    <Image
      :src="imagesSrc[0]"
      :class="['image-transition', imageStyles, imgStyles]"
      :style="{ opacity: isHovering ? 0 : 1 }"
      :alt="l(images[0].altText)"
    />
    <Image
      :src="imagesSrc[1]"
      :class="['image-transition', imgStyles, imageStyles]"
      :style="{ opacity: isHovering ? 1 : 0 }"
      :alt="l(images[1].altText)"
    />
  </div>
</template>

<style scoped>
.image-transition {
  @apply absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out;
}
</style>
