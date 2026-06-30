import { ref, reactive } from "vue";
import { useBreakpoints } from "@/shared/lib/composables/use-breakpoints";
import type { CatalogFilters } from "../types";

export const useCatalogFilter = () => {
  const { lgOrLarger } = useBreakpoints();

  const filters = reactive<CatalogFilters>({
    availability: "all",
    colors: [],
    finish: [],
    price: [0, 200],
    styles: [],
  });

  const showFilters = ref(lgOrLarger.value);
  const toggleFilters = () => {
    showFilters.value = !showFilters.value;
  };

  return {
    filters,
    showFilters,
    toggleFilters,
  };
};
