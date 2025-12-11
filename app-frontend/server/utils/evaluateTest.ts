// server/utils/evaluateTest.ts
import { questions } from "@/config/testConfig";
import { prePostTestAnswerKey } from "@/config/testAnswerKey";

const CODE_SCORE: Record<string, number> = {
  SC: 7,
  LK1: 6,
  FP: 5,
  LK2: 4,
  FN: 3,
  LK3: 2,
  MSC: 1,
  LK4: 0,
};

function classifyFromFlags(D: number, E: number, F: number, G: number): string {
  if (D === 1 && E === 1 && F === 1 && G === 1) return "SC";

  if (D === 1 && E === 1 && F === 1 && G === 0) return "LK1";
  if (D === 1 && E === 0 && F === 1 && G === 1) return "LK1";
  if (D === 1 && E === 0 && F === 1 && G === 0) return "LK1";

  if (D === 1 && E === 1 && F === 0 && G === 1) return "FP";

  if (D === 1 && E === 1 && F === 0 && G === 0) return "LK2";
  if (D === 1 && E === 0 && F === 0 && G === 1) return "LK2";
  if (D === 1 && E === 0 && F === 0 && G === 0) return "LK2";

  if (D === 0 && E === 1 && F === 1 && G === 1) return "FN";

  if (D === 0 && E === 1 && F === 1 && G === 0) return "LK3";
  if (D === 0 && E === 0 && F === 1 && G === 1) return "LK3";
  if (D === 0 && E === 0 && F === 1 && G === 0) return "LK3";

  if (D === 0 && E === 1 && F === 0 && G === 1) return "MSC";

  return "LK4";
}

// ====== flags per QUESTION j (use 1.1 / 1.2 / 1.3 / 1.4 pattern) ======
function computeFlagsForQuestion(
  question: any,
  qAnswers: Record<string, string>
) {
  const baseId = String(question.id); // e.g. 1
  const id1 = `${baseId}.1`; // 1.1
  const id2 = `${baseId}.2`; // 1.2 (confidence)
  const id3 = `${baseId}.3`; // 1.3
  const id4 = `${baseId}.4`; // 1.4 (confidence)

  const ans1 = qAnswers[id1];
  const ans3 = qAnswers[id3];
  const conf1 = qAnswers[id2];
  const conf3 = qAnswers[id4];

  const correct1 = prePostTestAnswerKey[id1];
  const correct3 = prePostTestAnswerKey[id3];

  const D = correct1 ? (ans1 === correct1 ? 1 : 0) : 0;
  const E = correct3 ? (ans3 === correct3 ? 1 : 0) : 0;

  const F = conf1 === "confident" ? 1 : 0;
  const G = conf3 === "confident" ? 1 : 0;

  return { D, E, F, G };
}

// ====== Concept mapping (by QUESTION j, from your Excel) ======
const CONCEPT_CONFIG: Record<string, number[]> = {
  C1: [1, 2, 4, 5, 6, 7], // Idler gear
  C2: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], // Variable Ratio
  C3: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17], // Simple gear train
  C4: [3, 13, 14, 16], // Compound gear train
};

const FUZZY_PARAMS = {
  alpha: 0,
  beta: 3.5,
  gamma: 7,
};

function lowMembership(x: number, p = FUZZY_PARAMS) {
  const { alpha, beta, gamma } = p;
  if (x <= alpha) return 1;
  if (x <= beta) return 1 - 2 * Math.pow((x - alpha) / (gamma - alpha), 2);
  if (x <= gamma) return 2 * Math.pow((x - gamma) / (gamma - alpha), 2);
  return 0;
}

function averageMembership(x: number, p = FUZZY_PARAMS) {
  const { alpha, beta, gamma } = p;
  const mid1 = (alpha + beta) / 2;
  const mid2 = (beta + gamma) / 2;

  if (x <= alpha) return 0;
  if (x <= mid1) return 2 * Math.pow((x - alpha) / (beta - alpha), 2);
  if (x <= beta) return 1 - 2 * Math.pow((x - beta) / (beta - alpha), 2);
  if (x <= mid2) return 1 - 2 * Math.pow((x - beta) / (gamma - beta), 2);
  if (x <= gamma) return 2 * Math.pow((x - gamma) / (gamma - beta), 2);
  return 0;
}

function highMembership(x: number, p = FUZZY_PARAMS) {
  const { alpha, beta, gamma } = p;
  if (x <= alpha) return 0;
  if (x <= beta) return 2 * Math.pow((x - alpha) / (gamma - alpha), 2);
  if (x <= gamma) return 1 - 2 * Math.pow((x - gamma) / (gamma - alpha), 2);
  return 1;
}

function computeConceptScores(questionScores: Record<string | number, number>) {
  const conceptScores: Record<string, number> = {};

  for (const [conceptId, questionIds] of Object.entries(CONCEPT_CONFIG)) {
    let sum = 0;
    let count = 0;

    for (const qId of questionIds) {
      const s = questionScores[qId];
      if (typeof s === "number") {
        sum += s;
        count += 1;
      }
    }
    conceptScores[conceptId] = count > 0 ? sum / count : 0;
  }
  return conceptScores;
}

function computeFuzzyProfile(conceptScores: Record<string, number>) {
  const profile: any = {};

  for (const [conceptId, score] of Object.entries(conceptScores)) {
    const low = lowMembership(score);
    const avg = averageMembership(score);
    const high = highMembership(score);

    const max = Math.max(low, avg, high);
    let label: "LOW" | "AVERAGE" | "HIGH" = "LOW";
    if (max === high) label = "HIGH";
    else if (max === avg) label = "AVERAGE";

    profile[conceptId] = { score, low, avg, high, label };
  }

  return profile;
}

export type LearningAction = "EXTRA" | "REVIEW" | "SKIP";

export interface LearningPathItem {
  conceptId: string; // "C1" | "C2" | ...
  fuzzyLabel: "LOW" | "AVERAGE" | "HIGH";
  action: LearningAction; // what to do in learning path
}

function buildLearningPath(
  fuzzyProfile: Record<
    string,
    {
      score: number;
      low: number;
      avg: number;
      high: number;
      label: "LOW" | "AVERAGE" | "HIGH";
    }
  >
): LearningPathItem[] {
  const path: LearningPathItem[] = [];

  for (const [conceptId, info] of Object.entries(fuzzyProfile)) {
    if (info.label === "LOW") {
      path.push({
        conceptId,
        fuzzyLabel: "LOW",
        action: "EXTRA",
      });
    } else if (info.label === "AVERAGE") {
      path.push({
        conceptId,
        fuzzyLabel: "AVERAGE",
        action: "REVIEW",
      });
    }
    // HIGH → no push (skip in learning path)
  }

  // optional: keep concepts in stable order
  path.sort((a, b) => a.conceptId.localeCompare(b.conceptId));

  return path;
}

export interface TestAnswers {
  [questionId: string]: {
    [sectionId: string]: string;
  };
}

export interface EvaluateParams {
  mode: "pre" | "post";
  answers: TestAnswers;
  startedAt?: number;
  finishedAt?: number;
}

export function evaluateTest(params: EvaluateParams) {
  const { mode, answers, startedAt, finishedAt } = params;

  let totalScored = 0;
  let totalCorrect = 0;
  const details: any[] = [];

  const itemScoresByQuestionId: Record<string | number, number> = {};
  const itemCodesByQuestionId: Record<string | number, string> = {};
  const flagsByQuestionId: Record<
    string | number,
    { D: number; E: number; F: number; G: number }
  > = {};

  for (const q of questions) {
    const qAnswers = answers[q.id] || {};

    // ---- question-level D,E,F,G + tier code ----
    const flags = computeFlagsForQuestion(q, qAnswers);
    const { D, E, F, G } = flags;
    const code = classifyFromFlags(D, E, F, G);
    const score = CODE_SCORE[code];

    flagsByQuestionId[q.id] = flags;
    itemCodesByQuestionId[q.id] = code;
    itemScoresByQuestionId[q.id] = score;

    // ---- per-section detail rows ----
    for (const sec of q.sections) {
      const secId = sec.id; // '1.1', '1.2', ...
      const correct = prePostTestAnswerKey[secId];
      const studentAnswer = qAnswers[secId] ?? null;

      const isScoredItem = correct !== undefined && correct !== null;
      let isCorrect = false;
      let sectionFlags = null;
      let sectionCode: string | null = null;
      let sectionScore: number | null = null;

      if (isScoredItem) {
        totalScored += 1;
        isCorrect = studentAnswer === correct;
        if (isCorrect) totalCorrect += 1;

        sectionFlags = flags;
        sectionCode = code;
        sectionScore = score;
      }

      details.push({
        questionId: q.id,
        mainNumber: q.mainNumber,
        sectionId: secId,
        type: sec.type,
        studentAnswer,
        correctAnswer: isScoredItem ? correct : null,
        isCorrect,
        patternFlags: sectionFlags,
        code: sectionCode,
        score: sectionScore,
      });
    }
  }

  const percent =
    totalScored > 0 ? Math.round((totalCorrect / totalScored) * 100) : 0;

  let timeUsedSeconds = 0;
  if (startedAt && finishedAt) {
    timeUsedSeconds = Math.max(0, Math.floor((finishedAt - startedAt) / 1000));
  }

  const conceptScores = computeConceptScores(itemScoresByQuestionId);
  const fuzzyProfile = computeFuzzyProfile(conceptScores);

  const learningPath = buildLearningPath(fuzzyProfile);

  return {
    mode,
    totalScored,
    totalCorrect,
    percent,
    timeUsedSeconds,
    answers,
    details,
    itemCodesByQuestionId,
    itemScoresByQuestionId,
    flagsByQuestionId,
    conceptScores,
    fuzzyProfile,
    learningPath,
  };
}
