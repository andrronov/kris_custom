import { Hono } from "hono";
import { db } from "./db";
import * as schema from "./db/schemas";

const app = new Hono<{
  Bindings: {
    KC_ASSETS: R2Bucket;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/users", async (c) => {
  try {
    const data = await db.select().from(schema.users);
    return c.json(data);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

app.get("/products", async (c) => {
  try {
    const data = await db.select().from(schema.products);
    return c.json(data);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

export default app;
