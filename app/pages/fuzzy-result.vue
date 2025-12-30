<template>
    <div class="relative w-full flex h-full items-center justify-center pl-[20%]">
        <div class="w-full max-w-5xl">
            <div class="w-full flex">
                <div
                    class="w-full flex items-center justify-center text-[26px] rounded-nw shadow-sm shadow-[#FFC233] gap-3 p-5">
                    <div class="text-[#FFC233]">
                        ผลการทำแบบทดสอบก่อนเรียน
                    </div>
                </div>
            </div>

            <div
                class="relative w-full min-h-[500px] flex flex-col items-center justify-center bg-white rounded-nw shadow-md shadow-[#FFC233]">
                <!-- หัวข้อหลัก -->
                <div class="text-[36px] text-center text-[#342F35]">
                    ห้องเรียนที่นักเรียนต้องเข้าเรียนเพื่อเสริมทักษะ
                </div>

                <!-- ข้อความอธิบาย -->
                <div
                    class="text-[#342F35] bg-[#C4C5C5] py-10 w-full text-[36px] font-medium text-center mt-8 flex justify-center items-center">
                    <div class="flex w-full max-w-8/12">
                        {{ learningPathText }}
                    </div>
                </div>

                <div class="text-[#342F35] text-[26px] text-center mt-4 px-6">
                    หลังจากทราบห้องเรียนแล้ว นักเรียนสามารถวางแผนวันเวลาเรียน <br>
                    ภายใน 1 เดือน (30 วัน) ก่อนเข้าร่วมแคมป์ ได้เลย
                </div>

                <!-- ปุ่มด้านล่าง -->
                <div class="absolute -bottom-7 flex left-0 w-full justify-evenly">
                    <button @click="goPlanSchedule"
                        class="flex w-[300px] h-[80px] text-[26px] bg-[#FFC233] hover:bg-[#B97530] text-black hover:text-white drop-shadow-xl rounded-[15px] items-center justify-center cursor-pointer">
                        ไปวางแผนตารางเรียน
                    </button>
                </div>
            </div>
        </div>

        <!-- รูปภาพด้านซ้าย -->
        <div class="absolute left-[14%] flex w-fit h-full items-center justify-end">
            <img class="w-auto h-auto pointer-events-none" :src="getImageURL('images/cartoons/gear-wow.png')">
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

// definePageMeta({
//     middleware: ["auth"], // ใช้ middleware เดียวกับหน้าแบบทดสอบ
// });

const { getImageURL } = useAssetUrl();
const router = useRouter();

// ---------------- API call: get pre-test result ----------------
const pending = ref(true);
const errorMessage = ref<string | null>(null);
const result = ref<any | null>(null);

try {
    const { data, error } = await useFetch("/api/tests/pre", {
        method: "GET",
    });

    if (error.value) {
        console.error(error.value);
        errorMessage.value =
            (error.value.data as any)?.statusMessage ??
            (error.value.data as any)?.message ??
            "ไม่สามารถโหลดผลแบบทดสอบได้";
    } else {
        result.value = data.value?.result ?? null;
    }
} catch (err: any) {
    console.error(err);
    errorMessage.value = err?.message ?? "ไม่สามารถโหลดผลแบบทดสอบได้";
} finally {
    pending.value = false;
}

// ---------------- Map concepts → nice labels ----------------
type LearningAction = "EXTRA" | "REVIEW" | "SKIP";

interface LearningPathItem {
    conceptId: "C1" | "C2" | "C3" | "C4" | string;
    fuzzyLabel: "LOW" | "AVERAGE" | "HIGH";
    action: LearningAction;
}

// concept display names (ปรับข้อความได้ตามโจทย์จริง)
const CONCEPT_LABELS: Record<string, { short: string; full: string }> = {
    C1: {
        short: "ห้อง Concept 1",
        full: "ห้อง Concept 1: Idler Gear (เฟืองตัวกลาง)",
    },
    C2: {
        short: "ห้อง Concept 2",
        full: "ห้อง Concept 2: Variable Gear Ratio (อัตราทดที่เปลี่ยนได้)",
    },
    C3: {
        short: "ห้อง Concept 3",
        full: "ห้อง Concept 3: Simple Gear Train (ชุดเฟืองอย่างง่าย)",
    },
    C4: {
        short: "ห้อง Concept 4",
        full: "ห้อง Concept 4: Compound Gear Train (ชุดเฟืองประกอบ)",
    },
};

// build final rooms: Intro 1 + dynamic concepts + Intro 2
const learningPathRooms = computed(() => {
    const rooms: {
        key: string;
        label: string;
        description?: string;
    }[] = [];

    // always start with Intro 1
    rooms.push({
        key: "intro1",
        label: "ห้อง Intro 1",
        description: "ปูพื้นฐานความรู้เกี่ยวกับเฟืองและการทำงานเบื้องต้น",
    });

    const learningPath = (result.value?.learningPath ?? []) as LearningPathItem[];

    for (const item of learningPath) {
        const cfg = CONCEPT_LABELS[item.conceptId] ?? null;
        if (!cfg) continue;

        let actionText = "";
        if (item.action === "EXTRA") {
            actionText = "เรียนเสริมแบบเข้มข้น";
        } else if (item.action === "REVIEW") {
            actionText = "ทบทวนเนื้อหาให้มั่นใจมากขึ้น";
        }

        // short label for main line, detail for bottom list
        rooms.push({
            key: item.conceptId,
            label: cfg.short,
            description: `${cfg.full} – ${actionText}`,
        });
    }

    // always end with Intro 2
    rooms.push({
        key: "intro2",
        label: "ห้อง Intro 2",
        description: "เตรียมตัวก่อนเข้าห้องเรียนเสมือนจริง Mazipano 360°",
    });

    return rooms;
});

const learningPathText = computed(() =>
    learningPathRooms.value.map((r) => r.label).join(", ")
);

// ---------------- Navigation ----------------
function goPlanSchedule() {
    router.push("/planning");
}
</script>

<style lang="scss" scoped></style>