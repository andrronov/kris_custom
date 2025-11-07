<script setup lang="ts">
import { ICONS } from "@/shared/assets";
import { Icon } from "@/shared/ui";
import { useI18n } from "vue-i18n";

defineProps<{
  label: string;
  icon: string;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class="inline-flex items-center gap-1 text-lg md:text-xl">
      {{ label }}
      <Icon :name="ICONS.chevronRightRounded" class="w-6 h-6 md:w-7 md:h-7" />
    </p>
    <div
      class="w-full h-48 flex flex-col gap-1 items-center justify-center rounded-lg border-2 border-secondary/45"
    >
      <div class="w-auto h-auto p-4 md:p-5 bg-secondary/75 rounded-full">
        <Icon :name="icon" class="w-8 h-8 md:w-10 md:h-10" />
      </div>
      <p>{{ t("user-sidebar.no_items") }}</p>
    </div>
  </div>
</template>
