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
      <slot :default-class="getDefaultClass()" :current-slide="currentSlide" />
    </div>
    <template v-if="controls">
      <Button
        variant="dropdown-item"
        color="secondary"
        size="sm"
        class="absolute left-4 top-1/2"
        @click="onPrevClick"
        :disabled="isPrevDisabled"
      >
        {{ "<" }}
      </Button>
      <Button
        variant="dropdown-item"
        color="secondary"
        size="sm"
        class="absolute right-4 top-1/2"
        @click="onNextClick"
        :disabled="isNextDisabled"
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

<!-- <script setup lang="ts">
import { computed, watch, useSlots, useAttrs } from "vue";
import emblaCarouselVue from "embla-carousel-vue";
import AutoPlay from "embla-carousel-autoplay";

import { useSlider } from "./use-slider";

const props = defineProps<{
  options?: any;
  plugins?: any[];
  autoPlay?: any;
}>();

const emits = defineEmits(["emblaReady", "onSelect"]);

const slots = useSlots();
const attrs = useAttrs();

const autoPlay = AutoPlay(props?.autoPlay);

const plugins = computed(() => {
  const plugins = props.plugins || [];
  if (props.autoPlay) plugins.push(autoPlay);
  return plugins;
});

const { currentSlide, emblaRef, emblaApi, goToSlide } = useSlider(
  props.options,
  emits,
  plugins.value,
);

const [thumbsRef, thumbsApi] = emblaCarouselVue({
  containScroll: "keepSnaps",
  dragFree: true,
});

const onThumbClick = (index: number) => {
  goToSlide(index);
};

watch(currentSlide, (index) => {
  if (!thumbsApi.value) return;
  thumbsApi.value.scrollTo(index);
});

const getDefaultClass = () => "min-w-0 flex-shrink-0 flex-grow-0 basis-full";
</script>

<template>
  <div class="overflow-hidden slider" ref="emblaRef">
    <div class="flex slider__container select-none">
      <slot :default-class="getDefaultClass()" :current-slide="currentSlide" />
    </div>
  </div>

  <template v-if="!!slots.thumbnails">
    <div class="overflow-hidden mt-4" ref="thumbsRef">
      <div class="flex gap-2">
        <slot
          name="thumbnails"
          :current-slide="currentSlide"
          :on-thumb-click="onThumbClick"
        />
      </div>
    </div>
  </template>
</template>

<style lang="scss">
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

.thumb {
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.thumb.active {
  opacity: 1;
}
</style> -->
