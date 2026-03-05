import { users } from "@kris-customs/shared/db";
import { Hono } from "hono";
import { deleteCookie, getCookie } from "hono/cookie";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { sendOtpMail } from "../services/mail-sender";
import { handleUserSession } from "../services/auth-helper";
import { generateNumber, promiseResolver } from "../utils";
import { CF_AUTH_EXP, OTP_LENGTH, SESSION_COOKIE, getKVSessionKey, } from "../config";
const auth = new Hono();
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
auth.post("/otp", async (c) => {
    try {
        const { email, resend } = await c.req.json();
        if (!email || !EMAIL_REGEX.test(email)) {
            return c.json({
                data: null,
                error: "email_invalid",
            }, 400);
        }
        const dbUser = await db.query.users.findFirst({
            where: eq(users.email, email),
        });
        const existingUser = await c.env.KC_KV_AUTH.get(email);
        if (existingUser) {
            if (!resend)
                return c.json({
                    data: {
                        message: "otp_already_sent",
                        code: "otp",
                        user: dbUser || null,
                    },
                    error: null,
                }, 200);
            else
                await c.env.KC_KV_AUTH.delete(email);
        }
        const generatedOtp = generateNumber(OTP_LENGTH);
        const payload = {
            otp: generatedOtp,
            email,
        };
        const authData = JSON.stringify(payload);
        await c.env.KC_KV_AUTH.put(email, authData, {
            expirationTtl: CF_AUTH_EXP,
        });
        const sentRes = await sendOtpMail(c, payload);
        if (sentRes.error) {
            return c.json({
                data: null,
                error: "otp_send_failed",
            }, 500);
        }
        return c.json({
            data: { message: "OTP sent successfully", user: dbUser || null },
            error: null,
        }, 200);
    }
    catch (error) {
        console.error("Error storing OTP:", error);
        return c.json({
            data: null,
            error: "internal_server_error",
        }, 500);
    }
});
auth.post("/google", async (c) => {
    const { access_token } = await c.req.json();
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    const googleUser = await res.json();
    const [user, error] = await handleUserSession(c, {
        email: googleUser.email,
        name: googleUser.name,
    });
    if (error || !user) {
        return c.json({ data: null, error: error || "internal_server_error" }, 500);
    }
    return c.json({
        data: {
            message: "Authenticated successfully",
            user: { id: user.id, name: user.name, email: user.email },
        },
        error: null,
    }, 200);
});
auth.post("/verify", async (c) => {
    try {
        const { email, code, name } = await c.req.json();
        if (!email || !EMAIL_REGEX.test(email)) {
            return c.json({
                data: null,
                error: "email_invalid",
            }, 400);
        }
        const storedData = await c.env.KC_KV_AUTH.get(email);
        if (!storedData) {
            return c.json({
                data: null,
                error: "otp_not_found",
            }, 404);
        }
        const data = JSON.parse(storedData);
        if (data.otp !== Number(code)) {
            return c.json({ data: null, error: "invalid_otp" }, 400);
        }
        const [user, error] = await handleUserSession(c, { email, name });
        if (error || !user) {
            return c.json({ data: null, error: error || "internal_server_error" }, 500);
        }
        return c.json({
            data: {
                message: "Authenticated successfully",
                user: { id: user.id, name: user.name, email: user.email },
            },
            error: null,
        }, 200);
    }
    catch (error) {
        console.error("Error verifying OTP:", error);
        return c.json({ data: null, error: "internal_server_error" }, 500);
    }
});
auth.post("/logout", async (c) => {
    const session = getCookie(c, SESSION_COOKIE);
    if (!session) {
        return;
    }
    const [response, error] = await promiseResolver(c.env.KC_KV_SESSION.delete(getKVSessionKey(session)));
    deleteCookie(c, SESSION_COOKIE, {
        path: "/",
        secure: true,
        sameSite: "Lax",
    });
    return c.json({ data: response, error }, 200);
});
export default auth;
