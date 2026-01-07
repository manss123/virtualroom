<template>
  <div class="w-full overflow-y-auto text-white">
    <div class="max-w-5xl mx-auto py-12 px-6">
      <div class="text-4xl font-bold w-full rounded-nw shadow-sm shadow-[#FFC233] text-[#FFC233] text-center py-8">
        ยินดีด้วยครับ 🎉</div>

      <!-- room feedback table -->
      <div class="w-full bg-white text-black rounded-nw shadow-sm shadow-[#FFC233]">

        <div class="flex items-center justify-center pt-10">
          <div class="w-1/3">
            <img :src="getImageURL('images/cartoons/gear-happy.png')" alt="" srcset="">
          </div>
          <div class="flex flex-col items-center justify-center gap-4">
            <div class="text-4xl font-bold text-[#FFC233]">
              เย้! เรียนจบครบหมดแล้ว!!
            </div>
            <div class="text-xl text-[24px] text-center">
              เรียนครบแล้ว ตอนนี้นักเรียนรู้สึกอย่างไรบ้างครับ? <br>
              และหากดูจาก Dashboard ของนักเรียนแล้วพบว่า <br>
              ผลของระยะเวลาเรียนที่วางแผนไว้กับ <br>
              เวลาเรียนจริงมีความแตกต่างกันในแต่ละครั้ง <br>
              อยากทราบว่ามีเหตุผลใดเป็นพิเศษหรือไม่ อย่างไร <br>
              สามารถอธิบายเพิ่มเติมได้ที่ช่องด้านล่างครับ <br>
            </div>
          </div>
        </div>

        <div class="p-6 shadow-xl mb-8">
          <div class="text-xl font-semibold mb-4">สรุปผลตามเป้าหมายเวลา</div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-center bg-[#C4C5C54D]">
                  <th class="px-4 py-2 rounded-nw shadow-sm shadow-[#FFC233]">Room</th>
                  <th class="px-4 py-2 rounded-nw shadow-sm shadow-[#FFC233]">Start</th>
                  <th class="px-4 py-2 rounded-nw shadow-sm shadow-[#FFC233]">End</th>
                  <th class="px-4 py-2 rounded-nw shadow-sm shadow-[#FFC233]">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="r in roomRows" :key="r.key" class="bg-[#C4C5C54D] rounded-lg text-center">
                  <td class="px-4 py-3 rounded-l-lg">{{ r.label }}</td>
                  <td class="px-4 py-3">{{ r.startText }}</td>
                  <td class="px-4 py-3">{{ r.endText }}</td>
                  <td class="px-4 py-3 rounded-r-lg font-semibold" :class="r.statusClass">
                    {{ r.statusText }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>


      <div class="bg-white text-black rounded-nw p-6 shadow-xl">
        <div class="text-xl font-semibold mb-3">เขียนความรู้สึก/สิ่งที่ได้เรียนรู้</div>

        <textarea v-model="text" class="w-full min-h-[180px] p-4 rounded-lg border border-gray-300"
          placeholder="พิมพ์ความรู้สึกของนักเรียนได้ที่นี่..." />

        <div class="flex gap-4 justify-center mt-6">
          <!-- <button class="px-10 py-4 rounded-nw bg-[#9DA7A9] text-black cursor-pointer" @click="goLearning">
            กลับหน้าสารบัญ
          </button> -->

          <button class="px-10 py-4 rounded-nw bg-[#FFC233] text-black"
            :class="submitting || !text ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#B97530] hover:text-white cursor-pointer'"
            :disabled="submitting || !text" @click="submitReflection">
            ส่งคำตอบได้เลย
          </button>
        </div>

        <div v-if="error" class="mt-4 text-red-600 text-center">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProgressState } from "~/types/progress";
import { LEARNING_ROOMS, type LearningRoomKey } from "@/config/learningRoom";


type LearningAction = "EXTRA" | "REVIEW" | "SKIP";
type StudentLevel = "LOW" | "AVERAGE" | "HIGH";
type LearningPathItem = {
  conceptId: "C1" | "C2" | "C3" | "C4";
  fuzzyLabel: StudentLevel;
  action: LearningAction;
};

type PlanRoom = {
  roomKey: string;       // normalized by API
  startDate?: string;    // ISO (normalized by API)
  endDate?: string;      // ISO (normalized by API)
};

type RoomStatus = "EARLY" | "IN_TIME" | "LATE" | "NOT_FINISHED" | "NO_PLAN";

const { getImageURL } = useAssetUrl()
const router = useRouter();
const text = ref("");
const submitting = ref(false);
const error = ref<string | null>(null);

// ✅ fetch all needed data (progress + plan + pre)
const [{ data: progress }, { data: plan }, { data: pre }] = await Promise.all([
  useFetch<ProgressState>("/api/progress"),
  useFetch<{ rooms: PlanRoom[] }>("/api/learning-plan"),
  useFetch<{ learningPath: LearningPathItem[] }>("/api/tests/pre"),
]);

// already submitted -> bounce
if (progress.value?.reflection?.submitted) {
  await router.replace("/learning");
}

const lp = pre.value?.learningPath ?? [];
const conceptsInPath = lp
  .filter((i) => i.action === "EXTRA" || i.action === "REVIEW")
  .map((i) => i.conceptId) as LearningRoomKey[];

const requiredRoomKeys: LearningRoomKey[] = ["intro1", ...conceptsInPath, "intro2"];

const completedRooms = new Set(progress.value?.completedRooms ?? []);
const finishedAllRequiredRooms = requiredRoomKeys.every((k) => completedRooms.has(k));

if (!finishedAllRequiredRooms) {
  await router.replace("/learning");
}

// already submitted -> bounce
if (progress.value?.reflection?.submitted) {
  await router.replace("/learning");
}

function fmtDate(iso?: string) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("th-TH", { day: "2-digit", month: "2-digit", year: "2-digit" });
}

function toDayStart(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}
function toDayEnd(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

// ✅ personalized ordered rooms: intro1 -> (EXTRA/REVIEW concepts) -> intro2
const orderedRoomKeys = computed<LearningRoomKey[]>(() => {
  const lp = pre.value?.learningPath ?? [];
  const conceptsInPath = lp
    .filter((i) => i.action === "EXTRA" || i.action === "REVIEW")
    .map((i) => i.conceptId) as LearningRoomKey[];

  return ["intro1", ...conceptsInPath, "intro2"];
});

// ✅ map plan by roomKey
const planByKey = computed(() => {
  const map: Record<string, PlanRoom> = {};
  for (const r of plan.value?.rooms ?? []) {
    if (r.roomKey) map[r.roomKey] = r;
  }
  return map;
});

// ✅ roomFinishedAt is now ISO strings (after API fix)
const finishedAtByKey = computed(() => progress.value?.roomFinishedAt ?? {});

function getStatus(roomKey: string): RoomStatus {
  const p = planByKey.value[roomKey];
  if (!p?.startDate || !p?.endDate) return "NO_PLAN";

  const finishedISO = (finishedAtByKey.value as any)?.[roomKey];
  if (!finishedISO) return "NOT_FINISHED";

  const start = toDayStart(new Date(p.startDate));
  const end = toDayEnd(new Date(p.endDate));
  const finished = new Date(finishedISO);

  if (Number.isNaN(finished.getTime())) return "NOT_FINISHED";

  if (finished < start) return "EARLY";
  if (finished <= end) return "IN_TIME";
  return "LATE";
}


const roomRows = computed(() => {
  return orderedRoomKeys.value.map((key) => {
    const meta = LEARNING_ROOMS[key];
    const p = planByKey.value[key];
    const status = getStatus(key);

    const statusText =
      status === "EARLY" ? "ก่อนกำหนด" :
        status === "IN_TIME" ? "ภายในกำหนด" :
          status === "LATE" ? "เกินกำหนด" :
            status === "NOT_FINISHED" ? "ยังไม่เสร็จ" :
              "ยังไม่ตั้งเป้า";

    const statusClass =
      status === "EARLY" ? "text-blue-600" :
        status === "IN_TIME" ? "text-green-600" :
          status === "LATE" ? "text-red-600" :
            "text-gray-500";


    return {
      key,
      label: meta?.label ?? key,
      startText: fmtDate(p?.startDate),
      endText: fmtDate(p?.endDate),
      statusText,
      statusClass,
    };
  });
});

// actions
function goLearning() {
  router.push("/learning");
}

async function submitReflection() {
  error.value = null;
  submitting.value = true;
  try {
    await $fetch("/api/reflection", { method: "POST", body: { text: text.value } });
    await router.push("/learning"); // later: /post-test
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || "ส่งคำตอบไม่สำเร็จ";
  } finally {
    submitting.value = false;
  }
}
</script>
