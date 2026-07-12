import type { InferSelectModel } from "drizzle-orm";
import * as schema from "../db";
import {
  ORDER_STATUSES,
  PRODUCT_COLORS,
  PRODUCT_FINISHES,
  PRODUCT_LENGTHS,
  PRODUCT_SHAPES,
  PRODUCT_SIZES,
  PRODUCT_STYLES,
  PROMOTION_TYPES,
  SUPPORTED_LANGUAGES,
} from "../config";

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

export type ProductSize = (typeof PRODUCT_SIZES)[number];
export type ProductShape = (typeof PRODUCT_SHAPES)[number];
export type ProductLength = (typeof PRODUCT_LENGTHS)[number];
export type ProductVariantAttributes = {
  size: ProductSize;
  shape: ProductShape;
  length: ProductLength;
};

export type ProductColor = (typeof PRODUCT_COLORS)[number];
export type ProductFinish = (typeof PRODUCT_FINISHES)[number];
export type ProductStyle = (typeof PRODUCT_STYLES)[number];
export type ProductAttributes = {
  colors?: ProductColor[];
  finish?: ProductFinish[];
  styles?: ProductStyle[];
};

export type OrderStatus = (typeof ORDER_STATUSES)[number];
export type Order = InferSelectModel<typeof schema.orders>;
export type OrderItem = InferSelectModel<typeof schema.orderItems>;

export type PromotionType = (typeof PROMOTION_TYPES)[number];
export type Promotion = InferSelectModel<typeof schema.promotions>;
export type PromotionUsage = InferSelectModel<typeof schema.promotionUsage>;

export type User = InferSelectModel<typeof schema.users>;
export type UserAddress = InferSelectModel<typeof schema.addresses>;
