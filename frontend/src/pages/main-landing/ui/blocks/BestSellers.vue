<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ProductCard } from "@/entities/product-card";
import { Button, Slider } from "@/shared/ui";
import SectionHeading from "../components/SectionHeading.vue";

const { t } = useI18n();
</script>

<template>
  <section class="py-6 pb-16 flex flex-col w-full">
    <SectionHeading class="container">
      <template #default>
        {{ t("main_landing.best_sellers.title") }}
      </template>
      <template #subtitle>
        {{ t("main_landing.best_sellers.description") }}
      </template>
    </SectionHeading>
    <Slider
      #default="{ defaultClass }"
      class="py-4 slider-with-container-padding"
    >
      <ProductCard
        v-for="item in 6"
        :key="item"
        :class="[
          defaultClass,
          {
            'mx-3': item !== 6 && item !== 1,
            'mr-3': item === 1,
            'ml-3': item === 6,
          },
        ]"
      />
    </Slider>
    <Button color="primary" variant="outline" class="self-center mt-4">
      {{ t("common.buttons.view_catalog") }}
    </Button>
  </section>
</template>

<!-- <style scoped>
.slider-with-container-padding {
  padding-left: max(1rem, calc((100vw - theme("screens.2xl")) / 2));
  padding-right: max(1rem, calc((100vw - theme("screens.2xl")) / 2));
}

@media (max-width: theme("screens.xl")) {
  .slider-with-container-padding {
    padding-left: max(1rem, calc((100vw - theme("screens.xl")) / 2));
    padding-right: max(1rem, calc((100vw - theme("screens.xl")) / 2));
  }
}

@media (min-width: theme("screens.sm")) and (max-width: theme("screens.lg")) {
  .slider-with-container-padding {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style> -->

<style scoped>
.slider-with-container-padding {
  padding-left: 0.7rem;
  padding-right: 0.7rem;
}

@media (min-width: theme("screens.sm")) {
  .slider-with-container-padding {
    padding-left: calc((100vw - theme("screens.sm")) / 2);
    padding-right: calc((100vw - theme("screens.sm")) / 2);
  }
}

@media (min-width: theme("screens.md")) {
  .slider-with-container-padding {
    padding-left: calc((100vw - theme("screens.md")) / 2);
    padding-right: calc((100vw - theme("screens.md")) / 2);
  }
}

@media (min-width: theme("screens.lg")) {
  .slider-with-container-padding {
    padding-left: max(2rem, calc((100vw - theme("screens.lg")) / 2));
    padding-right: max(2rem, calc((100vw - theme("screens.lg")) / 2));
  }
}

@media (min-width: theme("screens.xl")) {
  .slider-with-container-padding {
    padding-left: max(2rem, calc((100vw - theme("screens.xl")) / 2));
    padding-right: max(2rem, calc((100vw - theme("screens.xl")) / 2));
  }
}

@media (min-width: theme("screens.2xl")) {
  .slider-with-container-padding {
    padding-left: calc((100vw - theme("screens.2xl")) / 2);
    padding-right: calc((100vw - theme("screens.2xl")) / 2);
  }
}
</style>
