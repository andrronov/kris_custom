<script setup lang="ts">
import { Button, Icon } from "@/shared/ui";
import { ICONS } from "@/shared/assets";
import { useI18n } from "vue-i18n";

defineProps<{
  showFilters: boolean;
}>();

const { t } = useI18n();
</script>

<template>
  <Button variant="link">
    <Icon :name="ICONS.filter" class="size-5" />
    <span>{{
      showFilters
        ? t("common.buttons.hide_filters")
        : t("common.buttons.show_filters")
    }}</span>
    <Icon :name="showFilters ? ICONS.up : ICONS.down" class="size-5" />
  </Button>
</template>
