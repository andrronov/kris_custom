import { pgTable, foreignKey, uuid, numeric, timestamp, integer, varchar, jsonb, unique, text, boolean, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const orderStatus = pgEnum("order_status", ['pending_payment', 'paid', 'in_progress', 'shipped', 'delivered', 'cancelled'])
export const promotionType = pgEnum("promotion_type", ['PERCENTAGE', 'FIXED_AMOUNT', 'BUY_X_GET_Y', 'FIRST_PURCHASE'])


export const orders = pgTable("orders", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	status: orderStatus().default('pending_payment').notNull(),
	totalPrice: numeric("total_price", { precision: 10, scale:  2 }).notNull(),
	addressId: uuid("address_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "orders_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.addressId],
			foreignColumns: [addresses.id],
			name: "orders_address_id_addresses_id_fk"
		}),
]);

export const orderItems = pgTable("order_items", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	orderId: uuid("order_id").notNull(),
	variantId: uuid("variant_id").notNull(),
	quantity: integer().notNull(),
	priceAtPurchase: numeric("price_at_purchase", { precision: 10, scale:  2 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "order_items_order_id_orders_id_fk"
		}),
	foreignKey({
			columns: [table.variantId],
			foreignColumns: [productVariants.id],
			name: "order_items_variant_id_product_variants_id_fk"
		}),
]);

export const productVariants = pgTable("product_variants", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	productId: uuid("product_id").notNull(),
	name: varchar({ length: 255 }).notNull(),
	priceOffset: numeric("price_offset", { precision: 10, scale:  2 }).default('0').notNull(),
	stockQuantity: integer("stock_quantity").default(0).notNull(),
	attributes: jsonb(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "product_variants_product_id_products_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	passwordHash: text("password_hash").notNull(),
	firstName: varchar("first_name", { length: 255 }),
	lastName: varchar("last_name", { length: 255 }),
	birthDate: timestamp("birth_date", { mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const addresses = pgTable("addresses", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	street: varchar({ length: 255 }).notNull(),
	city: varchar({ length: 100 }).notNull(),
	postalCode: varchar("postal_code", { length: 20 }).notNull(),
	country: varchar({ length: 100 }).notNull(),
	isDefault: boolean("is_default").default(false),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "addresses_user_id_users_id_fk"
		}),
]);

export const products = pgTable("products", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: jsonb().notNull(),
	description: jsonb(),
	basePrice: numeric("base_price", { precision: 10, scale:  2 }).notNull(),
	attributes: jsonb(),
	viewCount: integer("view_count").default(0).notNull(),
	purchaseCount: integer("purchase_count").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export const collections = pgTable("collections", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: jsonb().notNull(),
	description: jsonb(),
});

export const promotions = pgTable("promotions", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	code: varchar({ length: 50 }),
	description: text(),
	type: promotionType().notNull(),
	value: numeric({ precision: 10, scale:  2 }),
	conditions: jsonb(),
	startDate: timestamp("start_date", { mode: 'string' }),
	endDate: timestamp("end_date", { mode: 'string' }),
	usageLimit: integer("usage_limit"),
}, (table) => [
	unique("promotions_code_unique").on(table.code),
]);

export const promotionUsage = pgTable("promotion_usage", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	promotionId: uuid("promotion_id").notNull(),
	userId: uuid("user_id").notNull(),
	orderId: uuid("order_id").notNull(),
	usedAt: timestamp("used_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.promotionId],
			foreignColumns: [promotions.id],
			name: "promotion_usage_promotion_id_promotions_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "promotion_usage_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.id],
			name: "promotion_usage_order_id_orders_id_fk"
		}),
]);

export const productCollections = pgTable("product_collections", {
	productId: uuid("product_id").notNull(),
	collectionId: uuid("collection_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.productId],
			foreignColumns: [products.id],
			name: "product_collections_product_id_products_id_fk"
		}),
	foreignKey({
			columns: [table.collectionId],
			foreignColumns: [collections.id],
			name: "product_collections_collection_id_collections_id_fk"
		}),
	primaryKey({ columns: [table.productId, table.collectionId], name: "product_collections_product_id_collection_id_pk"}),
]);
