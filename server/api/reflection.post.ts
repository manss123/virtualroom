import { defineEventHandler, getCookie, createError, readBody } from "h3";
import { adminAuth, adminDb } from "../utils/firebaseAdmin";
import { decodeJwtPayload } from "../utils/jwt";
import { FieldValue } from "firebase-admin/firestore";

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
  const body = await readBody<{ text?: string }>(event);

  const ref = adminDb
    .collection("students")
    .doc(uid)
    .collection("progress")
    .doc("gear-train");

  await ref.set(
    {
      reflection: {
        submitted: true,
        text: (body.text ?? "").trim(),
        submittedAt: FieldValue.serverTimestamp(),
      },
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  return { ok: true };
});
