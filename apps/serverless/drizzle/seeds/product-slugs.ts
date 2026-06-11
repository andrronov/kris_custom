import "dotenv/config";
import { isNotNull, eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@kris-customs/shared/db";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing environment variable: DATABASE_URL");
}

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

async function seedProductSlugs() {
  const allProducts = await db
    .select({
      id: schema.products.id,
      name: schema.products.name,
    })
    .from(schema.products)
    .where(isNotNull(schema.products.name));

  if (allProducts.length === 0) {
    console.log("Products with name not found.");
    return;
  }

  console.log(`${allProducts.length} products found. Starting update...`);
  let updatedCount = 0;

  for (const product of allProducts) {
    const rawName = product.name.en;
    const generatedSlug = slugify(rawName);

    try {
      await db
        .update(schema.products)
        .set({ slug: generatedSlug })
        .where(eq(schema.products.id, product.id));

      updatedCount++;
    } catch (error) {
      console.error(`Error updating slug for ${product.id}:`, error);
    }
  }

  console.log(`Successfully generated slugs for ${updatedCount} products!`);
}

async function main() {
  console.log("Starting database seed (slugs only)...");
  await seedProductSlugs();
  console.log("Seeding finished!");
}

main().catch((err) => {
  console.error("❌ Unhandled error during seeding:", err);
  process.exit(1);
});
