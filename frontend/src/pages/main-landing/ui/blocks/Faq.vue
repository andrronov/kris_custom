<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Button, Accordion } from "@/shared/ui";
import { ICONS } from "@/shared/assets";

import SectionHeading from "../components/SectionHeading.vue";

type Qa = {
  question: string;
  answer: string;
};

const { t, tm } = useI18n();

const faqItems = computed(() => tm("main_landing.faq.qas") as Qa[]);
</script>

<template>
  <section class="py-6 pb-16 flex flex-col w-full container">
    <SectionHeading>
      {{ t("main_landing.faq.title") }}
    </SectionHeading>
    <Accordion
      v-for="(item, index) in faqItems"
      :key="index"
      :title="item.question"
      class="my-2"
    >
      <p>{{ item.answer }}</p>
    </Accordion>
  </section>
</template>
