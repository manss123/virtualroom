<!-- pages/learning/index.vue -->
<template>
  <div class="h-[100vh] w-full overflow-y-auto fixed inset-0 flex flex-col">
    <!-- 360 BG -->
    <ClientOnly>
      <div class="absolute inset-0 -z-10">
        <MarzipanoViewer initial-scene-id="home" />
      </div>
    </ClientOnly>

    <!-- overlay content -->
    <div
      class="relative z-10 h-full flex flex-col items-center justify-start lg:justify-center py-8 px-4 text-white bg-black/85">
      <!-- header -->
      <div class="w-full mt-5">
        <LearningTopBarVue title="VIRTUAL 360° ROOM" progressMode="time" :is-blocked="true" />
      </div>

      <div class="w-full max-w-6xl text-center 3xl:mt-0 py-20">
        <p class="text-center mt-2 text-4xl">
          นักเรียนเลือกห้องเรียนได้เลยครับ
        </p>

        <!-- v-if finished all personalized classes & reflection, show post-test route button -->
        <div v-if="canDoPostTest"
          class="w-full rounded-nw shadow-sm shadow-[#FFC233] p-5 mt-5 text-2xl flex items-center justify-evenly">
          <div>
            มาทำแบบทดสอบหลังเรียนกันเถอะ!
          </div>
          <button
            class="px-10 py-4 rounded-nw bg-[#FFC233] text-black font-medium cursor-pointer hover:bg-[#B97530] hover:text-white"
            @click="router.push('/posttest')">
            เริ่มทำแบบดทดสอบ
          </button>
        </div>
        <!-- cards -->
        <div
          class="mt-20 grid gap-20 w-full lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center items-stretch place-items-center">
          <div v-for="room in rooms" :key="room.key" class="relative rounded-nw overflow-hidden shadow-xl w-[300px]"
            :class="room.unlocked ? ' bg-white/95' : 'bg-white/40 text-gray-500'
              ">
            <!-- label + button -->
            <div class="p-4 flex flex-col items-center">
              <!-- <div
                class="px-4 py-1 rounded-full bg-white text-black font-semibold text-sm mb-3 shadow"
              >
                
              </div> -->

              <div class="text-xl text-[#342F35] font-semibold text-center">
                {{ room.label }}
              </div>
            </div>
            <!-- image -->
            <div class="relative h-60 w-full flex justify-center items-center">
              <button
                class="absolute bottom-0 mt-auto w-10/12 h-11 flex items-center justify-center rounded-lg text-sm font-semibold shadow-lg mb-4"
                :class="room.unlocked
                  ? 'bg-[#FFC233] text-black hover:bg-[#B97530] hover:text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  " :disabled="!room.unlocked" @click="enterRoom(room)">
                เริ่มเรียน
              </button>
              <img :src="room.cardImage" alt="" class="w-full h-full object-cover" />
              <!-- lock overlay -->
              <div v-if="!room.unlocked" class="absolute inset-0 bg-black/30 flex items-center justify-center">
                <!-- <img src="/icons/lock.svg" alt="locked" class="w-14 h-14" /> -->
              </div>
            </div>
          </div>
        </div>
        <!-- /cards -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import MarzipanoViewer from "~/components/MarzipanoViewer.vue";
import {
  LEARNING_ROOMS,
  type LearningRoomKey,
  type LearningRoomMeta,
} from "@/config/learningRoom";
import type { ProgressState } from "~/types/progress";
import LearningTopBarVue from "~/components/LearningTopBar.vue.vue";
import { useAuthState } from "~/composables/useAuthState";

definePageMeta({
  middleware: ["auth"],
});

const router = useRouter();

const { postTestDone } = useAuthState()

onMounted(() => {
  if (postTestDone.value) {
    router.push('/dashboard')
  }
})

type LearningAction = "EXTRA" | "REVIEW" | "SKIP";

interface LearningPathItem {
  conceptId: "C1" | "C2" | "C3" | "C4";
  fuzzyLabel: "LOW" | "AVERAGE" | "HIGH";
  action: LearningAction;
}

interface RoomCard extends LearningRoomMeta {
  unlocked: boolean;
  isInPath: boolean;
}

const errorMessage = ref<string | null>(null);
const rooms = ref<RoomCard[]>([]);
const dateRangeText = ref("dd/mm/yy - dd/mm/yy");
const progress = ref<ProgressState | null>(null);

// for time progress bar
const planStart = ref<Date | null>(null);
const planEnd = ref<Date | null>(null);

function normalizeDate(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

// ---------- time progress between planStart–planEnd ----------
const progressPercent = computed(() => {
  if (!planStart.value || !planEnd.value) return 0;

  const start = normalizeDate(planStart.value);
  const end = normalizeDate(planEnd.value);
  const today = normalizeDate(new Date());

  const msPerDay = 24 * 60 * 60 * 1000;
  const totalDays = (end.getTime() - start.getTime()) / msPerDay + 1; // inclusive

  if (totalDays <= 0) return 0;

  let elapsedDays: number;
  if (today.getTime() <= start.getTime()) {
    elapsedDays = 1;
  } else if (today.getTime() >= end.getTime()) {
    elapsedDays = totalDays;
  } else {
    elapsedDays = (today.getTime() - start.getTime()) / msPerDay + 1;
  }

  const pct = (elapsedDays / totalDays) * 100;
  return Math.max(0, Math.min(100, Math.round(pct)));
});

// ---------- load pre-test + progress + learning-plan ----------

let orderedKeys: LearningRoomKey[]

try {
  const [
    { data: preData, error: preErr },
    { data: progData },
    { data: planData },
    { data: meData },
  ] = await Promise.all([
    useFetch("/api/tests/pre", { method: "GET" }),
    useFetch("/api/progress", { method: "GET" }),
    useFetch("/api/learning-plan", { method: "GET" }),
    useFetch("/api/auth/me", { method: "GET" }),
  ]);


  if (preErr.value) throw preErr.value;

  // 1) fuzzy learning path
  const lp = (preData.value?.learningPath ?? []) as LearningPathItem[];

  const conceptsInPath = lp
    .filter((i) => i.action === "EXTRA" || i.action === "REVIEW")
    .map((i) => i.conceptId);

  // ordered learning sequence based on fuzzy path
  orderedKeys = [
    "intro1",
    ...(conceptsInPath as LearningRoomKey[]),
    "intro2",
  ];

  // 2) student progress
  progress.value = (progData.value as ProgressState) || null;

  const completedSet = new Set(progress.value?.completedRooms ?? []);
  let maxCompletedIndex = -1;
  orderedKeys.forEach((key, idx) => {
    if (completedSet.has(key) && idx > maxCompletedIndex) {
      maxCompletedIndex = idx;
    }
  });

  // first room must always be unlockable
  const maxUnlockedIndex = Math.max(0, maxCompletedIndex + 1);

  rooms.value = orderedKeys.map((key, index) => {
    const meta = LEARNING_ROOMS[key];
    const isIntro = key === "intro1" || key === "intro2";
    const inPath = isIntro || conceptsInPath.includes(key as any);

    const unlocked = index <= maxUnlockedIndex;

    return {
      ...meta,
      unlocked,
      isInPath: inPath,
    };
  });

  // 3) learning-plan date range -> dateRangeText + time progress
  const planRooms = (planData.value as any)?.rooms || [];
  if (Array.isArray(planRooms) && planRooms.length) {
    const dates: Date[] = [];
    for (const r of planRooms) {
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
} catch (err: any) {
  console.error(err);
  errorMessage.value =
    err?.data?.statusMessage ||
    err?.data?.message ||
    err?.message ||
    "ไม่สามารถโหลดแผนการเรียนได้";
}

const completedSet = computed(() => new Set(progress.value?.completedRooms ?? []));

const finishedAllPersonalizedRooms = computed(() => {
  // orderedKeys is your personalized sequence: intro1 + conceptsInPath + intro2
  return orderedKeys.every((k) => completedSet.value.has(k));
});

const reflectionDone = computed(() => !!progress.value?.reflection?.submitted);

const canDoPostTest = computed(() => {
  return finishedAllPersonalizedRooms.value && reflectionDone.value;
});


// ---------- actions ----------
function enterRoom(room: RoomCard) {
  if (!room.unlocked) return;
  router.push({
    path: "/virtualroom",
    query: { room: room.key }, // ✅ use key
  });
}
</script>
