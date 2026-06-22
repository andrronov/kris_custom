<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { DropdownItem } from "@/shared/ui";

const emit = defineEmits<{
  (e: "select", sort: string): void;
}>();

const { t } = useI18n();

const sortOptions = computed(() => [
  { label: t("common.sort.best_selling"), value: "best_selling" },
  { label: t("common.sort.price_asc"), value: "price_asc" },
  { label: t("common.sort.price_desc"), value: "price_desc" },
  { label: t("common.sort.date_asc"), value: "date_asc" },
  { label: t("common.sort.date_desc"), value: "date_desc" },
  { label: t("common.sort.name_asc"), value: "name_asc" },
  { label: t("common.sort.name_desc"), value: "name_desc" },
]);
</script>

<template>
  <template v-for="option in sortOptions" :key="option.value">
    <DropdownItem @click="emit('select', option.value)">
      <span>{{ option.label }}</span>
    </DropdownItem>
  </template>
</template>
