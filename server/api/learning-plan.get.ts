// server/api/learning-plan.get.ts
import { defineEventHandler, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../utils/firebaseAdmin";
import { decodeJwtPayload } from "../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

function tsToISO(v: any): string | null {
  if (!v) return null;
  if (typeof v?.toDate === "function") return v.toDate().toISOString();
  if (typeof v?._seconds === "number") return new Date(v._seconds * 1000).toISOString();
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
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
  } catch (error) {
    console.error("[GET /api/learning-plan] verifySessionCookie failed:", error);
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const uid = decoded.uid || decoded.user_id;

  const snap = await adminDb
    .collection("students")
    .doc(uid)
    .collection("plans")
    .doc("gear-train")
    .get();

  if (!snap.exists) return { rooms: [] };

  const data: any = snap.data() || {};
  const rooms = Array.isArray(data.rooms) ? data.rooms : [];

  // ✅ normalize start/end
  const normalizedRooms = rooms.map((r: any) => ({
    ...r,
    startDate: tsToISO(r.startDate),
    endDate: tsToISO(r.endDate),
    // tolerate naming
    roomKey: r.roomKey ?? r.key ?? r.conceptId ?? r.room ?? null,
  }));

  return {
    rooms: normalizedRooms,
    updatedAt: tsToISO(data.updatedAt),
  };
});
