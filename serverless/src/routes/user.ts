import { Hono } from "hono";
import { db } from "../db";
import * as schema from "../db/schemas";
import { sendTestMail } from "../services/mail-sender";
import { generateNumber } from "../utils/generate";

const app = new Hono();

app.get("/all", async (c) => {
  try {
    const data = await db.select().from(schema.users);
    return c.json(data);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

// TODO: ДОДЕЛАЙ ФИЧУ С ОТПРАВКОЙ ПИСЬМА, ЕГО ВАЛИДАЦИЕЙ И ПРОВЕРКОЙ

app.post("/mail", async (c) => {
  try {
    const result = await sendTestMail(
      c,
      generateNumber(),
      "kristy.agalaryan@gmail.com",
    );
    return c.json(result);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

export default app;
