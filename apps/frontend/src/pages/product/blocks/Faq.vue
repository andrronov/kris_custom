<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Collapsible } from "@/shared/ui";
import { SectionHeading } from "@/entities/page";

const { t } = useI18n();

const faqSlugs = [
  "how_long_last",
  "how_to_apply",
  "can_reuse",
  "are_safe",
  "nail_doesnt_fit",
];
</script>

<template>
  <section class="py-6 pb-16 flex flex-col w-full container">
    <SectionHeading>
      {{ t("product.faq.title") }}
    </SectionHeading>
    <Collapsible
      v-for="(slug, index) in faqSlugs"
      :key="index"
      :title="t(`common.faq.${slug}.question`)"
      class="my-2"
    >
      <p>{{ t(`common.faq.${slug}.answer`) }}</p>
    </Collapsible>
  </section>
</template>
