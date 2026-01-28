<template>
  <div
    class="w-full flex flex-col items-center justify-start py-10 px-4 text-white"
  >
    <div class="w-full max-w-6xl">
      <!-- Title -->
      <div class="text-center mb-6">
        <h1 class="text-3xl font-semibold mb-2">วางแผนตารางเรียนกันครับ</h1>
        <p class="text-lg">
          ให้นักเรียนเลือกวันที่ต้องการเริ่มเรียนและจบการเรียนในแต่ละห้องเรียน
          โดยให้หมดเวลา การเรียนทุกห้องภายใน 1 เดือน (30 วัน) ก่อนเข้าร่วมแคมป์
        </p>
      </div>

      <!-- PLAN TABLE -->
      <div
        class="w-full bg-white rounded-nw shadow-md shadow-[#FFC233] px-3 lg:px-8 pt-8 pb-16 text-black mb-10"
      >
        <!-- table header -->
        <div
          class="grid grid-cols-3 gap-4 border-b border-gray-300 pb-4 mb-4 text-lg font-semibold"
        >
          <div class="text-center">ห้องเรียน</div>
          <div class="text-center">วันที่เริ่มเรียน</div>
          <div class="text-center">วันที่เรียนจบ</div>
        </div>

        <!-- rows -->
        <div
          v-for="room in rooms"
          :key="room.key"
          class="grid grid-cols-3 gap-4 items-center py-2"
        >
          <div
            class="flex items-center gap-1 lg:gap-3 text-center text-sm lg:text-[20px] justify-center"
          >
            <!-- small color dot -->
            <span
              class="w-4 h-4 rounded-full border border-white/60"
              :class="roomColorClass(room.key)"
            ></span>
            <span>{{ room.label }}</span>

            <room-tool-tip
              :detail="ROOM_DETAILS[room.key as LearningRoomKey]"
              :is-low="isLowConcept(room.key)"
            />
          </div>

          <!-- start date -->
          <div class="flex justify-center">
            <input
              type="date"
              v-model="room.startDate"
              :min="todayISO"
              class="w-full lg:w-40 h-11 px-3 rounded-[10px] bg-[#E5F0F4] border border-gray-300 text-center text-sm"
            />
          </div>

          <!-- end date -->
          <div class="flex justify-center">
            <input
              type="date"
              v-model="room.endDate"
              :min="room.startDate || todayISO"
              class="w-full lg:w-40 h-11 px-3 rounded-[10px] bg-[#E5F0F4] border border-gray-300 text-center text-sm"
            />
          </div>
        </div>

        <!-- validation message -->
        <div v-if="errorMessage" class="mt-4 text-red-600 text-sm text-center">
          {{ errorMessage }}
        </div>
      </div>

      <!-- CALENDAR BLOCK -->
      <div
        class="w-full bg-white rounded-nw shadow-md shadow-[#FFC233] px-8 pt-8 pb-10 text-black"
      >
        <!-- calendar header (month navigation) -->
        <div class="flex items-center justify-between mb-4">
          <div class="text-3xl font-semibold">
            {{ currentDayLabel }}
          </div>
          <div class="flex items-center gap-2 text-lg">
            <button
              type="button"
              class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              @click="prevMonth"
            >
              ‹
            </button>
            <div class="font-medium">{{ monthName }} {{ currentYear }}</div>
            <button
              type="button"
              class="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
              @click="nextMonth"
            >
              ›
            </button>
          </div>
        </div>

        <!-- calendar grid -->
        <div class="w-full border border-gray-300 rounded-lg overflow-hidden">
          <!-- weekday header -->
          <div
            class="grid grid-cols-7 bg-gray-100 text-center text-xs font-semibold py-2"
          >
            <div>SUN</div>
            <div>MON</div>
            <div>TUE</div>
            <div>WED</div>
            <div>THU</div>
            <div>FRI</div>
            <div>SAT</div>
          </div>

          <!-- days -->
          <div class="grid grid-cols-7 text-center text-sm">
            <div
              v-for="(day, index) in calendarDays"
              :key="index"
              class="h-14 flex flex-col items-center justify-center border-t border-l border-gray-200 last:border-r relative"
              :class="[
                !day.isCurrentMonth ? 'text-gray-400' : '',
                // exactly 1 room -> use that room bg color
                day.roomsKeys.length === 1
                  ? roomColorClass(day.roomsKeys[0])
                  : '',
                // more than 1 room -> neutral highlight for conflict
                day.roomsKeys.length > 1 ? 'bg-pink-100' : '',
              ]"
            >
              <!-- day number -->
              <span v-if="day.isCurrentMonth" class="text-xs mb-1">
                {{ day.date.getDate() }}
              </span>

              <!-- no rooms on this date -->
              <template v-if="day.roomsKeys.length === 0">
                <!-- nothing else -->
              </template>

              <!-- exactly 1 room: show label dot -->
              <div
                v-else-if="day.roomsKeys.length === 1"
                class="flex items-center gap-1"
              >
                <span
                  class="w-2 h-2 rounded-full border border-white/60"
                  :class="roomColorClass(day.roomsKeys[0])"
                ></span>
              </div>

              <!-- multiple rooms: stacked dots -->
              <div v-else class="flex items-center gap-1">
                <span
                  v-for="rk in day.roomsKeys.slice(0, 3)"
                  :key="rk"
                  class="w-2 h-2 rounded-full border border-white/60"
                  :class="roomColorClass(rk)"
                ></span>
                <span
                  v-if="day.roomsKeys.length > 3"
                  class="text-[10px] text-gray-600"
                >
                  +{{ day.roomsKeys.length - 3 }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- legend -->
        <div class="mt-4 flex flex-wrap gap-4 text-xs">
          <div
            v-for="room in rooms"
            :key="room.key + '-legend'"
            class="flex items-center gap-2"
          >
            <span
              class="w-4 h-4 rounded-sm border border-white/60"
              :class="roomColorClass(room.key)"
            ></span>
            <span>{{ room.label }}</span>
          </div>
        </div>

        <!-- overall duration info -->
        <div
          v-if="overallPlanDays > 0"
          class="mt-3 text-center text-sm text-black"
        >
          รวมระยะเวลาตั้งแต่ห้องแรกถึงห้องสุดท้าย
          <span class="font-semibold">{{ overallPlanDays }}</span> วัน
        </div>
        <div v-if="isOverMaxDays" class="mt-1 text-center text-sm text-red-500">
          ระยะเวลารวมของทุกห้องต้องไม่เกิน {{ MAX_PLAN_DAYS }} วัน
        </div>
        <div
          v-if="hasOverlappingDay"
          class="mt-2 text-xs text-red-500 text-center"
        >
          * พบวันที่มีหลายห้องเรียนซ้อนกัน กรุณาตรวจสอบตารางเรียนอีกครั้ง
        </div>
      </div>

      <!-- bottom buttons -->
      <div class="mt-8 flex items-center justify-center">
        <button
          type="button"
          class="flex w-[260px] h-[60px] justify-center items-center text-[22px] bg-[#FFC233] hover:bg-[#B97530] text-black hover:text-white drop-shadow-xl rounded-[15px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          :disabled="saving || isOverMaxDays || !isPlanComplete"
          @click="savePlan"
        >
          {{ saving ? "กำลังบันทึก..." : "บันทึกตารางเรียน" }}
        </button>
      </div>

      <div v-if="saveSuccess" class="mt-4 text-center text-green-200">
        บันทึกตารางเรียนเรียบร้อยแล้ว
      </div>
      <div
        v-if="!isPlanComplete && !errorMessage"
        class="mt-2 text-xs text-gray-700 text-center"
      >
        * กรุณากำหนดวันเริ่ม-จบให้ครบทุกห้องก่อนบันทึก
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import type { LearningRoomKey } from "~/config/learningRoom";
import { ROOM_DETAILS } from "~/config/roomDetails";

// definePageMeta({
//     middleware: ["auth"],
// });

const router = useRouter();
const { getImageURL } = useAssetUrl();

// ---------- 1. Load fuzzy learningPath from pre-test ----------
const { data } = await useFetch("/api/tests/pre", {
  method: "GET",
});

type LearningAction = "EXTRA" | "REVIEW" | "SKIP";

interface RawLearningPathItem {
  conceptId: string; // "C1" | "C2" | "C3" | "C4"
  fuzzyLabel: "LOW" | "AVERAGE" | "HIGH";
  action: LearningAction;
}

interface RoomPlan {
  key: string;
  label: string;
  description?: string;
  startDate: string | null; // 'YYYY-MM-DD'
  endDate: string | null;
}

// concept → friendly label
const CONCEPT_LABELS: Record<string, string> = {
  C1: "ห้อง Concept 1",
  C2: "ห้อง Concept 2",
  C3: "ห้อง Concept 3",
  C4: "ห้อง Concept 4",
};

// room → tailwind bg class (calendar & legend)
const ROOM_COLOR_CLASS: Record<string, string> = {
  intro1: "bg-[#FACC15]/70", // yellow
  intro2: "bg-[#FACC15]/40",
  C1: "bg-[#60A5FA]/70", // blue
  C2: "bg-[#F97316]/70", // orange
  C3: "bg-[#22C55E]/70", // green
  C4: "bg-[#A855F7]/70", // purple
};

function roomColorClass(key: string) {
  return ROOM_COLOR_CLASS[key] ?? "bg-[#FFC233]/40";
}

type StudentLevel = "LOW" | "AVERAGE" | "HIGH";

const conceptLevelMap = computed<Record<string, StudentLevel>>(() => {
  const lp = (data.value?.learningPath ?? []) as RawLearningPathItem[];
  const map: Record<string, StudentLevel> = {};
  for (const it of lp) {
    map[it.conceptId] = it.fuzzyLabel;
  }
  return map;
});

function isLowConcept(roomKey: string) {
  // only C1..C4 can be LOW (intro rooms are never LOW)
  return conceptLevelMap.value[roomKey] === "LOW";
}

function toISODate(d: Date) {
  // local date -> YYYY-MM-DD (no timezone shift)
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const todayISO = computed(() => toISODate(new Date()));

const rooms = ref<RoomPlan[]>([]);
const errorMessage = ref<string | null>(null);

// build rooms when data arrives
watchEffect(() => {
  if (!data.value) return;

  const lp = data.value.learningPath as RawLearningPathItem[] | undefined;
  if (!lp) {
    errorMessage.value = "ยังไม่พบผล Pre-test กรุณาทำแบบทดสอบก่อนวางแผน";
    router.push("/pre-test"); // or wherever your pre-test route is
    return;
  }

  const newRooms: RoomPlan[] = [];

  // Intro 1 (always first)
  newRooms.push({
    key: "intro1",
    label: "ห้อง Intro 1",
    startDate: null,
    endDate: null,
  });

  // dynamic concept rooms from learningPath
  for (const item of lp) {
    const label = CONCEPT_LABELS[item.conceptId];
    if (!label) continue; // unknown concept, skip

    // only add when student needs to learn/review (LOW/AVERAGE)
    if (item.action === "EXTRA" || item.action === "REVIEW") {
      newRooms.push({
        key: item.conceptId,
        label,
        startDate: null,
        endDate: null,
      });
    }
  }

  // Intro 2 (always last)
  newRooms.push({
    key: "intro2",
    label: "ห้อง Intro 2",
    startDate: null,
    endDate: null,
  });

  rooms.value = newRooms;
});

// ---------- 2. Calendar based on selected month ----------
const today = new Date();
const currentMonth = ref(today.getMonth()); // 0-11
const currentYear = ref(today.getFullYear());

const monthName = computed(() =>
  new Date(currentYear.value, currentMonth.value, 1).toLocaleString("en-US", {
    month: "long",
  }),
);

// label left (01, 02, ...)
const currentDayLabel = computed(() =>
  String(currentMonth.value + 1).padStart(2, "0"),
);

function normalize(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getRoomsOnDate(date: Date): RoomPlan[] {
  const d = normalize(date).getTime();
  const matched: RoomPlan[] = [];

  for (const room of rooms.value) {
    if (!room.startDate || !room.endDate) continue;
    const s = normalize(new Date(room.startDate)).getTime();
    const e = normalize(new Date(room.endDate)).getTime();
    if (s <= d && d <= e) matched.push(room);
  }
  return matched;
}

interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
  roomsKeys: string[];
}

// calendar days for current month
const calendarDays = computed<CalendarCell[]>(() => {
  const days: CalendarCell[] = [];

  const firstOfMonth = new Date(currentYear.value, currentMonth.value, 1);
  const startWeekday = firstOfMonth.getDay(); // 0=Sun
  const daysInMonth = new Date(
    currentYear.value,
    currentMonth.value + 1,
    0,
  ).getDate();

  // leading cells (previous month)
  for (let i = 0; i < startWeekday; i++) {
    const date = new Date(
      currentYear.value,
      currentMonth.value,
      i - startWeekday + 1,
    );
    days.push({
      date,
      isCurrentMonth: false,
      roomsKeys: getRoomsOnDate(date).map((r) => r.key),
    });
  }

  // actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear.value, currentMonth.value, d);
    days.push({
      date,
      isCurrentMonth: true,
      roomsKeys: getRoomsOnDate(date).map((r) => r.key),
    });
  }

  // pad to full weeks
  while (days.length % 7 !== 0) {
    const last = days[days.length - 1].date;
    const next = new Date(last);
    next.setDate(last.getDate() + 1);
    days.push({
      date: next,
      isCurrentMonth: false,
      roomsKeys: getRoomsOnDate(next).map((r) => r.key),
    });
  }

  return days;
});

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 0;
    currentYear.value -= 0;
  } else {
    currentMonth.value -= 1;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value += 1;
  } else {
    currentMonth.value += 1;
  }
}

const hasOverlappingDay = computed(() =>
  calendarDays.value.some(
    (day) => day.isCurrentMonth && day.roomsKeys.length > 1,
  ),
);

// ---------- 3. Overall duration constraint (≤ 30 days) ----------
const MAX_PLAN_DAYS = 30;

const overallPlanDays = computed(() => {
  let minStart: Date | null = null;
  let maxEnd: Date | null = null;

  for (const room of rooms.value) {
    if (!room.startDate || !room.endDate) continue;
    const s = normalize(new Date(room.startDate));
    const e = normalize(new Date(room.endDate));
    if (!minStart || s < minStart) minStart = s;
    if (!maxEnd || e > maxEnd) maxEnd = e;
  }

  if (!minStart || !maxEnd) return 0;
  const diffMs = maxEnd.getTime() - minStart.getTime();
  const days = diffMs / (1000 * 60 * 60 * 24) + 1; // inclusive
  return Math.round(days);
});

const isOverMaxDays = computed(() => overallPlanDays.value > MAX_PLAN_DAYS);

// ---------- 4. Save learning plan ----------
const saving = ref(false);
const saveSuccess = ref(false);

const isPlanComplete = computed(
  () =>
    rooms.value.length > 0 &&
    rooms.value.every((r) => r.startDate && r.endDate),
);

async function savePlan() {
  errorMessage.value = null;
  saveSuccess.value = false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTs = today.getTime();

  for (const room of rooms.value) {
    if (room.startDate) {
      const s = new Date(room.startDate);
      s.setHours(0, 0, 0, 0);
      if (s.getTime() < todayTs) {
        errorMessage.value = `วันเริ่มของ ${room.label} ต้องไม่ย้อนก่อนวันนี้`;
        return;
      }
    }
  }

  // simple validation: every room that has one date must have both, and end >= start
  for (const room of rooms.value) {
    if (
      (room.startDate && !room.endDate) ||
      (!room.startDate && room.endDate)
    ) {
      errorMessage.value = `กรุณาเลือกทั้งวันเริ่มและวันจบของ ${room.label}`;
      return;
    }
    if (room.startDate && room.endDate) {
      const s = new Date(room.startDate).getTime();
      const e = new Date(room.endDate).getTime();
      if (e < s) {
        errorMessage.value = `วันที่จบต้องไม่ก่อนวันที่เริ่ม (${room.label})`;
        return;
      }
    }
  }

  if (isOverMaxDays.value) {
    errorMessage.value = `ระยะเวลารวมของทุกห้องต้องไม่เกิน ${MAX_PLAN_DAYS} วัน (ตอนนี้ ${overallPlanDays.value} วัน)`;
    return;
  }

  try {
    saving.value = true;
    await $fetch("/api/learning-plan", {
      method: "POST",
      body: {
        rooms: rooms.value,
      },
    });

    await $fetch("/api/progress", {
      method: "POST",
      body: { planningDone: true },
    });

    saveSuccess.value = true;
    router.push("/welcome");
  } catch (err: any) {
    console.error(err);
    errorMessage.value =
      err?.data?.statusMessage ||
      err?.data?.message ||
      "ไม่สามารถบันทึกตารางเรียนได้";
  } finally {
    saving.value = false;
  }
}
</script>

<style lang="scss" scoped></style>
