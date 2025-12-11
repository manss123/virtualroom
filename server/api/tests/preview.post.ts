// server/api/tests/preview.post.ts
import { defineEventHandler, readBody, createError } from "h3";
import { evaluateTest, type TestAnswers } from "../../utils/evaluateTest";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ answers: TestAnswers } | null>(event);

  if (!body || !body.answers) {
    throw createError({
      statusCode: 400,
      statusMessage: "answers is required",
    });
  }

  // mode doesn't really matter for fuzzy, just pick "pre"
  const result = evaluateTest({
    mode: "pre",
    answers: body.answers,
  });

  // ไม่บันทึก DB แค่คืนผลลัพธ์ให้เอาไว้ดูเล่น / debug
  return result;
});
