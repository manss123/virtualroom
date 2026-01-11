import { defineEventHandler, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../../../utils/firebaseAdmin";
import { decodeJwtPayload } from "../../../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

function tsToISO(v: any): string | null {
  if (!v) return null;
  if (typeof v?.toDate === "function") return v.toDate().toISOString();
  if (typeof v?._seconds === "number") return new Date(v._seconds * 1000).toISOString();
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

export default defineEventHandler(async (event) => {
  // ✅ (recommended) protect teacher routes
  const token = getCookie(event, "session");
  if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });

  try {
    if (isProd) await adminAuth.verifySessionCookie(token, true);
    else decodeJwtPayload(token);
  } catch {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const uid = event.context.params?.uid;
  if (!uid) throw createError({ statusCode: 400, statusMessage: "Missing uid" });

  const studentRef = adminDb.collection("students").doc(uid);
  const progressRef = studentRef.collection("progress").doc("gear-train");
  const planRef = studentRef.collection("plans").doc("gear-train");
  const srmPreRef = studentRef.collection("srm").doc("pre");

  const [studentSnap, progressSnap, planSnap, srmSnap] = await Promise.all([
    studentRef.get(),
    progressRef.get(),
    planRef.get(),
    srmPreRef.get(),
  ]);

  if (!studentSnap.exists) {
    throw createError({ statusCode: 404, statusMessage: "Student not found" });
  }

  const s = studentSnap.data() as any;
  const progress = (progressSnap.exists ? progressSnap.data() : {}) as any;
  const plan = (planSnap.exists ? planSnap.data() : {}) as any;
  const srmPre = (srmSnap.exists ? srmSnap.data() : null) as any | null;

  // normalize roomFinishedAt
  const roomFinishedAt: Record<string, string> = {};
  for (const [k, v] of Object.entries(progress?.roomFinishedAt || {})) {
    const iso = tsToISO(v);
    if (iso) roomFinishedAt[k] = iso;
  }

  // normalize plan rooms
  const rooms = Array.isArray(plan?.rooms) ? plan.rooms : [];
  const planRooms = rooms
    .map((r: any) => ({
      roomKey: r.roomKey ?? r.key ?? r.conceptId ?? r.room ?? null,
      startDate: tsToISO(r.startDate),
      endDate: tsToISO(r.endDate),
    }))
    .filter((r: any) => !!r.roomKey);

  return {
    profile: {
      uid,
      firstName: s.firstName ?? "",
      lastName: s.lastName ?? "",
      school: s.school ?? "",
      classCode: s.classCode ?? "",
      experimentGroup: s.experimentGroup ?? "",
      sex: s.sex ?? "",
      age: s.age ?? null,
    },
    progress: {
      completedRooms: progress?.completedRooms ?? [],
      lastQuizResultByRoom: progress?.lastQuizResultByRoom ?? {},
      quizAttemptsByRoom: progress?.quizAttemptsByRoom ?? {},
      roomFinishedAt,
    },
    srmPre,
    plan: { rooms: planRooms },
  };
});
