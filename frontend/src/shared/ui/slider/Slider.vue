<script setup lang="ts">
import { computed } from "vue";
import emblaCarouselVue from "embla-carousel-vue";
import AutoPlay from "embla-carousel-autoplay";
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import type { AutoplayOptionsType } from "embla-carousel-autoplay";

const props = defineProps<{
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  autoPlay?: AutoplayOptionsType;
}>();

const autoPlay: EmblaPluginType = AutoPlay(props?.autoPlay);

const plugins = computed(() => {
  const plugins = props.plugins || [];
  if (props.autoPlay) plugins.push(autoPlay);
  return plugins;
});

const [emblaRef] = emblaCarouselVue(props?.options, plugins.value);
</script>

<template>
  <div class="overflow-hidden" ref="emblaRef">
    <div class="flex">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
