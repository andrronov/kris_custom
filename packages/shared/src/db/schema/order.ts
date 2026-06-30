import {
  pgTable,
  timestamp,
  uuid,
  integer,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core";
import { ORDER_STATUSES } from "../../types";
import { users, addresses } from "./user";
import { productVariants } from "./product";

export const orderStatusEnum = pgEnum("order_status", ORDER_STATUSES);

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  status: orderStatusEnum("status").default("pending_payment").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  addressId: uuid("address_id")
    .references(() => addresses.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .references(() => orders.id)
    .notNull(),
  variantId: uuid("variant_id")
    .references(() => productVariants.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  priceAtPurchase: decimal("price_at_purchase", {
    precision: 10,
    scale: 2,
  }).notNull(),
});
