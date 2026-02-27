import {
  type MaybeRefOrGetter,
  onMounted,
  onUnmounted,
  ref,
  toValue,
} from "vue";
import type {
  EmblaCarouselType,
  EmblaOptionsType,
  EmblaPluginType,
} from "embla-carousel";
import emblaCarouselVue, {
  type EmblaCarouselVueType,
} from "embla-carousel-vue";

export const useSlider = (
  options?: MaybeRefOrGetter<EmblaOptionsType>,
  emits?: any,
  plugins?: EmblaPluginType[],
) => {
  const isPrevDisabled = ref(true);
  const isNextDisabled = ref(true);
  const slidesCount = ref(0);
  const currentSlide = ref(0);

  const isScrollable = (emblaApi: EmblaCarouselType) => {
    const scrollSnaps = emblaApi.internalEngine().scrollSnaps;
    const isScrollable = scrollSnaps.length > 1;

    const rootNode = emblaApi.rootNode();
    if (rootNode) {
      const parent = rootNode.parentElement;

      if (parent) {
        if (isScrollable) {
          parent.dataset.scrollable = "true";
        } else {
          delete parent.dataset.scrollable;
        }
      }
    }

    return isScrollable;
  };

  const [emblaRef, emblaApi]: EmblaCarouselVueType = emblaCarouselVue(
    {
      skipSnaps: true,
      slidesToScroll: 1,
      watchDrag: (emblaApi) => isScrollable(emblaApi),
      ...toValue(options),
    },
    plugins,
  );

  const updateDisabled = (emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return;
    isPrevDisabled.value = !emblaApi.canScrollPrev();
    isNextDisabled.value = !emblaApi.canScrollNext();
  };

  const updateSlidesCount = (emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return;
    slidesCount.value = emblaApi.scrollSnapList().length;
  };

  const goToSlide = (index: number) => {
    if (!emblaApi.value) return;
    emblaApi.value.scrollTo(index);
  };

  const onSelect = (emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return;
    currentSlide.value = emblaApi.selectedScrollSnap();
    updateDisabled(emblaApi);

    if (emits) {
      emits("onSelect");
    }
  };

  const onInit = (emblaApi: EmblaCarouselType) => {
    if (!emblaApi) return;
    updateSlidesCount(emblaApi);
    onSelect(emblaApi);
    isScrollable(emblaApi);
  };

  const onPrevClick = () => {
    if (!emblaApi.value) return;
    emblaApi.value.scrollPrev();
  };

  const progress = ref(0);
  const onProgressBar = (emblaApi: any) => {
    if (!emblaApi) return;
    progress.value = Math.max(0, Math.min(1, emblaApi.scrollProgress())) * 100;
  };

  const onNextClick = () => {
    if (!emblaApi.value) return;
    emblaApi.value.scrollNext();
  };

  onMounted(() => {
    if (!emblaApi.value) return;

    emblaApi.value.on("init", onInit).on("select", onSelect);
    emblaApi.value.on("reInit", onInit).on("scroll", onProgressBar);
  });

  onUnmounted(() => {
    if (!emblaApi.value) return;

    emblaApi.value.destroy();
  });

  return {
    emblaRef,
    emblaApi,
    isNextDisabled,
    isPrevDisabled,
    slidesCount,
    currentSlide,
    progress,
    onSelect,
    onInit,
    onPrevClick,
    onNextClick,
    goToSlide,
  };
};
