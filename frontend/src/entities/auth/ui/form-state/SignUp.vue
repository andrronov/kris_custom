<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <h3 class="text-xl font-bold">
      {{ t("auth.sign_up") }}
    </h3>
  </div>
</template>
