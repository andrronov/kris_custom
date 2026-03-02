import "dotenv/config";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../src/db/schemas";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing environment variable: DATABASE_URL");
}

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

type CsvRow = {
  name_en: string;
  name_sp: string;
  description_en: string;
  description_sp: string;
  base_price: string;
  attributes: string;
  preview_image_key: string;
};

async function processCsv() {
  const results: CsvRow[] = [];
  const csvFilePath = path.join(process.cwd(), "./drizzle/products.csv");

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        console.log(
          `Found ${results.length} products in CSV. Seeding database...`,
        );

        for (const row of results) {
          try {
            let attributesObject = null;
            if (row.attributes) {
              try {
                attributesObject = JSON.parse(row.attributes);
              } catch (e) {
                console.warn(
                  `Invalid JSON in attributes for ${row.name_en}, setting to null.`,
                );
              }
            }

            await db.insert(schema.products).values({
              name: {
                en: row.name_en,
                sp: row.name_sp,
              },
              description: {
                en: row.description_en,
                sp: row.description_sp,
              },
              basePrice: row.base_price,
              previewImageKey: row.preview_image_key,
              attributes: attributesObject,
            });

            console.log(`✨ Successfully seeded product: ${row.name_en}`);
          } catch (err) {
            console.error(`❌ Failed to seed product: ${row.name_en}`, err);
          }
        }
        resolve();
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

async function main() {
  console.log("🌱 Starting database seed (data only)...");

  // console.log('Clearing products table...');
  // await db.delete(schema.products);

  await processCsv();
  console.log("✅ Seeding finished!");
}

main().catch((err) => {
  console.error("❌ Unhandled error during seeding:", err);
  process.exit(1);
});
