<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Button } from "@/shared/ui";

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <h3
      class="!leading-snug text-2xl md:text-4xl pt-4 font-normal text-center text-secondary"
    >
      Orders
    </h3>
    <Button class="w-full" color="secondary" size="lg">
      {{ t("common.buttons.log_in") }}
    </Button>
  </div>
</template>
