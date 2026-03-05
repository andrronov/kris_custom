<script setup lang="ts">
import { computed } from "vue";
import emblaCarouselVue from "embla-carousel-vue";
import AutoPlay from "embla-carousel-autoplay";
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import type { AutoplayOptionsType } from "embla-carousel-autoplay";

import { useSlider } from "./use-slider";

const props = defineProps<{
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  autoPlay?: AutoplayOptionsType;
}>();
const emits = defineEmits(["emblaReady", "onSelect"]);

const autoPlay: EmblaPluginType = AutoPlay(props?.autoPlay);

const plugins = computed(() => {
  const plugins = props.plugins || [];
  if (props.autoPlay) plugins.push(autoPlay);
  return plugins;
});

const { currentSlide, emblaRef } = useSlider(
  props.options,
  emits,
  plugins.value,
);

const getDefaultClass = () => "min-w-0 flex-shrink-0 flex-grow-0 basis-full";
</script>

<template>
  <div class="overflow-hidden slider" ref="emblaRef">
    <div class="flex slider__container">
      <slot :default-class="getDefaultClass()" :current-slide="currentSlide" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider__container {
  > :first-child {
    @apply mr-3;
  }
  > :not(:first-child):not(:last-child) {
    @apply mx-3;
  }
  > :last-child {
    @apply ml-3;
  }
}
</style>
