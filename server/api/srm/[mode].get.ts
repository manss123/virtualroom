import { defineEventHandler, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../../utils/firebaseAdmin";
import { decodeJwtPayload } from "../../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

export default defineEventHandler(async (event) => {
  const mode = event.context.params?.mode || "pre"; // 'pre' | 'post'

  const token = getCookie(event, "session");
  if (!token) throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });

  let decoded: any;
  try {
    if (isProd) {
      // NOTE: In prod you are using session cookies elsewhere.
      // If your cookie is a session cookie, use verifySessionCookie instead.
      decoded = await adminAuth.verifySessionCookie(token, true);
    } else {
      decoded = decodeJwtPayload(token);
    }
  } catch (e) {
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }

  const uid = decoded.uid || decoded.user_id;

  const snap = await adminDb
    .collection("students")
    .doc(uid)
    .collection("srm")
    .doc(mode)
    .get();

  if (!snap.exists) return { ok: true, result: null };

  return { ok: true, result: snap.data() };
});
