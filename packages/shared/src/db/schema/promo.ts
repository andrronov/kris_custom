import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  decimal,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./user";
import { orders } from "./order";
import { PROMOTION_TYPES } from "../../types";

export const promotionTypeEnum = pgEnum("promotion_type", PROMOTION_TYPES);

export const promotions = pgTable("promotions", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: varchar("code", { length: 50 }).unique(),
  description: text("description"),
  type: promotionTypeEnum("type").notNull(),
  value: decimal("value", { precision: 10, scale: 2 }),
  conditions: jsonb("conditions"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  usageLimit: integer("usage_limit"),
});

export const promotionUsage = pgTable("promotion_usage", {
  id: uuid("id").defaultRandom().primaryKey(),
  promotionId: uuid("promotion_id")
    .references(() => promotions.id)
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  orderId: uuid("order_id")
    .references(() => orders.id)
    .notNull(),
  usedAt: timestamp("used_at").defaultNow().notNull(),
});
