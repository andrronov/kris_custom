import type { ProductPrice, CatalogFilters } from "../types";

export const DEFAULT_PRICE: ProductPrice = [0, 200];
export const PRICE_RANGE = { min: 0, max: 9999 };

export const DEFAULT_FILTERS: CatalogFilters = {
  availability: "all",
  colors: [],
  finish: [],
  styles: [],
  price: DEFAULT_PRICE,
};
