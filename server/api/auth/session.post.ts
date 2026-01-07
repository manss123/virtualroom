import { defineEventHandler, readBody, setCookie, createError } from "h3";
import { adminAuth } from "../../utils/firebaseAdmin";
import { decodeJwtPayload } from "../../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

export default defineEventHandler(async (event) => {
  const { idToken } = await readBody<{ idToken?: string }>(event);

  if (!idToken) {
    throw createError({ statusCode: 400, statusMessage: "idToken is required" });
  }

  try {
    let uid: string | null = null;
    let email: string | null = null;

    if (isProd) {
      // ✅ Verify ID token then mint a real session cookie
      const decoded = await adminAuth.verifyIdToken(idToken);
      uid = decoded.uid;
      email = decoded.email ?? null;

      const expiresIn = 7 * 24 * 60 * 60 * 1000; // 7 days (ms)
      const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

      setCookie(event, "session", sessionCookie, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: expiresIn / 1000,
      });
    } else {
      // 🧪 DEV: keep your simple flow (emulator)
      const decoded = decodeJwtPayload(idToken);
      uid = decoded.uid || decoded.user_id;
      email = decoded.email ?? null;

      setCookie(event, "session", idToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    // @ts-expect-error attach context
    event.context.user = { uid, email };

    return { ok: true, uid, email };
  } catch (error) {
    console.error("[/api/auth/session] token handling failed:", error);
    throw createError({ statusCode: 401, statusMessage: "Invalid or expired token" });
  }
});
