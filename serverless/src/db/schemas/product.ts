import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  integer,
  decimal,
  jsonb,
  primaryKey,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: jsonb("name").notNull(),
  description: jsonb("description"),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  attributes: jsonb("attributes"),
  viewCount: integer("view_count").default(0).notNull(),
  purchaseCount: integer("purchase_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  priceOffset: decimal("price_offset", { precision: 10, scale: 2 })
    .default("0")
    .notNull(),
  stockQuantity: integer("stock_quantity").default(0).notNull(),
  attributes: jsonb("attributes"),
});

export const collections = pgTable("collections", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: jsonb("name").notNull(),
  description: jsonb("description"),
});

export const productCollections = pgTable(
  "product_collections",
  {
    productId: uuid("product_id")
      .references(() => products.id)
      .notNull(),
    collectionId: uuid("collection_id")
      .references(() => collections.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.productId, table.collectionId] }),
    };
  },
);
