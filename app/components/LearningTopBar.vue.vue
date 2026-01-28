<!-- components/LearningTopBar.vue -->
<template>
  <!-- wrapper is pointer-events-none so dragging still works on panorama -->
  <div
    class="pointer-events-none top-0 left-0 right-0 z-40 flex justify-center mt-24 px-4" :class="[isBlocked? 'block w-full': 'absolute',]"
  >
    <div class="w-full max-w-[90vw] flex flex-col items-center gap-4">
      <!-- Time Left & Exit Button Row -->
      <div class="w-full flex items-center justify-between">
        <!-- LEFT: days left -->
        <div
          class="pointer-events-auto bg-[#C4C5C54D] rounded-full px-4 py-2 flex items-center gap-2 text-white text-xl md:text-[26px]"
        >
          <span>จำนวนวันที่เรียนที่เหลือ:</span>
          <span
            class="text-[#FFC233] font-bold rounded-full px-3 py-1 text-xl md:text-[26px] leading-none"
          >
            {{ daysLeftDisplay }}
          </span>
        </div>

        <!-- RIGHT: exit button -->
        <div class="pointer-events-auto flex justify-end flex-1">
          <button
            class="px-4 py-2 rounded-full bg-white/90 text-black text-xs md:text-[26px] font-medium hover:bg-white"
            @click="goExit"
          >
            ออกจากห้องเรียน
          </button>
        </div>
      </div>

      <!-- CENTER: title + progress + dates -->
      <div
        class="w-full flex-1 flex flex-col items-center text-white text-center gap-2"
      >
        <h1 class="text-xl md:text-5xl font-bold tracking-wide">
          {{ title }}
        </h1>

        <div
          class="w-full max-w-xl bg-gray-300/90 rounded-full h-2 overflow-hidden"
        >
          <div
            class="bg-[#1CD725] h-full rounded-full transition-all duration-500"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>

        <div class="text-xl md:text-2xl">
          <template v-if="progressMode === 'room' && progressLabel">
            {{ progressLabel }}
          </template>
          <template v-else> วันที่กำหนดเรียน: {{ dateRangeText }} </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  title: string;
  exitTo?: string;
  progressMode?: "time" | "room";
  roomProgress?: { done: number; total: number } | null;
  isBlocked?: boolean;
}>();

const router = useRouter();

const dateRangeText = ref("dd/mm/yy - dd/mm/yy");
const planStart = ref<Date | null>(null);
const planEnd = ref<Date | null>(null);

function normalizeDate(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// fetch learning-plan just for time window (same as your current code)
const { data: planData } = await useFetch("/api/learning-plan", {
  method: "GET",
});

if (planData.value?.rooms && Array.isArray(planData.value.rooms)) {
  const dates: Date[] = [];
  for (const r of planData.value.rooms as any[]) {
    if (r.startDate) dates.push(new Date(r.startDate));
    if (r.endDate) dates.push(new Date(r.endDate));
  }
  if (dates.length) {
    const min = new Date(Math.min(...dates.map((d) => d.getTime())));
    const max = new Date(Math.max(...dates.map((d) => d.getTime())));
    planStart.value = min;
    planEnd.value = max;

    const fmt = (d: Date) =>
      d.toLocaleDateString("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

    dateRangeText.value = `${fmt(min)} - ${fmt(max)}`;
  }
}

// time progress (your current logic)
const timeProgressPercent = computed(() => {
  if (!planStart.value || !planEnd.value) return 0;
  const start = normalizeDate(planStart.value);
  const end = normalizeDate(planEnd.value);
  const today = normalizeDate(new Date());

  const msPerDay = 24 * 60 * 60 * 1000;
  const totalDays = (end.getTime() - start.getTime()) / msPerDay + 1;
  if (totalDays <= 0) return 0;

  let elapsedDays: number;
  if (today.getTime() <= start.getTime()) elapsedDays = 1;
  else if (today.getTime() >= end.getTime()) elapsedDays = totalDays;
  else elapsedDays = (today.getTime() - start.getTime()) / msPerDay + 1;

  return Math.max(
    0,
    Math.min(100, Math.round((elapsedDays / totalDays) * 100))
  );
});

// room progress (done/total)
const roomProgressPercent = computed(() => {
  const rp = props.roomProgress;
  if (!rp || !rp.total) return 0;
  return Math.max(0, Math.min(100, Math.round((rp.done / rp.total) * 100)));
});

// ✅ final bar percent: time or room
const progressPercent = computed(() => {
  return props.progressMode === "room"
    ? roomProgressPercent.value
    : timeProgressPercent.value;
});

// optional label under the bar
const progressLabel = computed(() => {
  if (props.progressMode !== "room" || !props.roomProgress) return "";
  return `ความคืบหน้า: ${props.roomProgress.done}/${props.roomProgress.total}`;
});

// remaining days (same as your current code)
const daysLeftDisplay = computed(() => {
  if (!planEnd.value) return "-";
  const today = normalizeDate(new Date());
  const end = normalizeDate(planEnd.value);
  const msPerDay = 24 * 60 * 60 * 1000;
  if (today.getTime() > end.getTime()) return 0;
  const diff = Math.floor((end.getTime() - today.getTime()) / msPerDay) + 1;
  return diff < 0 ? 0 : diff;
});

function goExit() {
  router.push(props.exitTo || "/dashboard");
}
</script>
