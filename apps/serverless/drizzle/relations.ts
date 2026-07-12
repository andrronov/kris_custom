import { relations } from "drizzle-orm/relations";
import {
  users,
  orders,
  addresses,
  orderItems,
  productVariants,
  products,
  productImages,
  promotions,
  promotionUsage,
} from "@kris-customs/shared/db";

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  address: one(addresses, {
    fields: [orders.addressId],
    references: [addresses.id],
  }),
  orderItems: many(orderItems),
  promotionUsages: many(promotionUsage),
}));

export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  addresses: many(addresses),
  promotionUsages: many(promotionUsage),
}));

export const addressesRelations = relations(addresses, ({ one, many }) => ({
  orders: many(orders),
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  productVariant: one(productVariants, {
    fields: [orderItems.variantId],
    references: [productVariants.id],
  }),
}));

export const productVariantsRelations = relations(
  productVariants,
  ({ one, many }) => ({
    orderItems: many(orderItems),
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),
  }),
);

export const productsRelations = relations(products, ({ many }) => ({
  productVariants: many(productVariants),
  productImages: many(productImages),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const promotionUsageRelations = relations(promotionUsage, ({ one }) => ({
  promotion: one(promotions, {
    fields: [promotionUsage.promotionId],
    references: [promotions.id],
  }),
  user: one(users, {
    fields: [promotionUsage.userId],
    references: [users.id],
  }),
  order: one(orders, {
    fields: [promotionUsage.orderId],
    references: [orders.id],
  }),
}));

export const promotionsRelations = relations(promotions, ({ many }) => ({
  promotionUsages: many(promotionUsage),
}));
