import { Hono } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schemas";
import { sendOtpMail } from "../services/mail-sender";
import { generateNumber, promiseResolver } from "../utils";
import {
  CF_AUTH_EXP,
  CF_SESSION_EXP,
  OTP_LENGTH,
  SESSION_COOKIE,
  getKVSessionKey,
} from "../config";

const auth = new Hono<{ Bindings: Env }>();

type AuthPayload = {
  otp: number;
  email: string;
  name: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

auth.post("/otp", async (c) => {
  try {
    const { email, name, resend } = await c.req.json<{
      email: string;
      name: string;
      resend: boolean;
    }>();
    if (!email || !EMAIL_REGEX.test(email)) {
      return c.json(
        {
          data: null,
          error: "email_invalid",
        },
        400,
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user && !name) {
      return c.json(
        {
          data: null,
          error: "username_required",
        },
        400,
      );
    }

    const existingUser = await c.env.KC_KV_AUTH.get(email);
    if (existingUser) {
      if (!resend)
        return c.json(
          {
            data: { message: "otp_already_sent", code: "otp" },
            error: null,
          },
          200,
        );
      else await c.env.KC_KV_AUTH.delete(email);
    }

    const generatedOtp = generateNumber(OTP_LENGTH);
    const payload: AuthPayload = {
      otp: generatedOtp,
      email,
      name: user?.name || name,
    };
    const authData = JSON.stringify(payload);

    await c.env.KC_KV_AUTH.put(email, authData, {
      expirationTtl: CF_AUTH_EXP,
    });
    const sentRes = await sendOtpMail(c, payload);

    if (sentRes.error) {
      return c.json(
        {
          data: null,
          error: "otp_send_failed",
        },
        500,
      );
    }

    return c.json(
      {
        data: { message: "OTP sent successfully" },
        error: null,
      },
      200,
    );
  } catch (error) {
    console.error("Error storing OTP:", error);
    return c.json(
      {
        data: null,
        error: "internal_server_error",
      },
      500,
    );
  }
});

auth.post("/verify", async (c) => {
  try {
    const { email, code } = await c.req.json<{ email: string; code: string }>();
    if (!email || !EMAIL_REGEX.test(email)) {
      return c.json(
        {
          data: null,
          error: "email_invalid",
        },
        400,
      );
    }

    const storedData = await c.env.KC_KV_AUTH.get(email);
    if (!storedData) {
      return c.json(
        {
          data: null,
          error: "otp_not_found",
        },
        404,
      );
    }

    const data: AuthPayload = JSON.parse(storedData);
    if (data.otp !== Number(code)) {
      return c.json({ data: null, error: "invalid_otp" }, 400);
    }

    let user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!user) {
      const [newUser] = await db
        .insert(users)
        .values({ email, name: data.name })
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

    await c.env.KC_KV_AUTH.delete(email);

    setCookie(c, SESSION_COOKIE, sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: CF_SESSION_EXP,
      path: "/",
    });

    return c.json(
      {
        data: {
          message: "Authenticated successfully",
          user: { id: user.id, name: user.name, email: user.email },
        },
        error: null,
      },
      200,
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return c.json({ data: null, error: "internal_server_error" }, 500);
  }
});

auth.post("/logout", async (c) => {
  const session = getCookie(c, SESSION_COOKIE);
  if (!session) {
    return;
  }
  const [response, error] = await promiseResolver(
    c.env.KC_KV_SESSION.delete(getKVSessionKey(session)),
  );
  deleteCookie(c, SESSION_COOKIE, {
    path: "/",
    secure: true,
    sameSite: "Lax",
  });

  return c.json({ data: response, error }, 200);
});

export default auth;
