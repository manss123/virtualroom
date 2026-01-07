import { defineEventHandler, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../utils/firebaseAdmin";
import { decodeJwtPayload } from "../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

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
  const data = snap.exists ? snap.data() : {};

  return { reflection: data?.reflection ?? { submitted: false } };
});
