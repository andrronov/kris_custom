import { ref } from "vue";
import { useBreakpoints } from "@/shared/lib/composables/use-breakpoints";

export const useCatalogFilter = () => {
  const { lgOrLarger } = useBreakpoints();

  const showFilters = ref(lgOrLarger.value);

  const toggleFilters = () => {
    showFilters.value = !showFilters.value;
  };

  return {
    showFilters,
    toggleFilters,
  };
};
