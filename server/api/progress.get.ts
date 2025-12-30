// server/api/progress.get.ts
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
  } catch (err) {
    console.error("[GET /api/progress] verifyIdToken failed:", err);
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const uid = decoded.uid || decoded.user_id;

  const ref = adminDb
    .collection("students")
    .doc(uid)
    .collection("progress")
    .doc("gear-train");

  const snap = await ref.get();
  if (!snap.exists) {
    // default empty progress
    return {
      preTestDone: false,
      pdpaDone: false,
      questionnaireDone: false,
      planningDone: false,
      completedRooms: [],
    };
  }

  return snap.data();
});
