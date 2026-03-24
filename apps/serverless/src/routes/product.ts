import { Hono } from "hono";
import { desc, eq, inArray } from "drizzle-orm";
import type { Product, ProductWithImages } from "@kris-customs/shared/types";
import { products, productImages } from "@kris-customs/shared/db";
import { promiseResolver } from "../utils";
import { db } from "../db";

const app = new Hono();

app.get("/all", async (c) => {
  try {
    const data = await db.select().from(products);
    return c.json(data);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

app.get("/popular", async (c) => {
  const limit = c.req.param("limit") ?? "6";

  try {
    const popularProducts = await db.query.products.findMany({
      limit: Number(limit),
      orderBy: [desc(products.viewCount)],
      with: {
        productImages: true,
      },
    });

    return c.json(
      { data: popularProducts as ProductWithImages[], error: null },
      200,
    );
  } catch (error) {
    return c.json({ data: null, error }, 500);
  }
});

app.post("/list-by-ids", async (c) => {
  const { ids } = await c.req.json<{ ids: string[] }>();

  if (!ids || ids.length === 0) {
    return c.json({ data: [] });
  }

  const [data, error] = await promiseResolver(
    db.query.products.findMany({
      where: inArray(products.id, ids),
      with: {
        productImages: true,
      },
    }),
  );

  if (error) {
    return c.json({ data: null, error }, 500);
  }

  return c.json({ data: data as ProductWithImages[], error: null }, 200);
});

app.get("/:slug", async (c) => {
  const { slug } = c.req.param();
  console.log(slug);

  try {
    const data = await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: {
        productImages: true,
      },
    });

    if (!data) {
      return c.json({ data: null, error: "Product not found" }, 404);
    }

    return c.json({ data: data as ProductWithImages, error: null }, 200);
  } catch (error) {
    return c.json({ data: null, error }, 500);
  }
});

export default app;
