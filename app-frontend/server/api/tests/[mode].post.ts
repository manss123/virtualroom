// server/api/tests/[mode].post.ts
import { defineEventHandler, readBody, getCookie, createError } from "h3";
import { adminAuth, adminDb } from "../../utils/firebaseAdmin";
import { decodeJwtPayload } from "../../utils/jwt";
import { evaluateTest, type TestAnswers } from "../../utils/evaluateTest";

const isProd = process.env.NODE_ENV === "production";

export default defineEventHandler(async (event) => {
  // path param: /api/tests/pre or /api/tests/post
  const modeParam = event.context.params?.mode;
  const mode = (modeParam === "post" ? "post" : "pre") as "pre" | "post";

  // ---------- auth (same as your current code) ----------
  const token = getCookie(event, "session");
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthenticated",
    });
  }

  let decoded: any;
  try {
    if (isProd) {
      decoded = await adminAuth.verifyIdToken(token);
    } else {
      decoded = decodeJwtPayload(token);
    }
  } catch (error) {
    console.error("[POST /api/tests/[mode]] verifyIdToken failed:", error);
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthenticated",
    });
  }

  const uid = decoded.uid || decoded.user_id;

  // ---------- read body (NEW format) ----------
  const body = await readBody<{
    answers: TestAnswers;
    startedAt?: number;
    finishedAt?: number;
  }>(event);

  if (!body || !body.answers) {
    throw createError({
      statusCode: 400,
      statusMessage: "answers is required",
    });
  }

  // ---------- fuzzy logic + scoring on server ----------
  const result = evaluateTest({
    mode,
    answers: body.answers,
    startedAt: body.startedAt,
    finishedAt: body.finishedAt ?? Date.now(),
  });

  // result has:
  // {
  //   mode,
  //   totalScored,
  //   totalCorrect,
  //   percent,
  //   timeUsedSeconds,
  //   answers,
  //   details,
  //   itemCodesByQuestionId,
  //   flagsByQuestionId,
  //   conceptScores,
  //   fuzzyProfile
  // }

  // ---------- save to Firestore ----------
  await adminDb
    .collection("students")
    .doc(uid)
    .collection("tests")
    .doc(mode)
    .set({
      ...result, // includes details & fuzzy stuff
      createdAt: new Date(),
    });

  // You can return the full result if you want to show it immediately
  return {
    ok: true,
    result,
    learningPath: result.learningPath,
  };
});
