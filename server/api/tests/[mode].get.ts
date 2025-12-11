// server/api/tests/[mode].get.ts
import { defineEventHandler, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../../utils/firebaseAdmin";
import { decodeJwtPayload } from "../../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

export default defineEventHandler(async (event) => {
  const modeParam = event.context.params?.mode;
  const mode = (modeParam === "post" ? "post" : "pre") as "pre" | "post";

  const token = getCookie(event, "session");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  let decoded: any;
  try {
    if (isProd) {
      decoded = await adminAuth.verifyIdToken(token);
    } else {
      decoded = decodeJwtPayload(token);
    }
  } catch (error) {
    console.error("[GET /api/tests/[mode]] verifyIdToken failed:", error);
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const uid = decoded.uid || decoded.user_id;

  const snap = await adminDb
    .collection("students")
    .doc(uid)
    .collection("tests")
    .doc(mode)
    .get();

  if (!snap.exists) {
    throw createError({
      statusCode: 404,
      statusMessage: "Test result not found",
    });
  }

  const data = snap.data();

  // คืนทุกอย่างที่ evaluateTest เซฟไว้ (รวม fuzzyProfile + learningPath)
  return {
    ok: true,
    result: data,
    learningPath: data.learningPath ?? [],
  };
});
