import { Hono } from "hono";
import { db } from "./db";
import { books } from "./db/schemas";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/books", async (c) => {
  try {
    const data = await db.select().from(books);
    return c.json(data);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

export default app;
