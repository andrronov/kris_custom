import { ref, reactive, computed } from "vue";
import { useRouteQuery } from "@vueuse/router";
import { useBreakpoints } from "@/shared/lib/composables/use-breakpoints";
import {
  getValues,
  fromEntries,
  objectEntries,
  isObject,
  getKeys,
} from "@/shared/lib/utils";
import {
  serializeStringArray,
  parseStringArray,
  serializePriceRange,
  parsePriceRange,
} from "./serializers";
import { DEFAULT_PRICE, PRICE_RANGE, DEFAULT_FILTERS } from "./config";
import type { CatalogFilters } from "../types";

function useArrayQuery<K extends keyof CatalogFilters>(
  name: K,
  defaultValue: any,
) {
  return useRouteQuery(name as string, defaultValue, {
    transform: {
      get: (v) => parseStringArray(v) as CatalogFilters[K],
      set: (v) => serializeStringArray(v as string[]),
    },
  });
}

export const useCatalogFilter = () => {
  const { lgOrLarger } = useBreakpoints();

  const availability = useRouteQuery<CatalogFilters["availability"]>(
    "availability",
    DEFAULT_FILTERS.availability,
  );
  const colors = useArrayQuery("colors", [...DEFAULT_FILTERS.colors]);
  const finish = useArrayQuery("finish", [...DEFAULT_FILTERS.finish]);
  const styles = useArrayQuery("styles", [...DEFAULT_FILTERS.styles]);

  const price = useRouteQuery("price", String(DEFAULT_FILTERS.price), {
    transform: {
      get: (v) => parsePriceRange(v, DEFAULT_PRICE, PRICE_RANGE),
      set: (v: CatalogFilters["price"]) =>
        serializePriceRange(v, DEFAULT_PRICE),
    },
  });

  const filters: CatalogFilters = reactive({
    availability,
    colors,
    finish,
    styles,
    price,
  });

  const dirtyFilters = computed(() => {
    return getKeys(
      fromEntries(
        objectEntries(filters).filter(([k, v]) => {
          if (Array.isArray(v)) {
            return JSON.stringify(v) !== JSON.stringify(DEFAULT_FILTERS[k]);
          } else if (isObject(v)) {
            return !Object.is(v, DEFAULT_FILTERS[k]);
          } else {
            return v !== DEFAULT_FILTERS[k];
          }
        }),
      ),
    );
  });

  const isDirty = computed(() => dirtyFilters.value.length > 0);

  const clearFilters: Record<keyof CatalogFilters, () => void> = {
    availability: () => (availability.value = DEFAULT_FILTERS.availability),
    colors: () => (colors.value = [...DEFAULT_FILTERS.colors]),
    finish: () => (finish.value = [...DEFAULT_FILTERS.finish]),
    styles: () => (styles.value = [...DEFAULT_FILTERS.styles]),
    price: () => (price.value = DEFAULT_PRICE),
  };
  const clearAllFilters = () => {
    for (const clear of getValues(clearFilters)) {
      clear();
    }
  };

  const showFilters = ref(lgOrLarger.value);
  const toggleFilters = () => {
    showFilters.value = !showFilters.value;
  };

  return {
    filters,

    dirtyFilters,
    isDirty,
    clearAllFilters,
    clearFilters,

    showFilters,
    toggleFilters,
  };
};
