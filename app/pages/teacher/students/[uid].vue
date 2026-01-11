<template>
  <div class="w-full flex justify-center">
    <div class="min-h-screen text-white px-8 py-10 max-w-7xl w-full">
      <h1 class="text-4xl font-semibold text-[#FFC233] text-center">Student Dashboard</h1>
      <div class="mt-6 h-px bg-white/20"></div>

      <div class="mt-10 text-center text-[#FFC233] text-xl font-semibold">
        ข้อมูลนักเรียนเบื้องต้น
      </div>

      <!-- BIG PROFILE CARD (matches screenshot) -->
      <div class="mt-6 bg-[#3b3b3b] rounded-2xl p-10 border-b-4 border-[#FFC233]">
        <div class="grid grid-cols-12 gap-10 items-center">
          <!-- left: radar -->
          <div class="col-span-12 lg:col-span-6 flex justify-center">
            <div class="rounded-2xl p-4 w-full max-w-[520px]">
              <ClientOnly>
                <div class="h-[360px]">
                  <canvas ref="radarEl" class="w-full h-full"></canvas>
                </div>
              </ClientOnly>
            </div>
          </div>

          <!-- right: profile info -->
          <div class="col-span-12 lg:col-span-6 text-lg space-y-8">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-4 text-[#FFC233] font-semibold text-right">ชื่อ:</div>
              <div class="col-span-8">{{ profile.firstName }}</div>
            </div>

            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-4 text-[#FFC233] font-semibold text-right">นามสกุล:</div>
              <div class="col-span-8">{{ profile.lastName }}</div>
            </div>

            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-4 text-[#FFC233] font-semibold text-right">โรงเรียน:</div>
              <div class="col-span-8">{{ profile.school }}</div>
            </div>

            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-4 text-[#FFC233] font-semibold text-right">รหัสที่ได้รับ:</div>
              <div class="col-span-8">{{ profile.classCode }}</div>
            </div>

            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-4 text-[#FFC233] font-semibold text-right">Group:</div>
              <div class="col-span-8">{{ profile.experimentGroup }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLE TITLE + DOWNLOAD -->
      <div class="mt-14 flex items-center justify-center relative">
        <div class="text-[#FFC233] text-xl font-semibold">
          ตารางแสดงคะแนนแบบฝึกหัดและจำนวนรอบการตอบของนักเรียน
        </div>

        <button class="absolute right-0 flex items-center gap-2 text-[#FFC233] hover:underline" @click="downloadCsv">
          ⬇ ดาวน์โหลดไฟล์
        </button>
      </div>

      <!-- QUIZ SCORE & ROUND TABLE (matches screenshot layout) -->
      <div class="mt-6 bg-[#3b3b3b] rounded-2xl p-6">
        <div class="overflow-x-auto">
          <table class="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr class="text-center text-sm">
                <th class="px-4 py-3 bg-[#555] rounded-l-xl">No.</th>
                <th v-for="h in roomHeaders" :key="h" class="px-4 py-3 bg-[#555]">
                  {{ h }}
                </th>
                <th class="px-4 py-3 bg-[#555] rounded-r-xl"></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="r in quizTableRows" :key="r.label" class="text-center">
                <td class="px-4 py-4 bg-[#444] rounded-l-xl font-semibold">
                  {{ r.label }}
                </td>

                <td v-for="rk in roomKeys" :key="rk" class="px-4 py-4 bg-[#444] hover:bg-[#4a4a4a] transition">
                  {{ r.byRoom[rk] ?? "-" }}
                </td>

                <td class="px-4 py-4 bg-[#444] rounded-r-xl"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="pending" class="mt-6 opacity-80">Loading...</div>
        <div v-if="err" class="mt-6 text-red-300">Load failed</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
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

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

type SrmScoreSummary = { sum: number; count: number; average: number };

definePageMeta({ middleware: ["auth", "teacher"] });

const route = useRoute();
const uid = String(route.params.uid || "");

const { data, pending, error: err } = await useFetch<any>(`/api/teacher/students/${uid}`, { method: "GET" });

const profile = computed(() => data.value?.profile ?? {
  firstName: "",
  lastName: "",
  school: "",
  classCode: "",
  experimentGroup: "",
});

const progress = computed(() => data.value?.progress ?? {
  lastQuizResultByRoom: {},
  quizAttemptsByRoom: {},
});

const srmPre = computed(() => data.value?.srmPre ?? null);

/** ---------- SRM radar (categoryScores) ---------- */
const srmCategoryScores = computed<Record<string, SrmScoreSummary>>(() => {
  const v: any = srmPre.value;
  if (v?.categoryScores) return v.categoryScores;
  if (v?.result?.categoryScores) return v.result.categoryScores;
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

const srmRadarLabels = computed(() => SRM_DIMENSIONS.map(d => d.label));
const srmRadarValues = computed(() => {
  const cs = srmCategoryScores.value;
  return SRM_DIMENSIONS.map((d) => {
    const avg = (cs as any)[d.key]?.average;
    return typeof avg === "number" ? avg : 0;
  });
});

function rgba(hex: string, a: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

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

  const grad = ctx.createLinearGradient(0, 0, 0, radarEl.value.height || 360);
  grad.addColorStop(0, rgba("#7C3AED", 0.35));
  grad.addColorStop(1, rgba("#F59E0B", 0.15));

  radarChart = new Chart(radarEl.value, {
    type: "radar",
    data: {
      labels: srmRadarLabels.value,
      datasets: [
        {
          label: "SRM (Pre) 0–5",
          data: srmRadarValues.value,
          backgroundColor: grad,
          borderColor: "#7C3AED",
          borderWidth: 3,
          pointBackgroundColor: "#F59E0B",
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
        legend: { display: true, labels: { color: "#fff", font: { size: 14, weight: "600" } } },
      },
      scales: {
        r: {
          beginAtZero: true,
          suggestedMax: 5,
          ticks: { stepSize: 1, backdropColor: "transparent" },
          grid: { color: rgba("#CBD5E1", 0.8) },
          angleLines: { color: rgba("#E2E8F0", 1) },
          pointLabels: { color: "#fff", font: { size: 14, weight: "600" } },
        },
      },
    },
  });
}

onMounted(renderRadar);
watch([srmRadarLabels, srmRadarValues], renderRadar);

/** ---------- Quiz score & round table (like screenshot) ---------- */
const roomKeys = ["intro1", "C1", "C2", "C3", "C4", "intro2"];
const roomHeaders = ["Intro1", "Concept1", "Concept2", "Concept3", "Concept4", "Intro2"];

const quizTableRows = computed(() => {
  const last = progress.value?.lastQuizResultByRoom ?? {};
  // const attempts = progress.value?.quizAttemptsByRoom ?? {};

  const scoreRow: Record<string, string> = {};
  // const roundRow: Record<string, string> = {};
  const passRow: Record<string, string> = {};

  for (const rk of roomKeys) {
    const q = (last as any)[rk];
    scoreRow[rk] =
      q && typeof q.correct === "number" && typeof q.total === "number"
        ? `${q.correct}/${q.total}`
        : "-";

    // roundRow[rk] = typeof (attempts as any)[rk] === "number" ? String((attempts as any)[rk]) : "-";

    const passed = q?.passed;
    passRow[rk] = passed === true ? "ผ่าน" : passed === false ? "ไม่ผ่าน" : "-";
  }

  return [
    { label: "Score", byRoom: scoreRow },
    // { label: "Round", byRoom: roundRow },
    { label: "Result", byRoom: passRow },
  ];
});

/** ---------- Download CSV (simple) ---------- */
function downloadCsv() {
  const header = ["Metric", ...roomHeaders];
  const rows = quizTableRows.value.map((r) => [
    r.label,
    ...roomKeys.map((rk) => JSON.stringify(r.byRoom[rk] ?? "")),
  ]);

  const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `student_${uid}_quiz_score_round.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
</script>
