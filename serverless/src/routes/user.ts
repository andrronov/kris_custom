import { Hono } from "hono";
import { db } from "../db";
import * as schema from "../db/schemas";
import { CONTEXT_USER } from "../config";
import { requireAuth } from "../middleware";
import { promiseResolver } from "../utils";
import type { SessionData } from "../types";
import { eq } from "drizzle-orm";

type User = typeof CONTEXT_USER;
const app = new Hono<{ Bindings: Env; Variables: Record<User, SessionData> }>();

const getStorageKey = (user: SessionData, category: string) =>
  `u:${user.id}:${category}`;

app.get("/all", requireAuth, async (c) => {
  try {
    const [data, error] = await promiseResolver(db.select().from(schema.users));
    return c.json({ data, error });
  } catch (error) {
    return c.json([null, { error }, 500]);
  }
});

<<<<<<< HEAD
app.get("/profile", async (c) => {
  const ctxUser = c.get(CONTEXT_USER);
  const [user, error] = await promiseResolver(
    db.select().from(schema.users).where(eq(schema.users.id, ctxUser.id)),
  );
  if (error) {
    console.log(error);
    return c.json({ data: null, error }, 500);
=======
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
>>>>>>> 28bc6647b64e095069a79508175e5be856fc97ef
  }

  return c.json({ data: user, error: null }, 200);
});

app.get("/storage/:category/:key?", requireAuth, async (c) => {
  const user = c.get(CONTEXT_USER);
  const { category, key } = c.req.param();

  const storageKey = getStorageKey(user, category);
  const [data] = await promiseResolver(c.env.KC_KV.get(storageKey));
  if (!data) {
    return c.json({ data: key ? null : {}, error: null }, 200);
  }

  try {
    const parsed = JSON.parse(data);
    return c.json(
      {
        data: key ? (parsed[key] ?? null) : parsed,
        error: null,
      },
      200,
    );
  } catch (e) {
    return c.json({ data: null, error: "Data corruption" }, 500);
  }
});

app.put("/storage/:category/:key?", requireAuth, async (c) => {
  const user = c.get(CONTEXT_USER);
  const { category, key } = c.req.param();
  const { data: newValue } = await c.req.json();
  const storageKey = getStorageKey(user, category);

  let finalValue: any;
  finalValue = newValue;

  if (key) {
    const [kvRaw] = await promiseResolver(c.env.KC_KV.get(storageKey));
    let kvData = {};
    try {
      kvData = kvRaw ? JSON.parse(kvRaw) : {};
    } catch {}

    (kvData as any)[key] = newValue;
    finalValue = kvData;
  }

  c.executionCtx.waitUntil(
    c.env.KC_KV.put(storageKey, JSON.stringify(finalValue)),
  );
  return c.json({ data: "OK", error: null });
});

export default app;
