<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import { RadioGroup } from "@/shared/ui";

import { useCatalogFilter } from "../lib/use-catalog-filter";
import type { ProductAvailability, CatalogFilters } from "../types";
import FilterMenuItem from "./FilterMenuItem.vue";

const { t } = useI18n();
const { filters } = useCatalogFilter();

const availabilityOptions = computed(
  () =>
    [
      { value: "all", label: t("catalog.filter.availability.all") },
      { value: "in-stock", label: t("catalog.filter.availability.in-stock") },
      {
        value: "out-of-stock",
        label: t("catalog.filter.availability.out-of-stock"),
      },
    ] satisfies { value: ProductAvailability; label: string }[],
);

const itemTitles = computed(
  () =>
    ({
      availability: t("catalog.filter.availability.title"),
      colors: t("catalog.filter.colors.title"),
      finish: t("catalog.filter.finish.title"),
      price: t("catalog.filter.price.title"),
      styles: t("catalog.filter.style.title"),
    }) satisfies Record<keyof CatalogFilters, string>,
);
</script>

<template>
  <div class="flex flex-col w-full gap-2">
    <FilterMenuItem :title="itemTitles.availability">
      <RadioGroup
        class="flex flex-col gap-1.5"
        group-name="availability"
        :options="availabilityOptions"
        v-model="filters.availability"
      />
    </FilterMenuItem>
    <FilterMenuItem :title="itemTitles.price"> </FilterMenuItem>
    <FilterMenuItem :title="itemTitles.colors"> </FilterMenuItem>
    <FilterMenuItem :title="itemTitles.finish"> </FilterMenuItem>
    <FilterMenuItem :title="itemTitles.styles"> </FilterMenuItem>
  </div>
</template>
