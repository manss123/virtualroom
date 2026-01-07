// server/api/srm/[mode].post.ts
import { defineEventHandler, readBody, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../../utils/firebaseAdmin";
import { decodeJwtPayload } from "../../utils/jwt";

const isProd = process.env.NODE_ENV === "production";

interface SrmScoreSummary {
  sum: number;
  count: number;
  average: number;
}

export default defineEventHandler(async (event) => {
  const mode = event.context.params?.mode || "pre"; // 'pre' | 'post' (ไว้รองรับอนาคต)

  const token = getCookie(event, "session");
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthenticated",
    });
  }

  let decoded: any;
  try {
    decoded = isProd
      ? await adminAuth.verifySessionCookie(token, true)
      : decodeJwtPayload(token);
  } catch (error) {
    console.error("[POST /api/srm/[mode]] verifySessionCookie failed:", error);
    throw createError({ statusCode: 401, statusMessage: "Unauthenticated" });
  }


  const uid = decoded.uid || decoded.user_id;

  const body = await readBody<{
    mode: string;
    timeUsedSeconds: number;
    totalItems: number;
    answeredItems: number;
    averageScore: number;
    answers: Record<string, number>;
    sectionScores: Record<string, SrmScoreSummary>;
    categoryScores: Record<string, SrmScoreSummary>;
  }>(event);

  await adminDb
    .collection("students")
    .doc(uid)
    .collection("srm")
    .doc(mode)
    .set({
      mode: body.mode,
      timeUsedSeconds: body.timeUsedSeconds,
      totalItems: body.totalItems,
      answeredItems: body.answeredItems,
      averageScore: body.averageScore,
      answers: body.answers,
      sectionScores: body.sectionScores,
      categoryScores: body.categoryScores,
      createdAt: new Date(),
    });

  return { ok: true };
});
