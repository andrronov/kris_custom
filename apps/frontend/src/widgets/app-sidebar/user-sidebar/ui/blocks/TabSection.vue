<script setup lang="ts">
import { ICONS } from "@/shared/assets";
import { Icon } from "@/shared/ui";
import { useI18n } from "vue-i18n";

const { customClass = "h-48" } = defineProps<{
  label: string;
  icon: string;
  customClass?: string;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col gap-2">
    <p class="inline-flex items-center gap-1 text-lg md:text-xl">
      {{ label }}
      <Icon :name="ICONS.chevronRightRounded" class="w-6 h-6 md:w-7 md:h-7" />
    </p>
    <slot>
      <div
        class="w-full flex flex-col gap-1 items-center justify-center rounded-lg border-2 border-secondary/45"
        :class="customClass"
      >
        <div class="w-auto h-auto p-4 md:p-5 bg-secondary/75 rounded-full">
          <Icon :name="icon" class="w-8 h-8 md:w-10 md:h-10" />
        </div>
        <p>{{ t("user-sidebar.no_items") }}</p>
      </div>
    </slot>
  </div>
</template>
