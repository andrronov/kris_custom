import type { InferSelectModel } from "drizzle-orm";
import * as schema from "../db";
import { SUPPORTED_LANGUAGES } from "../config";

export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export type LocalizedString = {
  en: string;
} & Partial<Record<Exclude<Language, "en">, string>>;

export type Product = InferSelectModel<typeof schema.products>;
export type ProductVariant = InferSelectModel<typeof schema.productVariants>;
export type Collection = InferSelectModel<typeof schema.collections>;
export type ProductCollection = InferSelectModel<
  typeof schema.productCollections
>;
export type ProductImage = InferSelectModel<typeof schema.productImages>;
export type ProductWithImages = Product & {
  productImages: ProductImage[];
};

export const orderStatuses = [
  "pending_payment",
  "paid",
  "in_progress",
  "shipped",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof orderStatuses)[number];
export type Order = InferSelectModel<typeof schema.orders>;
export type OrderItem = InferSelectModel<typeof schema.orderItems>;

export const promotionTypes = [
  "PERCENTAGE",
  "FIXED_AMOUNT",
  "BUY_X_GET_Y",
  "FIRST_PURCHASE",
] as const;
export type PromotionType = (typeof promotionTypes)[number];
export type Promotion = InferSelectModel<typeof schema.promotions>;
export type PromotionUsage = InferSelectModel<typeof schema.promotionUsage>;

export type User = InferSelectModel<typeof schema.users>;
export type UserAddress = InferSelectModel<typeof schema.addresses>;
