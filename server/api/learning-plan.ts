// server/api/learning-plan.post.ts
import { defineEventHandler, readBody, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../utils/firebaseAdmin";
import { decodeJwtPayload } from "../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

interface RoomPlan {
  key: string;
  label: string;
  startDate: string | null; // 'YYYY-MM-DD'
  endDate: string | null;
}

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
    console.error("[POST /api/learning-plan] verifyIdToken failed:", error);
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const uid = decoded.uid || decoded.user_id;

  const body = await readBody<{ rooms: RoomPlan[] } | null>(event);
  if (!body || !Array.isArray(body.rooms)) {
    throw createError({
      statusCode: 400,
      statusMessage: "rooms is required",
    });
  }

  await adminDb
    .collection("students")
    .doc(uid)
    .collection("plans")
    .doc("gear-train")
    .set({
      rooms: body.rooms,
      updatedAt: new Date(),
    });

  return { ok: true };
});
