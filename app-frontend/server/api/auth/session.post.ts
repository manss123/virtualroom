// server/api/auth/session.post.ts
import { defineEventHandler, readBody, setCookie, createError } from "h3";
import { Buffer } from "node:buffer";
import { adminAuth } from "../../utils/firebaseAdmin";

const isProd = process.env.NODE_ENV === "production";

// simple JWT payload decoder (no signature check)
function decodeJwtPayload(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid JWT format");
  }
  const payload = parts[1];
  const json = Buffer.from(payload, "base64").toString("utf8");
  return JSON.parse(json);
}

export default defineEventHandler(async (event) => {
  const { idToken } = await readBody<{ idToken?: string }>(event);

  if (!idToken) {
    throw createError({
      statusCode: 400,
      statusMessage: "idToken is required",
    });
  }

  try {
    let decoded: any;

    if (isProd) {
      // ✅ real project → verify signature with Admin SDK
      decoded = await adminAuth.verifyIdToken(idToken);
    } else {
      // 🧪 dev + emulator → just decode payload
      decoded = decodeJwtPayload(idToken);
    }

    const uid = decoded.uid || decoded.user_id;
    const email = decoded.email ?? null;

    // store token in cookie (simple session)
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    setCookie(event, "session", idToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
      path: "/",
      maxAge,
    });

    // you can also attach user to event.context if you want
    // (useful for server routes/middleware later)
    // @ts-expect-error adding custom field
    event.context.user = { uid, email };

    return {
      ok: true,
      uid,
      email,
    };
  } catch (error) {
    console.error("[/api/auth/session] token handling failed:", error);
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid or expired token",
    });
  }
});
