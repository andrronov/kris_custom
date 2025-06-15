<script setup lang="ts">
import { Image, Button } from "@/shared/ui";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <section class="relative flex h-[720px] bg-base-100">
    <Image
      src="/images/hero.jpg"
      layout="fullWidth"
      class="absolute top-0 left-0 object-cover h-full w-full opacity-35 pointer-events-none"
    />
    <div
      class="container z-50 flex flex-col items-center self-center text-center"
    >
      <h1 class="font-semibold text-3xl md:text-6xl text-base-content w-full">
        {{ t("main_landing.wear") }}
        <span class="font-bold text-primary"> {{ t("main_landing.art") }} </span
        >. <br />
        {{ t("main_landing.define") }}
        <span class="font-bold text-primary">{{
          t("main_landing.beauty")
        }}</span
        >.
      </h1>
      <p class="mt-2 w-full text-center font-light text-lg md:text-xl">
        {{ t("main_landing.description") }}
        <span class="font-bold text-primary">{{ t("common.you") }}</span
        >.
      </p>
      <Button class="mt-16" variant="outline" size="lg" color="primary">
        {{ t("common.buttons.discover") }}
      </Button>
    </div>
  </section>
</template>
