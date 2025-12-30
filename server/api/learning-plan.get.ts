// server/api/learning-plan.get.ts
import { defineEventHandler, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../utils/firebaseAdmin";
import { decodeJwtPayload } from "../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "session");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  let decoded: any;
  try {
    decoded = isProd
      ? await adminAuth.verifyIdToken(token)
      : decodeJwtPayload(token);
  } catch (error) {
    console.error("[GET /api/learning-plan] verifyIdToken failed:", error);
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const uid = decoded.uid || decoded.user_id;

  const snap = await adminDb
    .collection("students")
    .doc(uid)
    .collection("plans")
    .doc("gear-train")
    .get();

  if (!snap.exists) {
    return { rooms: [] };
  }

  const data = snap.data() || {};
  return {
    rooms: data.rooms || [],
    updatedAt: data.updatedAt || null,
  };
});
