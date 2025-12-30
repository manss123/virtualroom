<template>
    <AssessmentLayout>
        <!-- HEADER -->
        <AssessmentHeader :title="`แบบประเมินเกี่ยวกับการรู้คิดและการควบคุมการรู้คิด`" :time-text="timeLeftText"
            :left-icon="getImageURL('images/cartoons/gear-calm.png')"
            :right-icon="getImageURL('images/cartoons/gear-time.png')" />

        <!-- PRACTICE STEP -->
        <div v-if="step === 'practice'" class="w-full flex flex-col">
            <!-- คำชี้แจง -->
            <div
                class="w-full flex items-center justify-center bg-[#C4C5C54D] p-10 rounded-nw shadow-md shadow-[#FFC233]">
                <div class="text-white text-[36px] font-medium">
                    คำชี้แจง
                </div>
            </div>

            <div
                class="w-full flex flex-col items-center justify-start bg-white rounded-nw shadow-lg shadow-[#FFC233] text-black py-20 gap-10">
                <div class="text-center text-[24px]">
                    เราต้องการทราบวิธีการเรียนและการทำงานที่นักเรียนใช้เมื่อส่งงานให้ครู ก่อนตอบคำถามแต่ละข้อ
                    <br />
                    ให้นักเรียนนึกถึงวิธีการเรียนที่ตนเองใช้ และวิธีการทำงานที่ปฏิบัติเมื่อได้รับมอบหมายจากครู
                    <br />
                    จากนั้นให้นักเรียนอ่านแต่ละข้อ และเลือกว่าตนเอง “เห็นด้วย” ในระดับใดกับข้อความนั้น
                    โดยมีระดับความคิดเห็นให้เลือก ได้แก่:
                </div>

                <!-- ตัวอย่างสเกล 5 ระดับ -->
                <div class="w-full max-w-[1380px] flex items-center justify-between gap-5">
                    <div v-for="opt in SCALE_OPTIONS" :key="opt.value"
                        class="w-[260px] h-[260px] flex flex-col items-center justify-center bg-[#EFF7F7] rounded-nw shadow-md shadow-[#00000040]">
                        <img :src="getImageURL(opt.icon)" />
                        <div class="text-[24px]">
                            {{ opt.label }}
                        </div>
                    </div>
                </div>

                <div class="text-center text-[36px]">
                    ให้นักเรียนคลิกเลือกระดับความเห็นด้วยของตนเองที่ตรงกับความคิดเห็นของตนเองมากที่สุด
                </div>

                <hr class="w-full max-w-[1250px] border-black" />

                <div class="text-center text-[24px]">
                    รายการประเมินองค์ประกอบที่เกี่ยวกับความรู้เกี่ยวกับการรู้คิด
                    (Knowledge of Cognition)
                    และการควบคุมการรู้คิด (Regulation of Cognition)
                </div>
            </div>

            <!-- TAB: ส่วนที่ 1 / 2 -->
            <div class="w-full flex items-center justify-between gap-[10px] text-black mt-[120px] mb-1">
                <button v-for="sec in questionnaireSections" :key="sec.id" @click="activeSectionId = sec.id" :class="[
                    'w-full text-center rounded-nw shadow-lg shadow-[#FFC233] py-5 text-[26px] font-medium cursor-pointer',
                    activeSectionId === sec.id ? 'bg-white text-black' : 'bg-transparent text-white',
                ]">
                    {{ sec.tabTitle }}
                </button>
            </div>

            <!-- เนื้อหาแบบประเมินของ section ปัจจุบัน -->
            <div v-if="activeSection"
                class="w-full flex flex-col items-center justify-start bg-white rounded-nw shadow-lg shadow-[#FFC233] text-black py-20 px-10 gap-10">
                <div v-for="cat in activeSection.categories" :key="cat.id" class="w-full flex flex-col gap-8 mt-6">
                    <!-- หัวข้อย่อยใน section -->
                    <div
                        class="w-full flex items-center justify-center text-[26px] bg-[#C4C5C54D] rounded-nw shadow-lg py-5 shadow-[#FFC233]">
                        {{ cat.title }}
                    </div>

                    <!-- แต่ละข้อในหัวข้อย่อย -->
                    <div v-for="item in cat.items" :key="item.id" class="w-full flex flex-col items-center mt-6">
                        <div class="w-full text-[24px] mb-9">
                            {{ item.globalNo }}. {{ item.text }}
                        </div>
                        <div class="w-full max-w-[1380px] flex items-center justify-between gap-5">
                            <div v-for="opt in SCALE_OPTIONS" :key="opt.value"
                                :class="scaleCardClasses(item.id, opt.value)" @click="setAnswer(item.id, opt.value)">
                                <img :src="getImageURL(opt.icon)" alt="" />
                                <div class="text-[24px]">
                                    {{ opt.label }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ปุ่มไปหน้าสรุป -->
                <div class="w-full flex justify-center mt-16">
                    <button
                        class="flex w-[300px] h-[80px] text-[26px] bg-[#FFC233] hover:bg-[#B97530] text-black hover:text-white drop-shadow-xl rounded-[15px] items-center justify-center cursor-pointer"
                        @click="goToSummary">
                        ไปดูสรุป
                    </button>
                </div>
            </div>
        </div>

        <!-- SUMMARY STEP -->
        <AssessmentSummary v-else-if="step === 'summary'" :mode-label="''" kind-label="แบบประเมิน"
            :is-all-answered="isAllAnswered" :missing-questions="missingQuestions" :is-time-up="isTimeUp"
            :happy-image="getImageURL('images/cartoons/gear-happy.png')"
            :confused-image="getImageURL('images/cartoons/gear-confused.png')" @back="backToPractice"
            @goToFirstMissing="goToFirstMissing" @submit="submitFromSummary" />
    </AssessmentLayout>
</template>

<script setup>
import AssessmentLayout from '~/components/Tests/AssessmentLayout.vue';
import AssessmentHeader from '~/components/Tests/AssessmentHeader.vue';
import AssessmentSummary from '~/components/Tests/AssessmentSummary.vue';
import { useCountdown } from '~/composables/useCountdown';

import {
    SRM_SCALE_OPTIONS,
    SRM_QUESTIONNAIRE_SECTIONS,
} from '@/config/srmConfig';

// definePageMeta({ middleware: ['auth'] });

const { getImageURL } = useAssetUrl();

/* ---------- PROPS ---------- */
// เผื่ออนาคตอยากมี post-SRM; ตอนนี้ใช้ 'pre' ไปก่อน
const props = defineProps({
    mode: { type: String, default: 'pre' }, // 'pre' | 'post'
});

/* ---------- STEP ---------- */
const step = ref('practice');

/* ---------- TIMER (60 MINUTES) ---------- */
const { timeLeftText, isTimeUp } = useCountdown(60 * 60, {
    onFinished() {
        step.value = 'summary';
    },
});

// ใช้ timestamp คำนวณเวลาใช้จริง
const startedAt = ref(Date.now());
onMounted(() => {
    startedAt.value = Date.now();
});

/* ---------- CONFIG ---------- */
const SCALE_OPTIONS = SRM_SCALE_OPTIONS;
const questionnaireSections = SRM_QUESTIONNAIRE_SECTIONS;

/* ---------- STATE ---------- */

const activeSectionId = ref('koc');

const activeSection = computed(() =>
    questionnaireSections.find((s) => s.id === activeSectionId.value),
);

// answers[itemId] = 1..5
const answers = ref({});

// flatten items (พร้อม sectionId/categoryId เพื่อสรุปคะแนน)
const allItems = computed(() => {
    const out = [];
    for (const sec of questionnaireSections) {
        for (const cat of sec.categories) {
            for (const item of cat.items) {
                out.push({
                    id: item.id,
                    globalNo: item.globalNo,
                    sectionId: sec.id,
                    categoryId: cat.id,
                });
            }
        }
    }
    return out;
});

/* ---------- CLASS / HANDLERS ---------- */

const scaleCardClasses = (itemId, value) => {
    const selected = answers.value[itemId] === value;
    return [
        'w-[260px] h-[260px] flex flex-col items-center justify-center rounded-nw shadow-md shadow-[#00000040] cursor-pointer',
        selected ? 'bg-[#FFC233]' : 'bg-[#EFF7F7] hover:bg-[#dce9e9]',
    ].join(' ');
};

const setAnswer = (itemId, value) => {
    if (isTimeUp.value) return;
    answers.value[itemId] = value;
};

/* ---------- VALIDATION / SUMMARY ---------- */

const missingItems = computed(() =>
    allItems.value.filter((item) => !answers.value[item.id]),
);

const missingQuestions = computed(() =>
    missingItems.value
        .map((item) => ({
            questionId: item.id,
            mainNumber: item.globalNo,
        }))
        .sort((a, b) => a.mainNumber - b.mainNumber),
);

const isAllAnswered = computed(() => missingQuestions.value.length === 0);

/* ---------- STEP HANDLERS ---------- */

const goToSummary = () => {
    step.value = 'summary';
};

const backToPractice = () => {
    if (isTimeUp.value) return;
    step.value = 'practice';
};

const goToFirstMissing = () => {
    const first = missingQuestions.value[0];
    if (!first) return;

    // หา section ที่มี item นี้ เพื่อสลับแท็บถูกด้าน
    const sec = questionnaireSections.find((s) =>
        s.categories.some((cat) =>
            cat.items.some((it) => it.id === first.questionId),
        ),
    );
    if (sec) {
        activeSectionId.value = sec.id;
    }
    step.value = 'practice';
};

/* ---------- BUILD PAYLOAD + API CALL ---------- */

const buildSrmPayload = () => {
    const ans = answers.value;

    const totalItems = allItems.value.length;
    let answeredItems = 0;
    let sumScore = 0;

    const sectionAgg = {};
    const categoryAgg = {};

    for (const item of allItems.value) {
        const v = ans[item.id];
        if (typeof v !== 'number') continue;

        answeredItems += 1;
        sumScore += v;

        if (!sectionAgg[item.sectionId]) {
            sectionAgg[item.sectionId] = { sum: 0, count: 0 };
        }
        sectionAgg[item.sectionId].sum += v;
        sectionAgg[item.sectionId].count += 1;

        if (!categoryAgg[item.categoryId]) {
            categoryAgg[item.categoryId] = { sum: 0, count: 0 };
        }
        categoryAgg[item.categoryId].sum += v;
        categoryAgg[item.categoryId].count += 1;
    }

    const averageScore = answeredItems > 0 ? sumScore / answeredItems : 0;

    const normalize = (obj) => {
        const out = {};
        for (const [key, val] of Object.entries(obj)) {
            const avg = val.count > 0 ? val.sum / val.count : 0;
            out[key] = { ...val, average: avg };
        }
        return out;
    };

    const now = Date.now();
    const timeUsedSeconds = Math.max(
        0,
        Math.floor((now - startedAt.value) / 1000),
    );

    return {
        mode: props.mode, // 'pre' | 'post' (ถ้าใช้)
        timeUsedSeconds,
        totalItems,
        answeredItems,
        averageScore,
        answers: ans,
        sectionScores: normalize(sectionAgg),   // koc, roc
        categoryScores: normalize(categoryAgg), // koc_dk, koc_pk, ...
    };
};

const submitAll = async () => {
    const payload = buildSrmPayload();
    console.log('✅ SRM payload:', payload);

    try {
        await $fetch(`/api/srm/${props.mode}`, {
            method: 'POST',
            body: payload,
        });

        await $fetch("/api/progress", {
            method: "POST",
            body: { questionnaireDone: true },
        });

        alert('บันทึกผลแบบประเมิน SRM เรียบร้อยแล้ว');
        // ตัวอย่าง: ไปหน้าต่อไป
        const router = useRouter();
        await router.push('/fuzzy-result');
    } catch (err) {
        console.error('❌ submit SRM failed:', err);
        alert('บันทึกผลแบบประเมินไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    }
};

const submitFromSummary = () => {
    if (!isAllAnswered.value && typeof window !== 'undefined') {
        const ok = window.confirm(
            'ยังมีข้อที่ยังไม่ได้ตอบ ต้องการส่งแบบประเมินเลยหรือไม่?',
        );
        if (!ok) return;
    }
    // คืน promise ก็ได้เผื่ออยาก await ที่อื่น
    return submitAll();
};
</script>
