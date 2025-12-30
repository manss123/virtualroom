// server/api/progress.post.ts
import { defineEventHandler, readBody, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../utils/firebaseAdmin";
import { decodeJwtPayload } from "../utils/jwt";
import { FieldValue } from "firebase-admin/firestore";
import type { ProgressState } from "~/types/progress";

const isProd = process.env.NODE_ENV === "production";

interface ProgressBody {
  preTestDone?: boolean;
  pdpaDone?: boolean;
  questionnaireDone?: boolean;
  planningDone?: boolean;
  completeRoomKey?: string;
  completeHotspotId?: string;
  roomKey?: string;
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
  } catch (err) {
    console.error("[POST /api/progress] verifyIdToken failed:", err);
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const uid = decoded.uid || decoded.user_id;
  const body = await readBody<ProgressBody>(event);

  const ref = adminDb
    .collection("students")
    .doc(uid)
    .collection("progress")
    .doc("gear-train");

  const update: Partial<ProgressState> & { updatedAt: Date } = {
    updatedAt: new Date(),
  };

  // --- simple flags ---
  if (typeof body.preTestDone === "boolean") {
    update.preTestDone = body.preTestDone;
  }
  if (typeof body.pdpaDone === "boolean") {
    update.pdpaDone = body.pdpaDone;
  }
  if (typeof body.questionnaireDone === "boolean") {
    update.questionnaireDone = body.questionnaireDone;
  }
  if (typeof body.planningDone === "boolean") {
    update.planningDone = body.planningDone;
  }

  // --- completed room (unlock next room) ---
  if (body.completeRoomKey) {
    // arrayUnion will create `completedRooms` if it doesn't exist yet
    (update as any).completedRooms = FieldValue.arrayUnion(body.completeRoomKey);
  }

  // --- completed hotspot inside a room ---
  if (body.completeHotspotId && body.roomKey) {
    const snap = await ref.get();
    const data = (snap.data() || {}) as ProgressState;

    const map = data.completedHotspotsByRoom || {};
    const list = new Set(map[body.roomKey] || []);
    list.add(body.completeHotspotId);

    map[body.roomKey] = Array.from(list);
    update.completedHotspotsByRoom = map;
  }

  await ref.set(update, { merge: true });

  return { ok: true };
});
