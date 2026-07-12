import { ref } from "vue";

export const useCatalogSort = () => {
  const sort = ref<string | null>(null);

  const setSort = (value: string) => {
    sort.value = value;
  };

  return {
    sort,
    setSort,
  };
};
