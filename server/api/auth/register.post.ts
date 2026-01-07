// server/api/auth/register.post.ts
import { adminAuth, adminDb } from "../../utils/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";
import { defineEventHandler, readBody, createError } from "h3";

function httpError(statusCode: number, message: string, code: string) {
  return createError({ statusCode, statusMessage: message, data: { code } });
}

export default defineEventHandler(async (event) => {
  const body = await readBody<any>(event);

  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!email) throw httpError(400, "Email is required", "auth/invalid-email");
  if (!password || password.length < 6)
    throw httpError(400, "Weak password", "auth/weak-password");

  const classCode = String(body.classCode ?? "").trim();
  if (!classCode) throw httpError(400, "Class code is required", "classCode/invalid");

  // validate classCode
  const classRef = adminDb.collection("classGroups").doc(classCode);
  const classSnap = await classRef.get();
  if (!classSnap.exists) throw httpError(400, "Invalid class code", "classCode/invalid");

  const classData = classSnap.data() as any;
  if (!classData?.experimentGroup)
    throw httpError(400, "Class group missing experimentGroup", "classCode/misconfigured");

  let uid: string | null = null;

  try {
    const user = await adminAuth.createUser({
      email,
      password,
      displayName: `${body.firstName ?? ""} ${body.lastName ?? ""}`.trim(),
    });
    uid = user.uid;

    await adminDb.collection("students").doc(uid).set({
      firstName: body.firstName ?? "",
      lastName: body.lastName ?? "",
      sex: body.sex ?? "",
      age: Number(body.age ?? 0),
      grade: body.grade ?? "",
      school: body.school ?? "",
      pdpa: Boolean(body.pdpa),
      email,
      classCode,
      experimentGroup: classData.experimentGroup,
      classGroupId: classRef.id,
      classGroupName: classData.name ?? null,
      createdAt: FieldValue.serverTimestamp(),
    });

    return { ok: true, uid };
  } catch (e: any) {
    if (uid) {
      try { await adminAuth.deleteUser(uid); } catch {}
    }

    const code = String(e?.code ?? "");
    if (code.includes("email-already-exists"))
      // throw httpError(409, "Email already in use", "auth/email-already-in-use");
    return httpError(409, "Email already in use", "auth/email-already-in-use");
    if (code.includes("invalid-password"))
       return httpError(400, "Weak password", "auth/weak-password");
    if (code.includes("invalid-email"))
       return httpError(400, "Invalid email", "auth/invalid-email");

    console.error("[register] error:", e);
    // throw httpError(500, "Register failed", "register/failed");
    return httpError(500, "Register failed", "register/failed");

  }
});
