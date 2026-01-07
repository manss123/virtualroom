// server/api/progress.post.ts
import { defineEventHandler, readBody, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../utils/firebaseAdmin";
import { decodeJwtPayload } from "../utils/jwt";
import { FieldValue } from "firebase-admin/firestore";
import type { ProgressState } from "~/types/progress";

const isProd = process.env.NODE_ENV === "production";

interface ProgressBody {
  preTestDone?: boolean;
  postTestDone?: boolean;
  pdpaDone?: boolean;
  questionnaireDone?: boolean;
  planningDone?: boolean;

  completeRoomKey?: string;
  completeHotspotId?: string;
  roomKey?: string;

  quiz?: {
    quizId: string;
    roomKey: string;
    hotspotId?: string;

    passed: boolean;
    correct: number;
    total: number;

    answers: Record<string, string>;
  };
}


export default defineEventHandler(async (event) => {
  const token = getCookie(event, "session");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  let decoded: any;
  try {
    decoded = isProd
  ? await adminAuth.verifySessionCookie(token, true)
  : decodeJwtPayload(token);

  } catch (err) {
    console.error("[POST /api/progress] verifySessionCookie failed:", err);
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const uid = decoded.uid || decoded.user_id;
  const body = await readBody<ProgressBody>(event);

  const ref = adminDb
    .collection("students")
    .doc(uid)
    .collection("progress")
    .doc("gear-train");

  const update: any = {
    updatedAt: FieldValue.serverTimestamp(),
  };

  // --- simple flags ---
  if (typeof body.preTestDone === "boolean") {
    update.preTestDone = body.preTestDone;
  }
  if (typeof body.postTestDone === "boolean") {
    update.postTestDone = body.postTestDone;
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

    // --- quiz submission ---
    if (body.quiz?.quizId && body.quiz?.roomKey) {
    const snap = await ref.get();
    const data = (snap.data() || {}) as ProgressState;

    const attempt = {
      quizId: body.quiz.quizId,
      roomKey: body.quiz.roomKey,
      hotspotId: body.quiz.hotspotId ?? null,

      passed: body.quiz.passed,
      correct: body.quiz.correct,
      total: body.quiz.total,
      answers: body.quiz.answers || {},

      submittedAt: FieldValue.serverTimestamp(),
    };

    // ✅ write as a document (serverTimestamp is allowed here)
    await ref.collection("quizAttempts").add(attempt);

    // ✅ store last result in main progress doc (no serverTimestamp inside array)
    update.lastQuizResultByRoom = {
      ...(data.lastQuizResultByRoom || {}),
      [body.quiz.roomKey]: {
        ...attempt,
        // store a placeholder or omit; we can read submittedAt from subcollection
        submittedAt: new Date(), // or omit this field
      },
    };

    // ✅ room finished timestamp (allowed, not in array)
    if (body.quiz.passed) {
      const finishedMap = data.roomFinishedAt || {};
      if (!finishedMap[body.quiz.roomKey]) {
        update.roomFinishedAt = {
          ...finishedMap,
          [body.quiz.roomKey]: FieldValue.serverTimestamp(),
        };
      }
    }
  }

  await ref.set(update, { merge: true });

  return { ok: true };
});
