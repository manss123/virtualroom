<!-- pages/admin/fuzzy-playground.vue -->
<template>
    <div class="p-8 space-y-6 text-white">
        <h1 class="text-2xl font-semibold">
            Fuzzy Logic Test (สำหรับครูทดสอบ D/E/F/G)
        </h1>
        <p class="text-sm">
            ปรับค่า D/E/F/G ของแต่ละข้อ แล้วกด "Evaluate" เพื่อดูผล 8 ระดับ และ
            concept scores + fuzzy profile.
        </p>

        <!-- Table: set D/E/F/G per question -->
        <div class="overflow-x-auto border rounded-lg bg-white text-black">
            <table class="min-w-full text-sm">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-3 py-2 text-left">Q#</th>
                        <th class="px-3 py-2 text-left">Main text (ย่อ)</th>
                        <th class="px-3 py-2 text-center">D (Q .1 ถูก?)</th>
                        <th class="px-3 py-2 text-center">F (มั่นใจ .2)</th>
                        <th class="px-3 py-2 text-center">E (Q .3 ถูก?)</th>
                        <th class="px-3 py-2 text-center">G (มั่นใจ .4)</th>
                        <th class="px-3 py-2 text-center">Tier</th>
                        <th class="px-3 py-2 text-center">Score (0–7)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="q in questionRows" :key="q.id" class="border-t hover:bg-gray-50">
                        <td class="px-3 py-2 font-medium whitespace-nowrap">
                            {{ q.mainNumber }}
                        </td>
                        <td class="px-3 py-2 max-w-[280px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {{ q.mainText }}
                        </td>

                        <!-- D -->
                        <td v-if="flags[q.id]" class="px-3 py-2 text-center">
                            <select v-model.number="flags[q.id].D" class="border rounded px-2 py-1 text-sm">
                                <option :value="1">1</option>
                                <option :value="0">0</option>
                            </select>
                        </td>

                        <!-- F -->
                        <td v-if="flags[q.id]" class="px-3 py-2 text-center">
                            <select v-model.number="flags[q.id].F" class="border rounded px-2 py-1 text-sm">
                                <option :value="1">1</option>
                                <option :value="0">0</option>
                            </select>
                        </td>

                        <!-- E -->
                        <td v-if="flags[q.id]" class="px-3 py-2 text-center">
                            <select v-model.number="flags[q.id].E" class="border rounded px-2 py-1 text-sm">
                                <option :value="1">1</option>
                                <option :value="0">0</option>
                            </select>
                        </td>


                        <!-- G -->
                        <td v-if="flags[q.id]" class="px-3 py-2 text-center">
                            <select v-model.number="flags[q.id].G" class="border rounded px-2 py-1 text-sm">
                                <option :value="1">1</option>
                                <option :value="0">0</option>
                            </select>
                        </td>

                        <!-- Results from server -->
                        <td class="px-3 py-2 text-center">
                            {{ serverResult?.itemCodesByQuestionId?.[q.id] ?? "-" }}
                        </td>
                        <td class="px-3 py-2 text-center">
                            {{
                                serverResult?.itemScoresByQuestionId?.[q.id] !== undefined
                                    ? serverResult.itemScoresByQuestionId[q.id]
                                    : "-"
                            }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4">
            <button @click="resetAll" type="button" class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm">
                Reset ทุกข้อเป็น 0
            </button>

            <button @click="runPreview" type="button"
                class="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm disabled:opacity-50"
                :disabled="loading">
                {{ loading ? "กำลังประมวลผล..." : "Evaluate" }}
            </button>

            <p v-if="errorMessage" class="text-sm text-red-600">
                {{ errorMessage }}
            </p>
        </div>

        <!-- Concept scores + fuzzy profile -->
        <!-- Concept scores + fuzzy profile + learning path -->
        <div v-if="serverResult" class="grid grid-cols-1 md:grid-cols-3 gap-6 text-black">
            <!-- Concept scores -->
            <div class="border rounded-lg bg-white p-4">
                <h2 class="font-semibold mb-2">Concept Scores (เฉลี่ย 0–7)</h2>
                <ul class="space-y-1 text-sm">
                    <li v-for="(score, cid) in serverResult.conceptScores" :key="cid">
                        <span class="font-medium">{{ cid }}</span> :
                        <span>{{ score.toFixed(2) }}</span>
                    </li>
                </ul>
            </div>

            <!-- Fuzzy profile -->
            <div class="border rounded-lg bg-white p-4">
                <h2 class="font-semibold mb-2">Fuzzy Profile (LOW / AVERAGE / HIGH)</h2>
                <ul class="space-y-1 text-sm">
                    <li v-for="(pf, cid) in serverResult.fuzzyProfile" :key="cid">
                        <span class="font-medium">{{ cid }}</span> :
                        <span class="mr-2">label = {{ pf.label }}</span>
                        <span class="text-gray-500">
                            (low={{ pf.low.toFixed(2) }},
                            avg={{ pf.avg.toFixed(2) }},
                            high={{ pf.high.toFixed(2) }})
                        </span>
                    </li>
                </ul>
            </div>

            <!-- 🔥 Learning path -->
            <div class="border rounded-lg bg-white p-4">
                <h2 class="font-semibold mb-2">Learning Path (ตาม fuzzy)</h2>

                <div v-if="serverResult.learningPath && serverResult.learningPath.length" class="space-y-2 text-sm">
                    <div v-for="item in serverResult.learningPath" :key="item.conceptId"
                        class="flex items-start justify-between gap-2 border rounded px-2 py-1">
                        <div>
                            <div class="font-medium">{{ item.conceptId }}</div>
                            <div class="text-xs text-gray-600">
                                {{ learningActionLabel[item.action] ?? item.action }}
                            </div>
                        </div>

                        <span class="px-2 py-0.5 rounded-full text-xs font-semibold"
                            :class="learningLabelColor[item.fuzzyLabel] ?? 'bg-gray-100 text-gray-700'">
                            {{ item.fuzzyLabel }}
                        </span>
                    </div>
                </div>

                <p v-else class="text-sm text-gray-500">
                    ไม่มี concept ที่ต้องเรียนเพิ่ม (ทุกตัว HIGH / SKIP).
                </p>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { questions } from "~/config/testConfig";
import { prePostTestAnswerKey } from "~/config/testAnswerKey";

interface Flags {
    D: number;
    E: number;
    F: number;
    G: number;
}

const flags = ref<Record<number, Flags>>({});

const loading = ref(false);
const errorMessage = ref<string | null>(null);
const serverResult = ref<any | null>(null);

// for table rows
const questionRows = computed(() =>
    questions.map((q: any) => ({
        id: q.id as number,
        mainNumber: q.mainNumber,
        mainText: q.mainText,
    }))
);

// Map action code → Thai label
const learningActionLabel: Record<string, string> = {
    EXTRA: "เรียนเสริม (เนื้อหาเพิ่มเติม)",
    REVIEW: "ทบทวน / เรียนซ้ำ",
    SKIP: "ไม่อยู่ในเส้นทางการเรียน", // normallyจะไม่โผล่ใน learningPath
};

const learningLabelColor: Record<string, string> = {
    LOW: "bg-red-100 text-red-700",
    AVERAGE: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-green-100 text-green-700",
};


onMounted(() => {
    // initialize all flags to 0
    for (const q of questions as any[]) {
        flags.value[q.id] = { D: 0, E: 0, F: 0, G: 0 };
    }
});

function resetAll() {
    for (const q of questions as any[]) {
        flags.value[q.id] = { D: 0, E: 0, F: 0, G: 0 };
    }
    serverResult.value = null;
    errorMessage.value = null;
}

/**
 * Convert D/E/F/G for each question → synthetic `answers`
 * shaped like real student answers, so evaluateTest()
 * generates exactly the same flags again.
 */
function buildAnswersFromFlags(flagsInput: Record<number, Flags>) {
    const result: any = {};

    for (const q of questions as any[]) {
        const qFlags = flagsInput[q.id] || { D: 0, E: 0, F: 0, G: 0 };
        const baseId = String(q.id);
        const id1 = `${baseId}.1`;
        const id2 = `${baseId}.2`;
        const id3 = `${baseId}.3`;
        const id4 = `${baseId}.4`;

        const correct1 = prePostTestAnswerKey[id1];
        const correct3 = prePostTestAnswerKey[id3];

        const qAns: Record<string, string> = {};

        // 1.1 → D (ถูก/ผิด)
        if (correct1) {
            if (qFlags.D === 1) {
                qAns[id1] = correct1;
            } else {
                const sec1 = q.sections.find((s: any) => s.id === id1);
                const wrongOpt =
                    sec1?.options?.find((opt: any) => opt.value !== correct1) ?? null;
                if (wrongOpt) {
                    qAns[id1] = wrongOpt.value;
                }
            }
        }

        // 1.3 → E (ถูก/ผิด)
        if (correct3) {
            if (qFlags.E === 1) {
                qAns[id3] = correct3;
            } else {
                const sec3 = q.sections.find((s: any) => s.id === id3);
                const wrongOpt =
                    sec3?.options?.find((opt: any) => opt.value !== correct3) ?? null;
                if (wrongOpt) {
                    qAns[id3] = wrongOpt.value;
                }
            }
        }

        // 1.2 → F (มั่นใจ / ไม่)
        const has2 = q.sections.some((s: any) => s.id === id2);
        if (has2) {
            qAns[id2] = qFlags.F === 1 ? "confident" : "not_confident";
        }

        // 1.4 → G (มั่นใจ / ไม่)
        const has4 = q.sections.some((s: any) => s.id === id4);
        if (has4) {
            qAns[id4] = qFlags.G === 1 ? "confident" : "not_confident";
        }

        result[q.id] = qAns;
    }

    return result;
}

async function runPreview() {
    loading.value = true;
    errorMessage.value = null;
    serverResult.value = null;

    try {
        const answers = buildAnswersFromFlags(flags.value);
        const res = await $fetch("/api/tests/preview", {
            method: "POST",
            body: { answers },
        });

        // keep the whole object for display
        serverResult.value = res;
    } catch (err: any) {
        console.error(err);
        errorMessage.value =
            err?.data?.statusMessage ||
            err?.data?.message ||
            err?.message ||
            "เกิดข้อผิดพลาดในการคำนวณ";
    } finally {
        loading.value = false;
    }
}
</script>
