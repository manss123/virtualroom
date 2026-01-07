// server/api/auth/me.get.ts
import { defineEventHandler, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../../utils/firebaseAdmin";
import { decodeJwtPayload } from "../../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

export default defineEventHandler(async (event) => {
  const token = getCookie(event, "session");
  if (!token) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  try {
    let decoded: any;

    if (isProd) {
      decoded = await adminAuth.verifySessionCookie(token, true);
    } else {
      decoded = decodeJwtPayload(token);
    }

    const uid = decoded.uid || decoded.user_id;
    const email = decoded.email ?? null;

    const studentSnap = await adminDb.collection("students").doc(uid).get();
    const student = studentSnap.exists ? (studentSnap.data() as any) : null;

    return {
      uid,
      email,
      experimentGroup: student?.experimentGroup ?? null,
      classCode: student?.classCode ?? null,
      classGroupId: student?.classGroupId ?? null,
      classGroupName: student?.classGroupName ?? null,
      firstName: student?.firstName ?? null,
      lastName: student?.lastName ?? null,
    };
  } catch (err) {
    console.error("[/api/auth/me] verify failed:", err);
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }
});
