<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Slider, Image } from "@/shared/ui";

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
      :options="{ loop: true }"
      :auto-play="{ delay: 3500, stopOnInteraction: false }"
    >
      <Image
        v-for="(img, idx) in 5"
        :key="idx"
        src="/images/hero.jpg"
        class="min-w-0 flex-shrink-0 flex-grow-0 basis-full mx-8 max-w-[400px] max-h-[400px] object-cover"
      />
    </Slider>
  </section>
</template>
