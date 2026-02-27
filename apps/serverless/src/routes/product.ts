import { Hono } from "hono";
import { db } from "../db";
import * as schema from "../db/schemas";

const app = new Hono();

app.get("/all", async (c) => {
  try {
    const data = await db.select().from(schema.products);
    return c.json(data);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

export default app;
