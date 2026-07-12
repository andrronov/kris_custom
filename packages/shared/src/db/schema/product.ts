import {
  pgTable,
  timestamp,
  uuid,
  integer,
  decimal,
  jsonb,
  text,
} from "drizzle-orm/pg-core";
import type {
  LocalizedString,
  ProductVariantAttributes,
  ProductAttributes,
} from "../../types";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: jsonb("name").notNull().$type<LocalizedString>(),
  description: jsonb("description").$type<LocalizedString>(),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
  slug: text("slug").unique().notNull(),
  attributes: jsonb("attributes").$type<ProductAttributes>(),
  viewCount: integer("view_count").default(0).notNull(),
  purchaseCount: integer("purchase_count").default(0).notNull(),
  previewImageKey: text("preview_image_key"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  name: jsonb("name").notNull(),
  priceOffset: decimal("price_offset", { precision: 10, scale: 2 })
    .default("0")
    .notNull(),
  attributes: jsonb("attributes").$type<ProductVariantAttributes>(),
});

export const productImages = pgTable("product_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  imageKey: text("image_key").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  altText: jsonb("alt_text").$type<LocalizedString>(),
});
