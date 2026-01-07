// server/api/auth/profile.post.ts
import { defineEventHandler, readBody, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../../utils/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { decodeJwtPayload } from "../../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

function httpError(statusCode: number, message: string, code: string) {
  return createError({ statusCode, statusMessage: message, data: { code } });
}

async function getUidAndEmailFromSession(event: any) {
  const token = getCookie(event, "session");
  if (!token) throw httpError(401, "Unauthenticated", "auth/unauthenticated");

  if (isProd) {
    const decoded = await adminAuth.verifySessionCookie(token, true);
    return { uid: decoded.uid, email: decoded.email ?? null };
  } else {
    const decoded = decodeJwtPayload(token);
    return {
      uid: decoded.uid || decoded.user_id,
      email: decoded.email ?? null,
    };
  }
}

export default defineEventHandler(async (event) => {
  const { uid, email } = await getUidAndEmailFromSession(event);
  if (!uid) throw httpError(401, "Unauthenticated", "auth/unauthenticated");

  const body = await readBody<any>(event);

  const classCode = String(body.classCode ?? "").trim();
  if (!classCode) throw httpError(400, "Class code is required", "classCode/invalid");

  // validate classCode
  const classRef = adminDb.collection("classGroups").doc(classCode);
  const classSnap = await classRef.get();
  if (!classSnap.exists) throw httpError(400, "Invalid class code", "classCode/invalid");

  const classData = classSnap.data() as any;
  if (!classData?.experimentGroup) {
    throw httpError(400, "Class group missing experimentGroup", "classCode/misconfigured");
  }

  // Check existing student doc to enforce immutable classCode
  const studentRef = adminDb.collection("students").doc(uid);
  const studentSnap = await studentRef.get();

  if (studentSnap.exists) {
    const existing = studentSnap.data() as any;
    if (existing?.classCode && existing.classCode !== classCode) {
      throw httpError(400, "Class code immutable", "classCode/immutable");
    }
  }

  await studentRef.set(
    {
      firstName: body.firstName ?? "",
      lastName: body.lastName ?? "",
      sex: body.sex ?? "",
      age: Number(body.age ?? 0),
      grade: body.grade ?? "",
      school: body.school ?? "",
      pdpa: Boolean(body.pdpa),

      email: email ?? null,

      // only set class info (same value if already exists)
      classCode,
      experimentGroup: classData.experimentGroup,
      classGroupId: classRef.id,
      classGroupName: classData.name ?? null,

      // timestamps
      updatedAt: FieldValue.serverTimestamp(),
      ...(studentSnap.exists ? {} : { createdAt: FieldValue.serverTimestamp() }),
    },
    { merge: true }
  );

  return { ok: true, uid };
});
