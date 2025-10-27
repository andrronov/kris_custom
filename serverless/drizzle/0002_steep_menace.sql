CREATE TABLE "product_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"product_id" uuid NOT NULL,
	"image_key" text NOT NULL,
	"display_order" integer DEFAULT 0 NOT NULL,
	"alt_text" jsonb
);
--> statement-breakpoint
ALTER TABLE "product_variants" ALTER COLUMN "name" SET DATA TYPE jsonb USING jsonb_build_object('en', name);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "preview_image_key" text;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;
