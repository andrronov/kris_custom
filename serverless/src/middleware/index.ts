import { createMiddleware } from "hono/factory";
import { getCookie, setCookie } from "hono/cookie";
import {
  SESSION_COOKIE,
  CF_SESSION_EXP,
  CONTEXT_USER,
  getKVSessionKey,
} from "../config";
import type { SessionData } from "../types";

export const sessionMiddleware = createMiddleware(async (c, next) => {
  const session = getCookie(c, SESSION_COOKIE);
  if (!session) {
    return await next();
  }

  const sessionKey = getKVSessionKey(session);
  const sessionData = await c.env.KC_KV_SESSION.get(sessionKey);

  if (sessionData) {
    const userData = JSON.parse(sessionData) as SessionData;

    c.set(CONTEXT_USER, userData);
    c.executionCtx.waitUntil(
      c.env.KC_KV_SESSION.put(sessionKey, sessionData, {
        expirationTtl: CF_SESSION_EXP,
      }),
    );

    setCookie(c, SESSION_COOKIE, session, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: CF_SESSION_EXP,
      path: "/",
    });
  }

  await next();
});

export const requireAuth = createMiddleware(async (c, next) => {
  const user = c.get(CONTEXT_USER);

  if (!user) {
    return c.json(
      {
        data: null,
        error: {
          message: "Access denied. User not authenticated.",
          type: "access_denied",
        },
      },
      401,
    );
  }

  await next();
});
