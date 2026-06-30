<script setup lang="ts">
import { shallowRef, onMounted } from "vue";
import type { ProductWithImages } from "@kris-customs/shared/types";
import {
  FilterButton,
  useCatalogFilter,
  FilterSidebar,
  FilterBlock,
} from "@/features/catalog-filter";
import { SortDropdown, useCatalogSort } from "@/features/catalog-sort";
import { api } from "@/shared/api";
import { createAsyncProcess } from "@/shared/lib/utils";

import CatalogProducts from "./CatalogProducts.vue";

const { showFilters, toggleFilters } = useCatalogFilter();
const { setSort } = useCatalogSort();

const products = shallowRef<ProductWithImages[]>([]);

const { run: fetchProducts } = createAsyncProcess(async () => {
  const [data, error] = await api.getMayLikeProducts("glossy-petal", 14);

  if (error) {
    console.error(error);
    return;
  }

  products.value = data;
});

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <section class="relative flex flex-col w-full gap-4">
    <div class="sticky z-[126] top-[86px] mx-4">
      <div
        class="py-2.5 bg-base-100/75 backdrop-blur-sm rounded-full lg:rounded-none w-full"
      >
        <div class="container w-full flex items-center justify-between gap-4">
          <FilterButton :show-filters="showFilters" @click="toggleFilters" />
          <SortDropdown @select="setSort($event)" />
        </div>
      </div>
    </div>
    <div class="container flex items-start lg:gap-6">
      <FilterSidebar v-model="showFilters" />
      <FilterBlock v-model="showFilters" />
      <CatalogProducts :show-filters="showFilters" :products="products" />
    </div>
  </section>
</template>
