<script setup lang="ts">
import { computed } from "vue";
import emblaCarouselVue from "embla-carousel-vue";
import AutoPlay from "embla-carousel-autoplay";
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import type { AutoplayOptionsType } from "embla-carousel-autoplay";
import { Button } from "@/shared/ui";

import { useSlider } from "./use-slider";

const props = defineProps<{
  options?: EmblaOptionsType;
  controls?: boolean;
  plugins?: EmblaPluginType[];
  autoPlay?: AutoplayOptionsType;
  loading?: boolean;
}>();
const emits = defineEmits(["emblaReady", "onSelect"]);

const autoPlay: EmblaPluginType = AutoPlay(props?.autoPlay);

const plugins = computed(() => {
  const plugins = props.plugins || [];
  if (props.autoPlay) plugins.push(autoPlay);
  return plugins;
});

const {
  currentSlide,
  emblaRef,
  onNextClick,
  onPrevClick,
  isNextDisabled,
  isPrevDisabled,
} = useSlider(props.options, emits, plugins.value);

const getDefaultClass = () => "min-w-0 flex-shrink-0 flex-grow-0 basis-full";
</script>

<template>
  <div class="overflow-hidden slider relative" ref="emblaRef">
    <div class="flex h-full slider__container select-none">
      <template v-if="loading">
        <slot name="skeleton" :default-class="getDefaultClass()" />
      </template>

      <template v-else>
        <slot
          :default-class="getDefaultClass()"
          :current-slide="currentSlide"
        />
      </template>
    </div>
    <template v-if="controls">
      <Button
        variant="dropdown-item"
        color="secondary"
        size="sm"
        class="absolute left-4 top-1/2"
        @click="onPrevClick"
        :disabled="isPrevDisabled || loading"
      >
        {{ "<" }}
      </Button>
      <Button
        variant="dropdown-item"
        color="secondary"
        size="sm"
        class="absolute right-4 top-1/2"
        @click="onNextClick"
        :disabled="isNextDisabled || loading"
      >
        {{ ">" }}
      </Button>
    </template>
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
