<template>
  <div class="w-full flex justify-center">

    <!-- overlay -->
    <div class="relative z-10 min-h-screen text-white pb-24 max-w-7xl">
      <div class="max-w-7xl mx-auto px-6 pt-10">
        <div class="text-center">
          <div class="text-4xl font-bold tracking-wide">MY DASHBOARD</div>
          <div class="text-lg opacity-90 mt-3 leading-relaxed">
            ผลการเรียนและการประเมินทั้งหมดจะอยู่ในหน้าแสดงผล Dashboard นี้ทั้งหมด <br>
            ซึ่งประกอบไปด้วย ผลคะแนนแบบทดสอบก่อนเรียนและหลังเรียน, ผลการเรียนแต่ละห้องเรียน, <br>
            ผลประเมินการรู้คิดและการควบคุมการรู้คิด (Spider/Radar Graph), สถานะแผน/ตารางการเรียน <br>
          </div>
        </div>

        <!-- row 1: pre/post + room learning result -->
        <div class="grid grid-cols-12 gap-8 mt-10">
          <!-- left: pre/post score cards -->
          <div class="col-span-12 lg:col-span-12 flex items-center justify-center flex-col">
            <div class="text-xl font-semibold text-[#FFC233] mb-3">
              คะแนนแบบทดสอบวัดความรู้เรื่องเฟือง
            </div>

            <div class="flex w-full gap-6">
              <div
                class="rounded-nw bg-white/15 border border-white/10 p-6 shadow-sm shadow-[#FFC233] w-full flex flex-col lg:flex-row items-baseline justify-evenly">
                <div class=" text-2xl opacity-80">Pre-test Score</div>
                <div class="text-5xl font-bold text-[#FFC233] mt-5">
                  {{ preScoreText }} <span class="text-lg"> / {{ preTotalText }} </span>
                </div>
              </div>

              <div
                class="rounded-nw bg-white/15 border border-white/10 p-6 shadow-sm shadow-[#FFC233] w-full flex flex-col lg:flex-row items-baseline justify-evenly">
                <div class=" text-2xl opacity-80">Post-test Score</div>
                <div class="text-5xl font-bold text-[#FFC233] mt-5">
                  {{ postScoreText }} <span class="text-lg"> / {{ postTotalText }} </span>
                </div>
              </div>
            </div>
          </div>


        </div>

        <!-- row 2: radar + plan table -->
        <div class="grid grid-cols-12 gap-8 mt-12">
          <!-- radar -->
          <div class="col-span-12 lg:col-span-12">
            <div class="text-xl font-semibold text-[#FFC233] mb-3 w-full text-center">
              ผลการประเมินการรู้คิดและการควบคุมการรู้คิด
            </div>

            <div class="rounded-nw text-white p-4 shadow-xl flex flex-col lg:flex-row items-center justify-between">
              <div class="w-full">
                <div class="text-base mt-4 leading-relaxed">
                  องค์ประกอบที่เกี่ยวกับความรู้คิด (Knowledge of Cognition) แบ่งออกเป็น 3 ด้าน ดังนี้:
                  <div class="mt-2 space-y-1">
                    <div>1) ความรู้เกี่ยวกับข้อเท็จจริงที่จำเป็นต้องมี (Declarative Knowledge)</div>
                    <div>2) ความรู้เกี่ยวกับกระบวนการทำงาน (Procedural Knowledge)</div>
                    <div>3) ความรู้เกี่ยวกับเงื่อนไขในการทำงานให้สำเร็จ (Conditional Knowledge)</div>
                  </div>
                </div>
                <div class="text-base mt-4 leading-relaxed">
                  องค์ประกอบที่เกี่ยวกับความรู้ การควบคุมการรู้คิด (Regulation of Cognition) แบ่งออกเป็น 3 ด้าน คือ:
                  <div class="mt-2 space-y-1">
                    <div>1) การวางแผน (Planning) </div>
                    <div>2) การกำกับความเข้าใจ (Comprehension Monitoring) </div>
                    <div>3) กลยุทธ์การประเมินความสำเร็จของงาน (Evaluation Strategies)</div>
                  </div>
                </div>
              </div>
              <ClientOnly>
                <div class="w-1/2 h-[420px]">
                  <canvas ref="radarEl" class="w-full h-full"></canvas>
                </div>
              </ClientOnly>

            </div>
          </div>

          <!-- right: per-room learning result -->
          <div class="col-span-12 lg:col-span-6">
            <div class="text-xl font-semibold text-[#FFC233] mb-3 w-full text-center">
              ผลการเรียนแต่ละห้องเรียน
            </div>

            <div class="rounded-nw bg-white/10 border border-white/10 shadow-xl overflow-hidden">
              <div class="grid grid-cols-4 bg-white/10 text-sm font-semibold">
                <div class="px-4 py-3 text-center">Room</div>
                <div class="px-4 py-3 text-center">Status</div>
                <div class="px-4 py-3 text-center">Quiz Score</div>
                <div class="px-4 py-3 text-center">Result</div>
              </div>

              <div class="divide-y divide-white/10">
                <div v-for="r in roomLearningRows" :key="r.key" class="grid grid-cols-4 items-center text-sm">
                  <div class="px-4 py-3 text-xs">{{ r.label }}</div>
                  <div class="px-4 py-3 text-center">{{ r.studyStatus }}</div>
                  <div class="px-4 py-3 text-center">{{ r.quizScore }}</div>
                  <div class="px-4 py-3 text-center font-semibold" :class="r.resultClass">
                    {{ r.resultText }}
                  </div>
                </div>
              </div>

              <!-- progress bar -->
              <div class="px-6 py-5">
                <div class="text-sm opacity-90 text-center mb-2">
                  ความคืบหน้าโดยรวม (Progress Bar {{ overallProgressPercent }}%)
                </div>
                <div class="w-full h-3 bg-white/15 rounded-full overflow-hidden">
                  <div class="h-3 bg-green-500" :style="{ width: overallProgressPercent + '%' }"></div>
                </div>
                <div class="mt-4 flex items-center justify-between text-sm">
                  <div class="opacity-90">จำนวนห้องเรียนที่เหลือ:</div>
                  <span
                    class="inline-flex items-center justify-center min-w-[56px] px-3 py-1 rounded-lg bg-white/15 font-semibold">
                    {{ classroomsLeft }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- plan table -->
          <div class="col-span-12 lg:col-span-6">
            <div class="text-xl font-semibold text-[#FFC233] mb-3 w-full text-center">
              สถานะแผน/ตารางเรียน
            </div>

            <div class="rounded-nw bg-white/10 border border-white/10 shadow-xl overflow-hidden">
              <div class="grid grid-cols-4 bg-white/10 text-sm font-semibold">
                <div class="px-4 py-3 text-center">Room</div>
                <div class="px-4 py-3 text-center">Start</div>
                <div class="px-4 py-3 text-center">End</div>
                <div class="px-4 py-3 text-center">Status</div>
              </div>

              <div class="divide-y divide-white/10">
                <div v-for="r in planRows" :key="r.key" class="grid grid-cols-4 items-center text-sm">
                  <div class="px-4 py-3 text-xs">{{ r.label }}</div>
                  <div class="px-4 py-3 text-center">{{ r.startText }}</div>
                  <div class="px-4 py-3 text-center">{{ r.endText }}</div>
                  <div class="px-4 py-3 text-center font-semibold" :class="r.statusClass">
                    {{ r.statusText }}
                  </div>
                </div>
              </div>

              <div class="px-6 py-5">
                <div class="text-sm opacity-90 text-center mb-2">
                  ความคืบหน้าโดยรวม (Progress Bar {{ overallProgressPercent }}%)
                </div>
                <div class="w-full h-3 bg-white/15 rounded-full overflow-hidden">
                  <div class="h-3 bg-green-500" :style="{ width: overallProgressPercent + '%' }"></div>
                </div>

                <div class="mt-4 flex items-center justify-between text-sm">
                  <div class="opacity-90">
                    จำนวนวันที่เหลือ:
                    <span
                      class="ml-2 inline-flex items-center justify-center min-w-[56px] px-3 py-1 rounded-lg bg-white/15 font-semibold">
                      {{ daysLeftText }}
                    </span>
                  </div>

                  <div class="opacity-90">
                    สรุปสถานะโดยรวม:
                    <span class="ml-2 px-3 py-1 rounded-lg bg-white/15 font-semibold" :class="overallPlanStatusClass">
                      {{ overallPlanStatusText }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- row 3: camp + reflection -->
        <div class="grid grid-cols-12 gap-8 mt-12 items-stretch">
          <!-- camp -->
          <div class="col-span-12 lg:col-span-6">
            <div class="text-xl font-semibold text-[#FFC233] mb-3 w-full text-center">
              ผลการเข้าร่วมกิจกรรม (แคมป์)
            </div>

            <div class="rounded-nw text-black shadow-xl overflow-hidden h-full flex flex-col">
              <div class="rounded-nw shadow-sm shadow-[#FFC233] bg-[#C4C5C54D] text-center text-white py-3 font-semibold">
                Camp Participation Status
              </div>

              <!-- ✅ body grows to match height -->
              <div class="p-10 text-center flex-1 flex items-center justify-center bg-white rounded-nw">
                <div class="text-3xl font-bold" :class="postDone ? 'text-[#1CD725]' : 'text-[#FFC233]'">
                  {{ postDone ? "ได้รับการเข้าร่วมแคมป์กับเรา" : "ยังไม่ได้ทำแบบทดสอบหลังเรียน" }}
                </div>
              </div>
            </div>

          </div>

          <!-- reflection -->
          <div class="col-span-12 lg:col-span-6">
            <div class="text-xl font-semibold text-[#FFC233] mb-3 w-full text-center">
              เหตุผลประกอบระยะเวลาเรียน (Reflection)
            </div>

            <div class="rounded-nw text-black overflow-visible h-full flex flex-col">
              <div class="rounded-nw shadow-sm shadow-[#FFC233] bg-[#C4C5C54D] text-center text-white py-3 font-semibold">
                Reflection ของนักเรียนคือ.....
              </div>

              <!-- ✅ body grows to match height -->
              <div class="p-6 flex-1 flex items-center justify-center bg-white rounded-nw">
                <div v-if="reflectionSubmitted" class="whitespace-pre-wrap text-lg leading-relaxed w-full text-center">
                  {{ reflectionText }}
                </div>

                <div v-else class="text-center text-gray-600">
                  สามารถปลดล็อกเพื่อดูข้อมูลส่วนนี้ได้<br />
                  หลังจากทำ Quiz Intro 2 ผ่านแล้วเท่านั้น
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import MarzipanoViewer from "~/components/MarzipanoViewer.vue";
import type { ProgressState } from "~/types/progress";
import { LEARNING_ROOMS, type LearningRoomKey } from "@/config/learningRoom";

// chart.js
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// definePageMeta({ middleware: ["auth"] });

// ---------- types ----------
type LearningAction = "EXTRA" | "REVIEW" | "SKIP";
type StudentLevel = "LOW" | "AVERAGE" | "HIGH";
type LearningPathItem = {
  conceptId: "C1" | "C2" | "C3" | "C4";
  fuzzyLabel: StudentLevel;
  action: LearningAction;
};

type PlanRoom = {
  roomKey: string;
  startDate?: string; // ISO
  endDate?: string;   // ISO
};

// tests GET shape (adjust if your API differs)
type TestGetResponse = {
  result?: {
    percent?: number;
    conceptScores?: Record<string, number>;
    learningPath?: LearningPathItem[];
    itemScoresByQuestionId?: Record<string, number>;
  };
  learningPath?: LearningPathItem[];
};

function sumItemScores(map?: Record<string, number>) {
  if (!map || typeof map !== "object") return null;

  const values = Object.values(map).filter((v) => typeof v === "number");
  if (!values.length) return null;

  const sum = values.reduce((acc, v) => acc + v, 0);
  const total = values.length;

  return { sum, total };
}

// ---------- fetch data ----------
const [{ data: progress }, { data: plan }, { data: preTest }, { data: postTest }, { data: srmPre }] =
  await Promise.all([
    useFetch<ProgressState>("/api/progress"),
    useFetch<{ rooms: PlanRoom[] }>("/api/learning-plan"),
    useFetch<TestGetResponse>("/api/tests/pre"),
    useFetch<TestGetResponse>("/api/tests/post"),
    useFetch<any>("/api/srm/pre"),
  ]);


// ---------- personalized ordered rooms ----------
const orderedRoomKeys = computed<LearningRoomKey[]>(() => {
  const lp =
    (preTest.value?.learningPath ??
      preTest.value?.result?.learningPath ??
      []) as LearningPathItem[];

  const conceptsInPath = lp
    .filter((i) => i.action === "EXTRA" || i.action === "REVIEW")
    .map((i) => i.conceptId) as LearningRoomKey[];

  return ["intro1", ...conceptsInPath, "intro2"];
});

// ---------- scores ----------
const preScoreText = computed(() => {
  // console.log('pretest', preTest.value)
  const item = sumItemScores(preTest.value?.result?.itemScoresByQuestionId);
  // console.log('pre score', item)
  if (item) return Math.round(item.sum); // ✅ use raw sum score
  const p = preTest.value?.result?.percent;
  return typeof p === "number" ? Math.round(p) : "-";
});

const postScoreText = computed(() => {
  const item = sumItemScores(postTest.value?.result?.itemScoresByQuestionId);
  // console.log('post score', item)
  if (item) return Math.round(item.sum); // ✅ use raw sum score
  const p = postTest.value?.result?.percent;
  return typeof p === "number" ? Math.round(p) : "-";
});

const preTotalText = computed(() => {
  const item = sumItemScores(preTest.value?.result?.itemScoresByQuestionId);
  // console.log('preTotalText', item)
  return item ? item.total * 7 : 7 * 17;
});

const postTotalText = computed(() => {
  const item = sumItemScores(postTest.value?.result?.itemScoresByQuestionId);
  // console.log('postTotalText', item)
  return item ? item.total * 7 : 7 * 17;
});


const postDone = computed(() => !!progress.value?.postTestDone);

// ---------- room learning table (status + quiz score + pass/fail) ----------
const roomLearningRows = computed(() => {
  const completed = new Set(progress.value?.completedRooms ?? []);
  const last = progress.value?.lastQuizResultByRoom ?? {};

  return orderedRoomKeys.value.map((key) => {
    const meta = LEARNING_ROOMS[key];

    const isDone = completed.has(key);
    const studyStatus = isDone ? "เรียนจบแล้ว" : "อยู่ระหว่างเรียน";

    const quiz = (last as any)[key];
    const quizScore =
      quiz && typeof quiz.correct === "number" && typeof quiz.total === "number"
        ? `${quiz.correct}/${quiz.total}`
        : "N/A";

    const passed = quiz?.passed;
    const resultText =
      passed === true ? "ผ่าน" : passed === false ? "ไม่ผ่าน" : "N/A";

    const resultClass =
      passed === true ? "text-green-400" : passed === false ? "text-red-500" : "text-white/60";

    return {
      key,
      label: meta?.label ?? key,
      studyStatus,
      quizScore,
      resultText,
      resultClass,
    };
  });
});

// ---------- overall progress (based on personalized rooms) ----------
const overallProgressPercent = computed(() => {
  const completed = new Set(progress.value?.completedRooms ?? []);
  const total = orderedRoomKeys.value.length || 1;
  const done = orderedRoomKeys.value.filter((k) => completed.has(k)).length;
  return Math.round((done / total) * 100);
});

const classroomsLeft = computed(() => {
  const completed = new Set(progress.value?.completedRooms ?? []);
  const total = orderedRoomKeys.value.length || 0;
  const done = orderedRoomKeys.value.filter((k) => completed.has(k)).length;
  return Math.max(0, total - done);
});


// ---------- plan table: before/in-time/late/not-finished/no-plan ----------
type RoomPlanStatus = "BEFORE" | "IN_TIME" | "LATE" | "NOT_FINISHED" | "NO_PLAN";

function fmtDate(iso?: string) {
  if (!iso) return "dd/mm/yy";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "dd/mm/yy";
  return d.toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "2-digit" });
}

function toDayStart(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}
function toDayEnd(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

const planByKey = computed(() => {
  const map: Record<string, PlanRoom> = {};
  for (const r of plan.value?.rooms ?? []) {
    if (r.roomKey) map[r.roomKey] = r;
  }
  return map;
});

function getPlanStatus(roomKey: string): RoomPlanStatus {
  const p = planByKey.value[roomKey];
  if (!p?.startDate || !p?.endDate) return "NO_PLAN";

  const finishedISO = (progress.value?.roomFinishedAt as any)?.[roomKey];
  if (!finishedISO) return "NOT_FINISHED";

  const start = toDayStart(new Date(p.startDate));
  const end = toDayEnd(new Date(p.endDate));
  const finished = new Date(finishedISO);

  if (Number.isNaN(finished.getTime())) return "NOT_FINISHED";
  if (finished < start) return "BEFORE";
  if (finished >= start && finished <= end) return "IN_TIME";
  return "LATE";
}

const planRows = computed(() => {
  return orderedRoomKeys.value.map((key) => {
    const meta = LEARNING_ROOMS[key];
    const p = planByKey.value[key];
    const st = getPlanStatus(key);

    const statusText =
      st === "BEFORE" ? "ก่อนกำหนด" :
        st === "IN_TIME" ? "ภายในกำหนด" :
          st === "LATE" ? "เกินกำหนด" :
            st === "NOT_FINISHED" ? "อยู่ระหว่างเรียน" :
              "N/A";

    const statusClass =
      st === "BEFORE" ? "text-green-400" :
        st === "IN_TIME" ? "text-green-400" :
          st === "LATE" ? "text-red-500" :
            st === "NOT_FINISHED" ? "text-yellow-300" :
              "text-white/60";

    return {
      key,
      label: meta?.label ?? key,
      startText: fmtDate(p?.startDate),
      endText: fmtDate(p?.endDate),
      statusText,
      statusClass,
      _status: st,
    };
  });
});

// days left + overall plan status
const daysLeftText = computed(() => {
  const rooms = plan.value?.rooms ?? [];
  const ends = rooms
    .map((r) => (r.endDate ? new Date(r.endDate).getTime() : NaN))
    .filter((t) => Number.isFinite(t)) as number[];

  if (!ends.length) return "-";
  const maxEnd = Math.max(...ends);
  const today = toDayStart(new Date()).getTime();
  const diff = Math.ceil((maxEnd - today) / (24 * 60 * 60 * 1000));
  return String(Math.max(0, diff));
});

const overallPlanStatusText = computed(() => {
  // if any late => "เกินกำหนด", else if all finished => "ภายในกำหนด", else "อยู่ระหว่างเรียน"
  const statuses = planRows.value.map((r) => r._status);
  if (statuses.includes("LATE")) return "เกินกำหนด";
  const allDone = statuses.every((s) => s === "BEFORE" || s === "IN_TIME");
  if (allDone) return "ภายในกำหนด";
  return "อยู่ระหว่างเรียน";
});

const overallPlanStatusClass = computed(() => {
  if (overallPlanStatusText.value === "เกินกำหนด") return "text-red-400";
  if (overallPlanStatusText.value === "ภายในกำหนด") return "text-green-400";
  return "text-yellow-300";
});

// ---------- reflection ----------
const reflectionSubmitted = computed(() => !!progress.value?.reflection?.submitted);
const reflectionText = computed(() => progress.value?.reflection?.text ?? "");

// ---------- SRM radar from categoryScores ----------
type SrmScoreSummary = { sum: number; count: number; average: number };

// ✅ robust: supports any of these shapes:
// - { categoryScores: {...} }
// - { result: { categoryScores: {...} } }
// - direct object: { koc_dk: {...}, ... }  (what you pasted)
const srmCategoryScores = computed<Record<string, SrmScoreSummary>>(() => {
  const v: any = srmPre.value;

  // case 1: { categoryScores: {...} }
  if (v?.categoryScores) return v.categoryScores;

  // case 2: { result: { categoryScores: {...} } }
  if (v?.result?.categoryScores) return v.result.categoryScores;

  // case 3: direct object (your sample)
  if (v && typeof v === "object" && v.koc_dk) return v;

  return {};
});

const SRM_DIMENSIONS: { key: string; label: string }[] = [
  { key: "koc_dk", label: "Declarative" },
  { key: "koc_pk", label: "Procedural" },
  { key: "koc_ck", label: "Conditional" },
  { key: "roc_pl", label: "Planning" },
  { key: "roc_cm", label: "Monitoring" },
  { key: "roc_es", label: "Evaluation" },
];

const srmRadarLabels = computed(() => SRM_DIMENSIONS.map((d) => d.label));

const srmRadarValues = computed(() => {
  const cs = srmCategoryScores.value;

  return SRM_DIMENSIONS.map((d) => {
    const avg = (cs as any)[d.key]?.average;
    return typeof avg === "number" ? avg : 0;
  });
});



// ---------- radar chart ----------

function rgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Fun but not harsh (works well on white card)
const SRM_COLORS = {
  line: "#7C3AED",      // purple
  point: "#F59E0B",     // amber
  grid: "#CBD5E1",      // slate-300
  angle: "#E2E8F0",     // slate-200
  tick: "#64748B",      // slate-500
  label: "#fff",     // slate-900
};


const radarEl = ref<HTMLCanvasElement | null>(null);
let radarChart: Chart | null = null;

async function renderRadar() {
  await nextTick();
  await new Promise((r) => requestAnimationFrame(r));

  if (!radarEl.value) return;

  if (radarChart) {
    radarChart.destroy();
    radarChart = null;
  }

  const ctx = radarEl.value.getContext("2d");
  if (!ctx) return;

  // ✅ gradient fill for the polygon (looks more colorful than flat grey)
  const grad = ctx.createLinearGradient(0, 0, 0, radarEl.value.height || 420);
  grad.addColorStop(0, rgba("#7C3AED", 0.35)); // purple top
  grad.addColorStop(1, rgba("#F59E0B", 0.15)); // amber bottom

  radarChart = new Chart(radarEl.value, {
    type: "radar",
    data: {
      labels: srmRadarLabels.value,
      datasets: [
        {
          label: "SRM (Pre) 0–5",
          data: srmRadarValues.value,

          // ✅ color!
          backgroundColor: grad,
          borderColor: SRM_COLORS.line,
          borderWidth: 3,

          // points
          pointBackgroundColor: SRM_COLORS.point,
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,

          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: SRM_COLORS.label,
            font: { size: 14, weight: "600" },
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: ${Number(ctx.raw).toFixed(2)} / 5`,
          },
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          suggestedMax: 5,
          ticks: {
            stepSize: 1,
            color: SRM_COLORS.tick,
            backdropColor: "transparent",
          },
          grid: {
            color: rgba(SRM_COLORS.grid, 0.8),
          },
          angleLines: {
            color: rgba(SRM_COLORS.angle, 1),
          },
          pointLabels: {
            color: SRM_COLORS.label,
            font: { size: 14, weight: "600" },
          },
        },
      },
      elements: {
        line: {
          tension: 0.2, // slightly smoother polygon edges
        },
      },
    },
  });
}

onMounted(renderRadar);

// Re-render when SRM values change (after fetch)
watch([srmRadarLabels, srmRadarValues], () => {
  renderRadar();
});
</script>
