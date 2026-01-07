import { defineEventHandler, createError } from "h3";
import { adminDb } from "../../../utils/firebaseAdmin";

export default defineEventHandler(async (event) => {
  // TODO: verify teacher session/role
  const uid = event.context.params?.uid;
  if (!uid) throw createError({ statusCode: 400, statusMessage: "uid required" });

  // 1) student profile
  const studentRef = adminDb.collection("students").doc(uid);
  const studentSnap = await studentRef.get();
  if (!studentSnap.exists) throw createError({ statusCode: 404, statusMessage: "Student not found" });

  const student = studentSnap.data() as any;

  // 2) progress (if you store it by uid)
  const progressSnap = await adminDb.collection("progress").doc(uid).get();
  const progress = progressSnap.exists ? (progressSnap.data() as any) : null;

  // 3) example: quizzes (if you store under progress or another collection)
  // adjust to your real schema
  const quizSnap = await adminDb.collection("quizResults").doc(uid).get();
  const quizResults = quizSnap.exists ? (quizSnap.data() as any) : null;

  // 4) example: pre/post answers
  const preSnap = await adminDb.collection("tests").doc(uid).collection("pre").get();
  const preAnswers = preSnap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));

  return {
    uid,
    student: {
      firstName: student.firstName ?? "",
      lastName: student.lastName ?? "",
      sex: student.sex ?? "",
      age: student.age ?? null,
      school: student.school ?? "",
      classCode: student.classCode ?? "",
      experimentGroup: student.experimentGroup ?? "",
      classGroupName: student.classGroupName ?? null,
    },
    progress,
    quizResults,
    preAnswers,
  };
});
