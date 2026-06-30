import type { InferSelectModel } from "drizzle-orm";
import * as schema from "../db";
import { SUPPORTED_LANGUAGES } from "../config";

export type Language = (typeof SUPPORTED_LANGUAGES)[number];
export type LocalizedString = {
  en: string;
} & Partial<Record<Exclude<Language, "en">, string>>;

export type Product = InferSelectModel<typeof schema.products>;
export type ProductVariant = InferSelectModel<typeof schema.productVariants>;
export type ProductImage = InferSelectModel<typeof schema.productImages>;
export type ProductWithImages = Product & {
  productImages: ProductImage[];
};

const PRODUCT_SIZES = [
  "xxs",
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "xxl",
  "xxxl",
] as const;
export type ProductSize = (typeof PRODUCT_SIZES)[number];

const PRODUCT_SHAPES = ["stilettos", "coffin", "square", "almond"] as const;
export type ProductShape = (typeof PRODUCT_SHAPES)[number];

const PRODUCT_LENGTHS = ["short", "mid", "long"] as const;
export type ProductLength = (typeof PRODUCT_LENGTHS)[number];

export type ProductVariantAttributes = {
  size: ProductSize;
  shape: ProductShape;
  length: ProductLength;
};

export const PRODUCT_COLORS = [
  "pink",
  "blue",
  "black",
  "white",
  "red",
  "nude",
  "purple",
  "green",
  "clear",
] as const;
export type ProductColor = (typeof PRODUCT_COLORS)[number];

export const PRODUCT_FINISHES = [
  "glossy",
  "matte",
  "chrome",
  "velvet",
  "glitter",
] as const;
export type ProductFinish = (typeof PRODUCT_FINISHES)[number];

export const PRODUCT_STYLES = [
  "minimalist",
  "y2k",
  "anime",
  "goth",
  "cute",
  "elegant",
  "3d",
] as const;
export type ProductStyle = (typeof PRODUCT_STYLES)[number];

export type ProductAttributes = {
  colors?: ProductColor[];
  finish?: ProductFinish[];
  styles?: ProductStyle[];
};

export const ORDER_STATUSES = [
  "pending_payment",
  "paid",
  "in_progress",
  "shipped",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type Order = InferSelectModel<typeof schema.orders>;
export type OrderItem = InferSelectModel<typeof schema.orderItems>;

export const PROMOTION_TYPES = [
  "PERCENTAGE",
  "FIXED_AMOUNT",
  "BUY_X_GET_Y",
  "FIRST_PURCHASE",
] as const;
export type PromotionType = (typeof PROMOTION_TYPES)[number];
export type Promotion = InferSelectModel<typeof schema.promotions>;
export type PromotionUsage = InferSelectModel<typeof schema.promotionUsage>;

export type User = InferSelectModel<typeof schema.users>;
export type UserAddress = InferSelectModel<typeof schema.addresses>;
