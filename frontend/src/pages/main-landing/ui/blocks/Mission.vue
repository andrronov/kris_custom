<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Slider, Image, Button } from "@/shared/ui";

const { t } = useI18n();
</script>

<template>
  <section class="py-6 pb-16 gap-10 text-center flex flex-col w-full">
    <div class="w-full bg-primary py-2 flex flex-col items-center">
      <h2 class="text-2xl md:text-4xl text-primary-content font-semibold mb-3">
        {{ t("main_landing.mission.title") }}
      </h2>
      <p
        class="text-base md:text-lg text-primary-content font-medium uppercase"
      >
        {{ t("main_landing.mission.description") }}
      </p>
    </div>
    <Slider
      #default="{ defaultClass, currentSlide }"
      :options="{ loop: true }"
      :auto-play="{ delay: 4500, stopOnInteraction: false }"
      class="p-4"
    >
      <Image
        v-for="(img, idx) in 10"
        :key="idx"
        src="/images/hero.jpg"
        :class="[
          defaultClass,
          'mx-2 md:mx-6 md:max-w-[450px] transition-shadow duration-500 max-w-[325px] md:max-h-[450px] max-h-[325px] object-cover rounded-lg',
          currentSlide === idx
            ? 'shadow-lg shadow-primary'
            : 'opacity-60 grayscale',
        ]"
      />
    </Slider>
    <Button class="mx-auto" color="primary" variant="outline">
      {{ t("common.buttons.get_your_beauty") }}
    </Button>
  </section>
</template>
