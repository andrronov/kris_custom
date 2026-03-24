import "dotenv/config";
import { isNotNull } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@kris-customs/shared/db";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing environment variable: DATABASE_URL");
}

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function seedProductImages() {
  const allProducts = await db
    .select({
      id: schema.products.id,
      previewImageKey: schema.products.previewImageKey,
      name: schema.products.name,
    })
    .from(schema.products)
    .where(isNotNull(schema.products.previewImageKey));

  if (allProducts.length === 0) {
    console.log("Images with previewImageKey not found.");
    return;
  }

  const imagesToInsert: (typeof schema.productImages.$inferInsert)[] = [];

  for (const product of allProducts) {
    const mainKey = product.previewImageKey!;

    const secondKey = mainKey.replace(/\.([^.]+)$/, "-1.$1");

    imagesToInsert.push({
      productId: product.id,
      imageKey: mainKey,
      displayOrder: 0,
      altText: product.name,
    });

    imagesToInsert.push({
      productId: product.id,
      imageKey: secondKey,
      displayOrder: 1,
      altText: product.name,
    });
  }

  try {
    await db.insert(schema.productImages).values(imagesToInsert);
    console.log(
      `Added ${imagesToInsert.length} images for ${allProducts.length} products successfully!`,
    );
  } catch (error) {
    console.error("Error while inserting images:", error);
  }
}

async function main() {
  console.log("Starting database seed (data only)...");
  await seedProductImages();
  console.log("Seeding finished!");
}

main().catch((err) => {
  console.error("❌ Unhandled error during seeding:", err);
  process.exit(1);
});
