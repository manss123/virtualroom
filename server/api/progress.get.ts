// server/api/progress.get.ts
import { defineEventHandler, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../utils/firebaseAdmin";
import { decodeJwtPayload } from "../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

function tsToISO(v: any): string | null {
  if (!v) return null;

  // Firestore Timestamp object from admin sdk
  if (typeof v?.toDate === "function") return v.toDate().toISOString();

  // If it was serialized to {_seconds,_nanoseconds}
  if (typeof v?._seconds === "number") {
    return new Date(v._seconds * 1000).toISOString();
  }

  // already string/date
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "session");
  if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });

  let decoded: any;
  try {
    decoded = isProd
  ? await adminAuth.verifySessionCookie(token, true)
  : decodeJwtPayload(token);

  } catch {
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
    return {
      preTestDone: false,
      postTestDone: false,
      pdpaDone: false,
      questionnaireDone: false,
      planningDone: false,
      completedRooms: [],
      completedHotspotsByRoom: {},
      roomFinishedAt: {},
      quizAttemptsByRoom: {},
      lastQuizResultByRoom: {},
      reflection: { submitted: false },
    };
  }

  const data: any = snap.data() || {};

  // ✅ normalize roomFinishedAt -> ISO strings
  const raw = data.roomFinishedAt || {};
  const normalized: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    const iso = tsToISO(v);
    if (iso) normalized[k] = iso;
  }
  data.roomFinishedAt = normalized;

  return data;
});
