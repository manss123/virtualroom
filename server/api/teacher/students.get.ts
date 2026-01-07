import { defineEventHandler, createError } from "h3";
import { adminDb } from "../../utils/firebaseAdmin";

// (optional) add your own checkTeacher(event) here
export default defineEventHandler(async (event) => {
  // TODO: verify teacher session/role

  const snap = await adminDb.collection("students").orderBy("createdAt", "desc").get();

  const students = snap.docs.map((d) => {
    const s = d.data() as any;
    return {
      uid: d.id,
      firstName: s.firstName ?? "",
      lastName: s.lastName ?? "",
      sex: s.sex ?? "",
      age: s.age ?? null,
      school: s.school ?? "",
      classCode: s.classCode ?? "",
      experimentGroup: s.experimentGroup ?? "",
    };
  });

  return { students };
});
