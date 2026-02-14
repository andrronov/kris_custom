import { setCookie } from "hono/cookie";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schemas";
import { SESSION_COOKIE, CF_SESSION_EXP, getKVSessionKey } from "../config";

export async function handleUserSession(
  c: any,
  userData: { email: string; name: string },
) {
  try {
    let user = await db.query.users.findFirst({
      where: eq(users.email, userData.email),
    });
    if (!user) {
      const [newUser] = await db
        .insert(users)
        .values({ email: userData.email, name: userData.name })
        .returning();
      user = newUser;
    }

    const sessionId = crypto.randomUUID();
    const sessionData = JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    await c.env.KC_KV_SESSION.put(getKVSessionKey(sessionId), sessionData, {
      expirationTtl: CF_SESSION_EXP,
    });

    await c.env.KC_KV_AUTH.delete(userData.email);

    setCookie(c, SESSION_COOKIE, sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: CF_SESSION_EXP,
      path: "/",
    });

    return [user, null];
  } catch (error) {
    throw [null, error];
  }
}
