<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { Button, Collapsible } from "@/shared/ui";
import { SectionHeading } from "@/entities/page";

type Qa = {
  question: string;
  answer: string;
};

const { t, tm } = useI18n();

const faqItems = computed(() => tm("common.faq") as Record<string, Qa>);
</script>

<template>
  <section class="py-6 pb-16 flex flex-col w-full container">
    <SectionHeading>
      {{ t("main_landing.faq.title") }}
    </SectionHeading>
    <Collapsible
      v-for="(item, index) in faqItems"
      :key="index"
      :title="item.question"
      class="my-2"
    >
      <p>{{ item.answer }}</p>
    </Collapsible>
  </section>
</template>
