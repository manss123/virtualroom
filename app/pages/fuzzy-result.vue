<template>
    <!-- ========================= -->
    <!-- PRE: keep original UI     -->
    <!-- ========================= -->
    <template v-if="mode === 'pre'">
        <div class="relative w-full flex flex-col lg:flex-row h-full items-center justify-center px-5 lg:pl-[20%] mt-10">
            <div class="w-full max-w-5xl">
                <div class="w-full flex">
                    <div
                        class="w-full flex items-center justify-center text-[26px] rounded-nw shadow-sm shadow-[#FFC233] gap-3 p-5">
                        <div class="text-[#FFC233]">
                            {{ headerTitle }}
                        </div>
                    </div>
                </div>

                <div
                    class="relative w-full min-h-[500px] flex flex-col items-center justify-center bg-white rounded-nw shadow-md shadow-[#FFC233]">
                    <!-- MAIN TITLE -->
                    <div class="text-[36px] text-center text-[#342F35]">
                        {{ mainTitle }}
                    </div>

                    <!-- GROUP B: SCORE FEEDBACK (pre) -->
                    <div v-if="isGroupB && mode === 'post'" class="w-full mt-8 px-10">
                        <div class="text-[30px] text-[#342F35] text-center font-semibold">
                            ได้คะแนน {{ totalScore }}/119 คะแนน
                        </div>

                        <div class="mt-6 bg-[#C4C5C5] rounded-nw p-8">
                            <div class="text-[28px] font-semibold text-[#342F35]">
                                {{ bLevelTitle }}
                            </div>
                            <div class="text-[22px] text-[#342F35] mt-3 leading-relaxed">
                                <div class="font-medium">คำอธิบายผลการเรียนรู้</div>
                                <div class="mt-2">{{ bDesc }}</div>

                                <div class="font-medium mt-6">คำแนะนำเพิ่มเติม</div>
                                <div class="mt-2">{{ bAdvice }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- GROUP A: pre show learning path -->
                    <template v-else>
                        <!-- learning path banner (A only) -->
                        <div
                            class="text-[#342F35] bg-[#C4C5C5] py-10 w-full text-[32px] font-medium text-center mt-8 flex justify-center items-center px-10">
                            <div class="flex w-full max-w-8/12 justify-center">
                                {{ learningPathText }}
                            </div>
                        </div>

                        <div class="text-[#342F35] text-[26px] text-center mt-4 px-6">
                            {{ footerHint }}
                        </div>
                    </template>

                    <!-- bottom button -->
                    <div class="absolute -bottom-7 flex left-0 w-full justify-evenly">
                        <button @click="primaryAction"
                            class="flex w-[300px] h-[80px] text-[26px] bg-[#FFC233] hover:bg-[#B97530] text-black hover:text-white drop-shadow-xl rounded-[15px] items-center justify-center cursor-pointer">
                            {{ primaryButtonText }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- left image -->
            <div class="block lg:absolute left-0 3xl:left-[14%] flex w-fit h-full items-center justify-end">
                <img class="w-auto h-auto pointer-events-none" :src="getImageURL('images/cartoons/gear-wow.png')" />
            </div>
        </div>
    </template>

    <!-- ========================= -->
    <!-- POST: new UI (A/B design) -->
    <!-- ========================= -->
    <template v-else>
        <div class="relative w-full flex justify-center items-start pt-10 pb-20">
            <div class="w-full max-w-6xl px-6">
                <!-- HEADER BAR -->
                <div class="w-full rounded-nw shadow-sm shadow-[#FFC233] py-6 flex justify-center items-center">
                    <div class="text-[34px] font-semibold text-[#FFC233]">
                        {{ pageTitle }}
                    </div>
                </div>

                <!-- MAIN CARD -->
                <div class="bg-white rounded-nw shadow-md shadow-[#FFC233] pb-[68px] relative overflow-visible">
                    <div class="w-full flex gap-8 items-center">

                        <div class="w-full px-[50px]" :class="experimentGroup === 'A'? 'pt-[30px]' : ''">
                            <div class="w-full flex flex-col lg:flex-row">
                                <!-- LEFT CHARACTER -->
                                <div class="w-fit flex justify-center">
                                    <img class="w-[328px] h-auto pointer-events-none select-none"
                                        :src="getImageURL('images/cartoons/gear-evil.png')" />
                                </div>
                                <div class="flex flex-1 flex-col justify-center">

                                    <div class="text-center text-[22px] text-[#342F35] font-medium">
                                        ผลการทำแบบทดสอบหลังเรียนโดยรวมทั้งหมด
                                    </div>
    
                                    <div class="text-center text-[30px] md:text-[34px] font-bold text-[#342F35] mt-3">
                                        นักเรียนทำได้ {{ totalScore }}/119 คะแนน
                                    </div>
    
                                    <!-- GROUP A -->
                                    <template v-if="isGroupA">
                                        <div class="text-center text-[20px] text-[#342F35] mt-3">
                                            สิ่งที่ยังต้องปรับเพื่อความรู้ที่แน่นมากขึ้น คือ <br />
                                            บทเรียนเกี่ยวกับห้องเรียน :
                                        </div>
    
                                        <div class="mt-5 bg-[#BFC0C0] rounded-[18px] px-8 py-5 text-center">
                                            <div
                                                class="text-[20px] md:text-[22px] font-semibold text-[#342F35] leading-relaxed">
                                                {{ roomsNeedText }}
                                            </div>
                                        </div>
    
                                        <div class="text-center text-[18px] text-[#342F35] mt-6 leading-relaxed">
                                            โดยนักเรียนสามารถเรียนนอกระบบเพิ่มเติมหรือ<br />
                                            อ่านเอกสารที่ได้ดาวน์โหลดจากระบบไป<br />
                                            เพื่อทบทวนเนื้อหาการเรียนก่อนเข้าร่วมแคมป์
                                        </div>
                                    </template>
    
                                    <!-- GROUP B -->
                                    <template v-else>
                                        <div class="text-center text-[24px] mt-5 font-semibold text-[#342F35]">
                                            {{ bLevelHeadline }}
                                        </div>
    
                                        <div class="text-center text-[18px] mt-3 text-[#342F35] leading-relaxed">
                                            {{ bDesc }}
                                        </div>
    
                                        <div class="text-center text-[18px] mt-6 text-[#342F35] leading-relaxed">
                                            <div class="font-semibold">:: คำแนะนำเพิ่มเติม ::</div>
                                            <div class="mt-2">{{ bAdvice }}</div>
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <div class="border-t border-black/20" :class="experimentGroup === 'A'? 'mt-5': 'mt-2.5'"></div>

                            <div class="mt-8 text-center">
                                <div class="text-red-600 font-bold text-[18px]">แจ้งเพิ่มเติม!!</div>
                                <div class="text-red-600 text-[16px] leading-relaxed mt-2">
                                    เมื่อนักเรียนถึงจุดนี้แสดงว่านักเรียนเสร็จสิ้นกระบวนการเรียนรู้กับระบบห้องเรียน 360°
                                    แล้ว<br />
                                    <span class="font-bold">ระบบจะทำการปิดล็อค</span>
                                    ยกเว้นเพียงหน้า My Dashboard ที่นักเรียนยังสามารถเข้าดูได้ครับ
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="absolute -bottom-8 w-full flex flex-col md:flex-row justify-evenly">
                        <button
                            class="w-full md:w-[320px] h-[70px] rounded-nw bg-[#9DA7A9] text-black text-[22px] font-medium hover:bg-[#BDC3C9]"
                            @click="logout">
                            ออกจากระบบ
                        </button>

                        <button
                            class="w-full md:w-[320px] h-[70px] rounded-nw bg-[#FFC233] text-black text-[22px] font-medium hover:bg-[#B97530] hover:text-white"
                            @click="goDashboard">
                            ดู Dashboard ตัวเอง
                        </button>
                    </div>
                </div>

                <div v-if="errorMessage" class="mt-6 text-center text-red-600">
                    {{ errorMessage }}
                </div>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

type LearningAction = "EXTRA" | "REVIEW" | "SKIP";
type LearningPathItem = {
    conceptId: "C1" | "C2" | "C3" | "C4" | string;
    fuzzyLabel: "LOW" | "AVERAGE" | "HIGH";
    action: LearningAction;
};

const ALL_CONCEPT_ROOMS: { key: string; label: string }[] = [
  { key: "C1", label: "ห้อง Concept 1" },
  { key: "C2", label: "ห้อง Concept 2" },
  { key: "C3", label: "ห้อง Concept 3" },
  { key: "C4", label: "ห้อง Concept 4" },
];

type TestResult = {
    percent?: number;
    learningPath?: LearningPathItem[];
    conceptScores?: Record<string, number>;
    fuzzyProfile?: Record<string, { score: number; label: "LOW" | "AVERAGE" | "HIGH" }>;
    itemScoresByQuestionId?: Record<string | number, number>;
};

const { getImageURL } = useAssetUrl();
const router = useRouter();
const route = useRoute();

// mode from query
const mode = computed(() => (route.query.mode === "post" ? "post" : "pre") as "pre" | "post");

// ----------------- group -----------------
// ✅ source of truth: /api/auth/me
// / 1) Auth check (401 => not logged in)
const { data: me, status: meStatus, refresh: refreshMe } = useFetch<MeResponse>("/api/auth/me", {
  // avoid SSR mismatch if you want:
  // server: false,
  // lazy: true,
});

// optional: allow query fallback (if you still pass ?group=...)
// const groupFromQuery = computed(() => (route.query.group === "B" ? "B" : "A") as "A" | "B");
const experimentGroup = computed<"A" | "B">(() => (me.value?.experimentGroup === "B" ? "B" : "A"));
// const experimentGroup = ref("B");

const isGroupB = computed(() => experimentGroup.value === "B");
const isGroupA = computed(() => !isGroupB.value);

// ----------------- fetch result -----------------
const result = ref<TestResult | null>(null);
const preResult = ref<TestResult | null>(null);
const errorMessage = ref<string | null>(null);

try {
    const { data, error } = await useFetch<any>(`/api/tests/${mode.value}`, { method: "GET" });
    if (error.value) throw error.value;
    result.value = data.value?.result ?? null;

    // keep your old logic for (A + post) compare if you still need it later
    if (!isGroupB.value && mode.value === "post") {
        const pre = await useFetch<any>("/api/tests/pre", { method: "GET" });
        preResult.value = pre.data.value?.result ?? null;
    }
} catch (err: any) {
    errorMessage.value = err?.data?.statusMessage || err?.data?.message || err?.message || "ไม่สามารถโหลดผลแบบทดสอบได้";
}

// ----------------- total score 0..119 -----------------
const totalScore = computed(() => {
    const m = result.value?.itemScoresByQuestionId ?? {};
    let sum = 0;
    for (let i = 1; i <= 17; i++) {
        const v = (m as any)[i];
        if (typeof v === "number") sum += v;
    }
    return sum;
});

// ----------------- PRE: learning path text -----------------
const CONCEPT_LABELS: Record<string, { short: string; full: string }> = {
    C1: { short: "ห้อง Concept 1", full: "ห้อง Concept 1: Idler Gear (เฟืองตัวกลาง)" },
    C2: { short: "ห้อง Concept 2", full: "ห้อง Concept 2: Variable Gear Ratio (อัตราทดที่เปลี่ยนได้)" },
    C3: { short: "ห้อง Concept 3", full: "ห้อง Concept 3: Simple Gear Train (ชุดเฟืองอย่างง่าย)" },
    C4: { short: "ห้อง Concept 4", full: "ห้อง Concept 4: Compound Gear Train (ชุดเฟืองประกอบ)" },
};

const learningPathRooms = computed(() => {
  // PRE only (this banner is used in pre mode)
  if (mode.value !== "pre") return [];

  // Always include intro rooms
  const rooms: { key: string; label: string }[] = [
    { key: "intro1", label: "ห้อง Intro 1" },
  ];

  // ✅ Group B: NO fuzzy/personalize -> force all concepts
  if (isGroupB.value) {
    rooms.push(...ALL_CONCEPT_ROOMS);
    rooms.push({ key: "intro2", label: "ห้อง Intro 2" });
    return rooms;
  }

  // ✅ Group A: personalized (from fuzzy learningPath)
  const lp = (result.value?.learningPath ?? []) as LearningPathItem[];
  for (const item of lp) {
    const cfg = CONCEPT_LABELS[item.conceptId];
    if (!cfg) continue;
    rooms.push({ key: item.conceptId, label: cfg.short });
  }

  rooms.push({ key: "intro2", label: "ห้อง Intro 2" });
  return rooms;
});

const learningPathText = computed(() => learningPathRooms.value.map((r) => r.label).join(", "));

// ----------------- POST A: rooms text -----------------
const CONCEPT_ROOM_LABEL: Record<string, string> = {
    C1: "ห้อง Concept 1",
    C2: "ห้อง Concept 2",
    C3: "ห้อง Concept 3",
    C4: "ห้อง Concept 4",
};

const roomsNeedText = computed(() => {
    const lp = (result.value?.learningPath ?? []) as LearningPathItem[];
    const conceptRooms = lp.map((x) => CONCEPT_ROOM_LABEL[x.conceptId]).filter(Boolean);

    // const list = ["ห้อง Intro 1", ...conceptRooms, "ห้อง Intro 2"];
    const list = [...conceptRooms];
    if (conceptRooms.length === 0) return "ไม่มีห้องเรียนเพิ่มเติมที่แนะนำ (เยี่ยมมาก!)";
    return list.join(", ");
});

// ----------------- Group B: text range -----------------
type BLevel = "EXCELLENT" | "GOOD" | "FAIR" | "DEVELOPING" | "NEEDS_IMPROVEMENT";

const bLevel = computed<BLevel>(() => {
    const s = totalScore.value;
    if (s >= 100) return "EXCELLENT";
    if (s >= 85) return "GOOD";
    if (s >= 70) return "FAIR";
    if (s >= 55) return "DEVELOPING";
    return "NEEDS_IMPROVEMENT";
});

const B_TEXT: Record<BLevel, { title: string; headline: string; desc: string; advice: string }> = {
    EXCELLENT: {
        title: "🏆 ระดับดีเยี่ยม (Excellent) — 100–119",
        headline: "เยี่ยมมากเลย!",
        desc: "นักเรียนมีความเข้าใจเรื่องเฟืองและหลักฟิสิกส์ที่เกี่ยวข้องได้อย่างลึกซึ้ง แสดงว่าสามารถเชื่อมโยงความรู้จากห้องเรียน 360 องศาได้ดีมาก 👏",
        advice: "ลองทบทวนเพิ่มเติมเฉพาะจุดที่นักเรียนยังไม่มั่นใจ และฝึกอธิบายแนวคิดให้เพื่อนๆ ฟัง จะช่วยให้เข้าใจยิ่งขึ้น",
    },
    GOOD: {
        title: "💪 ระดับดี (Good) — 85–99",
        headline: "เก่งมากเลย!",
        desc: "นักเรียนเข้าใจเนื้อหาได้ดีในภาพรวม สามารถคำนวณและอธิบายหลักการของเฟืองได้ถูกต้องเกือบทั้งหมด ⚙️",
        advice: "แนะนำให้กลับไปทบทวนเนื้อหาบาง concept ที่ยังสับสน เช่น การคำนวณอัตราทดเฟืองหรือการหาทิศทางหมุน เพื่อให้เข้าใจได้ 100% ✨",
    },
    FAIR: {
        title: "😊 ระดับพอใช้ (Fair) — 70–84",
        headline: "ทำได้ดีพอสมควร!",
        desc: "เข้าใจพื้นฐานของเฟืองและการใช้อุปกรณ์ได้ แต่ยังมีบางส่วนที่อาจต้องทบทวนเพิ่มเติม 🧠",
        advice: "ครูแนะนำให้กลับไปทบทวนเนื้อหา ในส่วนที่เกี่ยวกับ ขบวนเฟืองและ ทอร์ก อีก 1–2 รอบ เพื่อเพิ่มความมั่นใจ 💡",
    },
    DEVELOPING: {
        title: "🌱 ระดับกำลังพัฒนา (Developing) — 55–69",
        headline: "เริ่มเข้าใจหลักการแล้ว!",
        desc: "แต่ยังมีบางส่วนที่สับสนเรื่องการคำนวณและการประยุกต์ใช้ 👀",
        advice: "ควรทบทวนบทเรียนจากห้อง Concept 2–4 อย่างละเอียด โดยเฉพาะการหาความสัมพันธ์ของเฟืองและแรงบิด 🔧",
    },
    NEEDS_IMPROVEMENT: {
        title: "🔍 ระดับต้องพัฒนาเพิ่มเติม (Needs Improvement) — ต่ำกว่า 55",
        headline: "อย่าเพิ่งท้อเลยนะ! 🌻",
        desc: "ตอนนี้อาจยังต้องฝึกฝนอีกหน่อย เพื่อให้เข้าใจการทำงานของเฟืองและหลักฟิสิกส์ที่เกี่ยวข้อง",
        advice: "ลองกลับไปทบทวนเนื้อหาทีละ concept ช้าๆ พร้อมจดสรุป หรือขอคำแนะนำจากเพื่อนๆ ที่เรียนเข้าใจแล้วช่วยก็ได้ ครูเชื่อว่านักเรียนจะทำได้แน่นอน 💪❤️",
    },
};

const bLevelTitle = computed(() => B_TEXT[bLevel.value].title);
const bLevelHeadline = computed(() => B_TEXT[bLevel.value].headline);
const bDesc = computed(() => B_TEXT[bLevel.value].desc);
const bAdvice = computed(() => B_TEXT[bLevel.value].advice);

// ----------------- PRE: texts -----------------
const headerTitle = computed(() => (mode.value === "pre" ? "ผลการทำแบบทดสอบก่อนเรียน" : "ผลการทำแบบทดสอบหลังเรียน"));

const mainTitle = computed(() => {
    if (isGroupB.value && mode.value === "post") return "ผลลัพธ์หลังเรียนของนักเรียน";
    return mode.value === "pre" ? "ห้องเรียนที่นักเรียนต้องเข้าเรียนเพื่อเสริมทักษะ" : "สรุปผลหลังเรียน + จุดที่ควรทบทวนเพิ่มเติม";
});

const footerHint = computed(() => {
    if (isGroupB.value) return "";
    return "หลังจากทราบห้องเรียนแล้ว นักเรียนสามารถวางแผนวันเวลาเรียน ภายใน 1 เดือน (30 วัน) ก่อนเข้าร่วมแคมป์ ได้เลย";
});

const primaryButtonText = computed(() => (mode.value === "pre" ? "ไปวางแผนตารางเรียน" : "ไปดู Dashboard"));

function primaryAction() {
    if (mode.value === "pre") router.push("/planning");
    else router.push("/dashboard");
}

// ----------------- POST title/actions -----------------
const pageTitle = computed(() => (mode.value === "post" ? "ผลการทำแบบทดสอบหลังเรียน" : "ผลการทำแบบทดสอบก่อนเรียน"));

type MeResponse = {
  uid: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
};


// 2) Progress (used for postTestDone rule)
type ProgressState = {
  postTestDone?: boolean;
};
const { data: progress, refresh: refreshProgress } = useFetch<ProgressState>("/api/progress", {
  // if not logged in, /api/progress might 401 too — that’s OK
  // server: false,
  // lazy: true,
});

const logoutPending = ref(false);

async function logout() {
  try {
    logoutPending.value = true;
    await $fetch("/api/auth/logout", { method: "POST" });

    // refresh auth/progress states
    await refreshMe();
    await refreshProgress();

    // optional: redirect to home
    await navigateTo("/");
  } finally {
    logoutPending.value = false;
  }
}

function goDashboard() {
    router.push("/dashboard");
}
</script>
