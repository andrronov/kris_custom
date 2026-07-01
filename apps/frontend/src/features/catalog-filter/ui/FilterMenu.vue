<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";
import {
  PRODUCT_COLORS,
  PRODUCT_FINISHES,
  PRODUCT_STYLES,
} from "@kris-customs/shared/config";
import { RadioGroup, Input, Checkbox } from "@/shared/ui";

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
    <FilterMenuItem :title="itemTitles.price">
      <Input v-model="filters.price[0]" type="number">
        {{ t("common.min") }}:
      </Input>
      <Input v-model="filters.price[1]" type="number">
        {{ t("common.max") }}:
      </Input>
    </FilterMenuItem>
    <FilterMenuItem
      :title="itemTitles.colors"
      class="flex flex-col flex-wrap gap-1"
    >
      <Checkbox
        v-for="color in PRODUCT_COLORS"
        :key="color"
        v-model="filters.colors"
        :value="color"
      >
        {{ t(`common.colors.${color}`) }}
      </Checkbox>
    </FilterMenuItem>
    <FilterMenuItem
      :title="itemTitles.styles"
      class="flex flex-col flex-wrap gap-1"
    >
      <Checkbox
        v-for="style in PRODUCT_STYLES"
        :key="style"
        v-model="filters.styles"
        :value="style"
      >
        {{ t(`common.styles.${style}`) }}
      </Checkbox>
    </FilterMenuItem>
    <FilterMenuItem
      :title="itemTitles.finish"
      class="flex flex-col flex-wrap gap-1"
    >
      <Checkbox
        v-for="finish in PRODUCT_FINISHES"
        :key="finish"
        v-model="filters.finish"
        :value="finish"
      >
        {{ t(`common.finishes.${finish}`) }}
      </Checkbox>
    </FilterMenuItem>
  </div>
</template>
