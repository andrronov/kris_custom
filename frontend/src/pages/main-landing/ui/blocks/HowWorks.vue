<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { Slider, Image } from "@/shared/ui";
import type { HowStep } from "@/shared/types";
import Steps from "./HowSteps.vue";

const { t, tm } = useI18n();

const howSteps = computed<HowStep[]>(() => tm("main_landing.how_works.steps"));
</script>

<template>
  <section class="container py-6 pb-16 flex flex-col w-full">
    <h2 class="text-4xl text-primary font-semibold mb-3">
      {{ t("main_landing.how_works.title") }}
    </h2>
    <div
      class="flex flex-col md:flex-row items-start md:items-end justify-between"
    >
      <Steps :steps="howSteps" />
      <div
        class="w-11/12 container ml-4 md:ml-0 px-0 md:w-2/3 border-2 border-primary rounded-tl-none md:rounded-bl-none rounded-lg overflow-hidden"
      >
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
            class="mx-6 w-full max-h-[800px] object-cover"
          />
        </Slider>
      </div>
    </div>
  </section>
</template>
