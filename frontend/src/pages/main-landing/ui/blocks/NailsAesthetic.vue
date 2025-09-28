<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { FadingImages } from "@/shared/ui";

const { t } = useI18n();

const images = [
  {
    decor: ["images/hero.jpg", "/images/nails_exp.jpg"],
    styles:
      "absolute h-2/5 sm:h-[324px] w-8/12 sm:w-[292px] xl:h-[384px] xl:w-[352px] -top-2 left-0 md:top-0 md:left-6 lg:top-2 lg:left-8 xl:top-2 xl:left-14 2xl:top-2 2xl:left-32 shadow-lg shadow-rose-dark hover:shadow-rose-muted hover:shadow-xl hover:scale-105 transition duration-300",
  },
  {
    decor: ["/images/nails_exp.jpg", "images/hero.jpg"],
    styles:
      "absolute h-2/5 md:h-[314px] w-1/2 md:w-[282px] xl:h-[344px] xl:w-[312px] hidden sm:block top-4 -right-2 md:top-8 md:right-14 lg:top-6 lg:right-16 xl:top-8 xl:right-24 2xl:top-12 2xl:right-48 shadow-lg shadow-rose-dark hover:shadow-rose-muted hover:shadow-xl hover:scale-105 transition duration-300",
  },
  {
    decor: ["images/hero.jpg", "/images/nails_exp.jpg"],
    styles:
      "absolute h-[294px] w-[262px] xl:h-[354px] xl:w-[322px] hidden lg:block lg:-top-5 xl:-top-6 2xl:-top-8 shadow-lg shadow-rose-dark hover:shadow-rose-muted hover:shadow-xl hover:scale-105 transition duration-300",
  },
  {
    decor: ["/images/nails_exp.jpg", "/images/hero.jpg"],
    styles:
      "absolute h-[274px] w-[242px] xl:h-[384px] xl:w-[352px] hidden md:block -bottom-10 lg:-bottom-8 xl:-bottom-10 2xl:-bottom-12 shadow-lg shadow-rose-dark hover:shadow-rose-muted hover:shadow-xl hover:scale-105 transition duration-300",
  },
  {
    decor: ["images/hero.jpg", "/images/nails_exp.jpg"],
    styles:
      "absolute h-2/5 md:h-[284px] w-1/2 md:w-[252px] xl:h-[334px] xl:w-[302px] hidden sm:block bottom-10 -left-2 lg:bottom-12 lg:left-16 xl:bottom-6 xl:left-24 2xl:bottom-6 2xl:left-44 shadow-lg shadow-rose-dark hover:shadow-rose-muted hover:shadow-xl hover:scale-105 transition duration-300",
  },
  {
    decor: ["images/hero.jpg", "/images/nails_exp.jpg"],
    styles:
      "absolute h-2/5 sm:h-[304px] w-8/12 sm:w-[282px] xl:h-[354px] xl:w-[332px] bottom-5 right-0 lg:bottom-4 lg:right-14 xl:bottom-4 xl:right-24 2xl:bottom-4 2xl:right-44 shadow-lg shadow-rose-dark hover:shadow-rose-muted hover:shadow-xl hover:scale-105 transition duration-300",
  },
];
</script>

<template>
  <section
    class="w-full bg-gradient-to-b py-10 pb-12 from-base-100 via-rose-dark to-base-100"
  >
    <div class="container flex flex-col">
      <div class="w-full flex h-[800px] items-center justify-center relative">
        <div class="flex flex-col items-end z-1000">
          <h2
            class="text-4xl xl:text-5xl text-primary-content bg-primary p-2 rounded-xl font-semibold"
          >
            {{ t("main_landing.nails_aesthetic.title") }}
          </h2>
          <p class="text-xl xl:text-2xl font-medium italic text-base-content">
            {{ t("main_landing.nails_aesthetic.description") }}
          </p>
        </div>
        <FadingImages
          v-for="(img, idx) in images"
          :key="idx"
          :images="img.decor"
          :class="img.styles"
          :options="{
            changeInterval: 4500,
          }"
        />
      </div>
    </div>
  </section>
</template>
