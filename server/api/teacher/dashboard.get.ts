// server/api/teacher/dashboard.get.ts
import { defineEventHandler } from "h3";
import { adminDb } from "../../utils/firebaseAdmin";

function dayStart(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}
function dayEnd(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

type PlanStatus = "BEFORE" | "IN_TIME" | "LATE" | "NOT_FINISHED" | "NO_PLAN";

function getRoomPlanStatus(planStartISO?: string | null, planEndISO?: string | null, finishedISO?: string | null): PlanStatus {
  if (!planStartISO || !planEndISO) return "NO_PLAN";
  if (!finishedISO) return "NOT_FINISHED";

  const start = dayStart(new Date(planStartISO));
  const end = dayEnd(new Date(planEndISO));
  const finished = new Date(finishedISO);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || Number.isNaN(finished.getTime())) {
    return "NOT_FINISHED";
  }

  if (finished < start) return "BEFORE";
  if (finished >= start && finished <= end) return "IN_TIME";
  return "LATE";
}

function statusThai(st: PlanStatus) {
  if (st === "BEFORE") return "ก่อนกำหนด";
  if (st === "IN_TIME") return "ภายในกำหนด";
  if (st === "LATE") return "เกินกำหนด";
  if (st === "NOT_FINISHED") return "อยู่ระหว่างเรียน";
  return "N/A";
}

function tsToISO(v: any): string | null {
  if (!v) return null;
  if (typeof v?.toDate === "function") return v.toDate().toISOString();
  if (typeof v?._seconds === "number") return new Date(v._seconds * 1000).toISOString();
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function fmtThaiShort(iso?: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "2-digit" });
}


function pickFirstMap(obj: any, keys: string[]): Record<string, any> | null {
  for (const k of keys) {
    const v = obj?.[k];
    if (v && typeof v === "object" && !Array.isArray(v)) return v as Record<string, any>;
  }
  return null;
}

function normalizeTestKey(mode: "pre" | "post", k: string) {
  const upper = mode.toUpperCase(); // PRE / POST
  // if already looks like PRE101 / POST101 etc, keep
  if (/^(PRE|POST)\d+/i.test(k)) return k.toUpperCase();
  // otherwise prefix
  return `${upper}_${k}`;
}

function normalizeSrmKey(k: string) {
  // Prefer Qxxx if numeric-like; otherwise keep as-is
  if (/^Q\d+/i.test(k)) return k.toUpperCase();
  if (/^\d+$/.test(k)) return `Q${k}`;
  return k;
}

function sortKeysSmart(keys: string[]) {
  return [...keys].sort((a, b) => {
    // 1) Try: prefix + "_" + number at end (koc_1, koc_10, roc_es_2)
    const ma = a.match(/^(.*?)(?:_)?(\d+)$/);
    const mb = b.match(/^(.*?)(?:_)?(\d+)$/);

    if (ma && mb) {
      const pa = ma[1] ?? "";
      const pb = mb[1] ?? "";
      if (pa !== pb) return pa.localeCompare(pb);

      const na = Number(ma[2]);
      const nb = Number(mb[2]);
      if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;

      return a.localeCompare(b);
    }

    // 2) Try: letters + number (Q12, PRE101, POST17)
    const ra = a.match(/^([A-Za-z_]+)(\d+)$/);
    const rb = b.match(/^([A-Za-z_]+)(\d+)$/);

    if (ra && rb) {
      const pa = ra[1] ?? "";
      const pb = rb[1] ?? "";
      if (pa !== pb) return pa.localeCompare(pb);

      const na = Number(ra[2]);
      const nb = Number(rb[2]);
      if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;

      return a.localeCompare(b);
    }

    // 3) Fallback: plain string compare
    return a.localeCompare(b);
  });
}


type Summary = {
  totalStudents: number;
  pretestDone: number;
  learningNow: number;
  posttestDone: number;
};

export default defineEventHandler(async () => {
  // 1) students
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

  // 2) read per student: progress, plan, tests(pre/post), srm(pre)
  const rows = await Promise.all(
    students.map(async (s) => {
      const progressRef = adminDb.collection("students").doc(s.uid).collection("progress").doc("gear-train");
      const planRef = adminDb.collection("students").doc(s.uid).collection("plans").doc("gear-train");
      const preRef = adminDb.collection("students").doc(s.uid).collection("tests").doc("pre");
      const postRef = adminDb.collection("students").doc(s.uid).collection("tests").doc("post");
      const srmPreRef = adminDb.collection("students").doc(s.uid).collection("srm").doc("pre");

      const [progressSnap, planSnap, preSnap, postSnap, srmPreSnap] = await Promise.all([
        progressRef.get(),
        planRef.get(),
        preRef.get(),
        postRef.get(),
        srmPreRef.get(),
      ]);

      const progress = (progressSnap.exists ? progressSnap.data() : {}) as any;
      const plan = (planSnap.exists ? planSnap.data() : {}) as any;

      const pre = (preSnap.exists ? preSnap.data() : null) as any | null;
      const post = (postSnap.exists ? postSnap.data() : null) as any | null;
      const srmPre = (srmPreSnap.exists ? srmPreSnap.data() : null) as any | null;

      // normalize roomFinishedAt
      const roomFinishedAt: Record<string, string> = {};
      const rawRF = progress?.roomFinishedAt || {};
      for (const [k, v] of Object.entries(rawRF)) {
        const iso = tsToISO(v);
        if (iso) roomFinishedAt[k] = iso;
      }

      // normalize plan rooms (min/max dates)
      const planRooms = Array.isArray(plan?.rooms) ? plan.rooms : [];
      const normalizedRooms = planRooms.map((r: any) => ({
        roomKey: r.roomKey ?? r.key ?? r.conceptId ?? r.room ?? null,
        startDate: tsToISO(r.startDate),
        endDate: tsToISO(r.endDate),
      })).filter((r: any) => !!r.roomKey);

      const preTestDone = !!progress?.preTestDone;
      const postTestDone = !!progress?.postTestDone;
      const learningNow = preTestDone && !postTestDone;

      return {
        student: s,
        progress: {
          preTestDone,
          postTestDone,
          roomFinishedAt,
          reflection: progress?.reflection ?? { submitted: false },
        },
        plan: { rooms: normalizedRooms },
        tests: { pre, post },
        srm: { pre: srmPre },
        computed: { learningNow },
      };
    })
  );

  // Build a global ordered roomKey list from all students' plans
  const roomKeySet = new Set<string>();
  for (const r of rows) {
    for (const pr of r.plan.rooms) {
      if (pr.roomKey) roomKeySet.add(pr.roomKey);
    }
  }
  const roomKeys = Array.from(roomKeySet);

  // (optional) prefer your custom order
  const preferred = ["intro1", "C1", "C2", "C3", "C4", "intro2"];
  roomKeys.sort((a, b) => {
    const ia = preferred.indexOf(a);
    const ib = preferred.indexOf(b);
    if (ia !== -1 || ib !== -1) return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    return a.localeCompare(b);
  });


  // 3) summary
  const summary: Summary = {
    totalStudents: rows.length,
    pretestDone: rows.filter((r) => r.progress.preTestDone).length,
    posttestDone: rows.filter((r) => r.progress.postTestDone).length,
    learningNow: rows.filter((r) => r.computed.learningNow).length,
  };

  // 4) profileRows
  const profileRows = rows.map((r) => ({
    uid: r.student.uid,
    firstName: r.student.firstName,
    lastName: r.student.lastName,
    sex: r.student.sex,
    age: r.student.age,
    school: r.student.school,
    classCode: r.student.classCode,
    experimentGroup: r.student.experimentGroup,
  }));

  // ---------------------------
  // ✅ 5) PRE/POST RAW TABLE
  // ---------------------------
  // Determine all item keys across all students
  const allPreKeys = new Set<string>();
  const allPostKeys = new Set<string>();

  for (const r of rows) {
    const preMap =
      pickFirstMap(r.tests.pre, ["itemScoresByQuestionId", "itemAnswersByQuestionId", "answersByQuestionId"]) ?? {};
    const postMap =
      pickFirstMap(r.tests.post, ["itemScoresByQuestionId", "itemAnswersByQuestionId", "answersByQuestionId"]) ?? {};

    for (const k of Object.keys(preMap)) allPreKeys.add(normalizeTestKey("pre", k));
    for (const k of Object.keys(postMap)) allPostKeys.add(normalizeTestKey("post", k));
  }

  const preCols = sortKeysSmart([...allPreKeys]);
  const postCols = sortKeysSmart([...allPostKeys]);

  const prePostRows = rows.map((r, idx) => {
    const preMapRaw =
      pickFirstMap(r.tests.pre, ["itemScoresByQuestionId", "itemAnswersByQuestionId", "answersByQuestionId"]) ?? {};
    const postMapRaw =
      pickFirstMap(r.tests.post, ["itemScoresByQuestionId", "itemAnswersByQuestionId", "answersByQuestionId"]) ?? {};

    const row: Record<string, any> & { uid: string } = {
      uid: r.student.uid,
      "No.": idx + 1,
      "First Name": r.student.firstName,
      "Last Name": r.student.lastName,
      Group: r.student.experimentGroup,
    };

    // fill PRE columns
    for (const col of preCols) {
      // reverse normalization to find raw key
      // (we try exact match first, then strip PRE_/PRE prefix)
      const rawCandidates = [
        col,
        col.replace(/^PRE_/, ""),
        col.replace(/^PRE/, "PRE"), // no-op but safe
      ];
      let v: any = "";
      for (const c of rawCandidates) {
        if (c in preMapRaw) { v = preMapRaw[c]; break; }
        const c2 = c.toLowerCase();
        const found = Object.keys(preMapRaw).find((k) => k.toLowerCase() === c2);
        if (found) { v = preMapRaw[found]; break; }
      }
      row[col] = v ?? "";
    }

    // fill POST columns
    for (const col of postCols) {
      const rawCandidates = [
        col,
        col.replace(/^POST_/, ""),
      ];
      let v: any = "";
      for (const c of rawCandidates) {
        if (c in postMapRaw) { v = postMapRaw[c]; break; }
        const c2 = c.toLowerCase();
        const found = Object.keys(postMapRaw).find((k) => k.toLowerCase() === c2);
        if (found) { v = postMapRaw[found]; break; }
      }
      row[col] = v ?? "";
    }

    return row;
  });

  // ---------------------------
// ✅ 6) SRM RAW TABLE (by item)
// ---------------------------
const allSrmKeys = new Set<string>();

function getSrmAnswersMap(srmDoc: any): Record<string, any> {
  // Your POST saves "answers"
  return (
    pickFirstMap(srmDoc, [
      "answers",                 // ✅ NEW (matches POST)
      "answersByQuestionId",
      "responsesByItemId",
      "itemResponses",
      "itemScoresByQuestionId",
    ]) ??
    // support older "wrapped" shapes if any
    pickFirstMap(srmDoc?.result, [
      "answers",
      "answersByQuestionId",
      "responsesByItemId",
      "itemResponses",
      "itemScoresByQuestionId",
    ]) ??
    {}
  );
}

for (const r of rows) {
  const srmDoc = r.srm.pre;
  const map = getSrmAnswersMap(srmDoc);
  for (const k of Object.keys(map)) allSrmKeys.add(normalizeSrmKey(k));
}

const srmCols = sortKeysSmart([...allSrmKeys]);

const srmRows = rows.map((r, idx) => {
  const map = getSrmAnswersMap(r.srm.pre);

  const row: Record<string, any> & { uid: string } = {
    uid: r.student.uid,
    "No.": idx + 1,
    "First Name": r.student.firstName,
    "Last Name": r.student.lastName,
    Group: r.student.experimentGroup,
  };

  for (const col of srmCols) {
    const rawCandidates = [col, col.replace(/^Q/i, "")]; // Q12 <-> 12
    let v: any = "";

    for (const c of rawCandidates) {
      if (c in map) { v = map[c]; break; }
      const found = Object.keys(map).find((k) => k.toLowerCase() === c.toLowerCase());
      if (found) { v = map[found]; break; }
    }

    row[col] = v ?? "";
  }

  return row;
});


  // ---------------------------
  // (keep your plan/status tables as you already had)
  // ---------------------------
  const planRows = rows.map((r, i) => {
  const row: Record<string, any> & { uid: string } = {
    uid: r.student.uid,
    "No.": i + 1,
    "First Name": r.student.firstName,
    "Last Name": r.student.lastName,
    Group: r.student.experimentGroup,
  };

  // map for quick lookup
  const planMap: Record<string, any> = {};
  for (const pr of r.plan.rooms) planMap[pr.roomKey] = pr;

  for (const key of roomKeys) {
    const pr = planMap[key];
    row[`${key} Start`] = fmtThaiShort(pr?.startDate ?? null);
    row[`${key} End`] = fmtThaiShort(pr?.endDate ?? null);
  }

  return row;
});


  const statusRows = rows.map((r, i) => {
  const row: Record<string, any> & { uid: string } = {
    uid: r.student.uid,
    "No.": i + 1,
    "First Name": r.student.firstName,
    "Last Name": r.student.lastName,
    Group: r.student.experimentGroup,
  };

  const planMap: Record<string, any> = {};
  for (const pr of r.plan.rooms) planMap[pr.roomKey] = pr;

  let hasLate = false;
  let hasNotFinished = false;

  for (const key of roomKeys) {
    const pr = planMap[key];
    const finishedISO = r.progress.roomFinishedAt?.[key] ?? null;

    const st = getRoomPlanStatus(pr?.startDate ?? null, pr?.endDate ?? null, finishedISO);
    row[`${key} Status`] = statusThai(st);

    if (st === "LATE") hasLate = true;
    if (st === "NOT_FINISHED") hasNotFinished = true;
  }

  // overall summary (what you want: เกินกำหนด / ภายใจกำหนด / ก่อนกำหนด)
  // practical definition:
  // - if any late => เกินกำหนด
  // - else if any not finished => ภายใจกำหนด (still within plan / ongoing)
  // - else => ก่อนกำหนด or ภายใจกำหนด (choose one)
  let overall = "ภายในกำหนด";
  if (hasLate) overall = "เกินกำหนด";
  else if (!hasNotFinished) overall = "ก่อนกำหนด";

  row["Overall Status"] = overall;

  row["Reflection"] =
    r.progress.reflection?.submitted ? (r.progress.reflection?.text ?? "") : "";

  return row;
});


  return {
    summary,
    profileRows,
    prePostRows,
    srmRows,
    planRows,
    statusRows,
  };
});
