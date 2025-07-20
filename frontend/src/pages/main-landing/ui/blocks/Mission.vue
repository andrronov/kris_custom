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
      #default="{ defaultClass }"
      :options="{ loop: true }"
      :auto-play="{ delay: 3500, stopOnInteraction: false }"
    >
      <Image
        v-for="(img, idx) in 5"
        :key="idx"
        src="/images/hero.jpg"
        :class="defaultClass"
        class="mx-6 md:max-w-[450px] max-w-[400px] md:max-h-[450px] max-h-[400px] object-cover"
      />
    </Slider>
    <Button class="mx-auto" color="primary" variant="outline">
      {{ t("common.buttons.get_your_beauty") }}
    </Button>
  </section>
</template>
