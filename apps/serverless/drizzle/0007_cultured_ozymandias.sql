ALTER TABLE "products" ADD COLUMN "slug" text; --> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_slug_unique" UNIQUE("slug");
