<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { CatalogBoard } from "@/widgets/catalog-board";

const { t } = useI18n();
</script>

<template>
  <div class="mt-10 w-full flex flex-col items-center gap-6">
    <div
      v-if="false"
      class="w-full bg-pink-800 rounded-lg h-40 before:content-['BANNER']"
    />
    <h1 class="font-bold text-4xl">{{ t("catalog.title") }}</h1>
    <CatalogBoard />
  </div>
</template>
