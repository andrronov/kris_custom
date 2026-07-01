import type { ProductAttributes } from "@kris-customs/shared/types";

export type ProductAvailability = "all" | "in-stock" | "out-of-stock";

export type CatalogFilters = Required<ProductAttributes> & {
  availability: ProductAvailability;
  price: [number, number];
};
