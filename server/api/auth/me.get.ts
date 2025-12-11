// server/api/auth/me.get.ts
import { defineEventHandler, getCookie, createError } from "h3";
import { adminAuth } from "../../utils/firebaseAdmin";
import { decodeJwtPayload } from "../../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "session");

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthenticated",
    });
  }

  try {
    let decoded: any;

    if (isProd) {
      // ✅ โปรดใช้ตรวจ token จริงบน production
      decoded = await adminAuth.verifyIdToken(token);
    } else {
      // 🧪 DEV + Emulator → decode แบบง่าย ๆ
      decoded = decodeJwtPayload(token);
    }

    return {
      uid: decoded.uid || decoded.user_id,
      email: decoded.email ?? null,
    };
  } catch (error) {
    console.error("[/api/auth/me] verify or decode failed:", error);
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthenticated",
    });
  }
});
