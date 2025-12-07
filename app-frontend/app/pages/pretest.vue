<template>
    <AssessmentLayout>
        <AssessmentHeader :title="`แบบทดสอบวัดความรู้เรื่องเฟือง (${modeLabel})`" :time-text="timeLeftText"
            :left-icon="getImageURL('images/cartoons/gear-calm.png')"
            :right-icon="getImageURL('images/cartoons/gear-time.png')" />

        <!-- MAIN QUESTION + BLOCKS -->
        <div v-if="step === 'practice'">
            <div v-if="question" class="w-full flex flex-col items-center justify-start mt-5">
                <div class="w-full flex">
                    <div
                        class="flex flex-1 items-center justify-center w-[120px] max-w-[120px] h-full min-h-[120px] rounded-nw bg-white text-black text-[52px] shadow-md shadow-[#FFC233]">
                        {{ question.mainNumber }}
                    </div>
                    <div
                        class="flex flex-col flex-1 items-center justify-center text-[26px] rounded-nw shadow-sm shadow-[#FFC233] gap-3 p-5">
                        <div>
                            {{ question.mainText }}
                        </div>
                        <div v-if="question.mainImage" class="w-full h-fit flex items-center justify-center">
                            <img class="max-w-[980px] h-auto rounded-nw" :src="getImageURL(question.mainImage)" alt=""
                                srcset="">
                        </div>
                    </div>
                </div>

                <div
                    class="relative w-full flex flex-col shadow shadow-[#FFC233] rounded-nw bg-white text-black text-[24px] py-14 px-20 gap-6">
                    <!-- all sections of current question -->
                    <QuestionBlock v-for="section in question.sections" :key="section.id" :block="section"
                        v-model="allAnswers[question.id][section.id]" />

                    <div class="absolute -bottom-7 flex left-0 w-full justify-evenly">
                        <button @click="goPrev" :disabled="isFirst"
                            class="flex w-[300px] h-[80px] text-[26px] bg-[#9DA7A9] hover:bg-[#BDC3C9] text-black drop-shadow-xl rounded-[15px] items-center justify-center cursor-pointer"
                            :class="{ 'opacity-40 cursor-not-allowed': isFirst }">
                            ย้อนกลับไป
                        </button>
                        <button @click="goNext"
                            class="flex w-[300px] h-[80px] text-[26px] bg-[#FFC233] hover:bg-[#B97530] text-black hover:text-white drop-shadow-xl rounded-[15px] items-center justify-center cursor-pointer">
                            {{ isLast ? 'ส่งแบบทดสอบ' : 'ไปต่อเลย' }}
                        </button>
                    </div>
                </div>

                <!-- small progress text (optional) -->
                <div class="mt-10 text-white text-lg">
                    ข้อที่ {{ currentIndex + 1 }} / {{ questionList.length }}
                </div>
            </div>

            <div v-else class="mt-20 text-white text-xl">
                ไม่พบข้อคำถาม
            </div>
        </div>
        <AssessmentSummary v-else-if="step === 'summary'" :mode-label="''"
            kind-label="แบบประเมิน"
            :is-all-answered="isAllAnswered"
            :missing-questions="missingQuestions"
            :is-time-up="isTimeUp"
            :happy-image="getImageURL('images/cartoons/gear-happy.png')"
            :confused-image="getImageURL('images/cartoons/gear-confused.png')"
            @back="backToPractice"
            @goToFirstMissing="goToFirstMissing"
            @submit="submitFromSummary" />
    </AssessmentLayout>
</template>

<script setup>
import { questions as defaultQuestions } from '@/config/testConfig';
import AssessmentHeader from '~/components/Tests/AssessmentHeader.vue';
import AssessmentLayout from '~/components/Tests/AssessmentLayout.vue';
import AssessmentSummary from '~/components/Tests/AssessmentSummary.vue';
import QuestionBlock from '~/components/Tests/QuestionBlock.vue';
import { useCountdown } from '~/composables/useCountdown';

definePageMeta({ middleware: ['auth'] });

const { getImageURL } = useAssetUrl();

const props = defineProps({
    mode: { type: String, default: 'pre' }, // 'pre' | 'post'
    questionListProp: { type: Array, default: () => [] },
});

const step = ref('practice'); // 'practice' | 'summary'

const questionList = computed(
    () => (props.questionListProp.length ? props.questionListProp : defaultQuestions),
);

const currentIndex = ref(0);
const question = computed(() => questionList.value[currentIndex.value]);

// ---------- TIMER (60 MINUTES) ----------
const { timeLeftText, isTimeUp } = useCountdown(60 * 60, {
    onFinished() {
        // หมดเวลา → เปิดหน้าสรุป / auto submit
        step.value = 'summary';
    },
});

const handleTimeUp = () => {
    console.log('⏰ Time is up! Auto submit (or show summary):', JSON.stringify(allAnswers.value, null, 2));
    // ถ้าอยาก auto-submit จริง ๆ:
    // submitAll();

    // หรือถ้าอยากให้เด็กเห็นหน้าสรุปก่อน:
    step.value = 'summary';
};

onMounted(() => {
    // timerId = setInterval(() => {
    //     if (remainingSeconds.value > 0) {
    //         remainingSeconds.value -= 1;
    //     } else {
    //         if (timerId) clearInterval(timerId);
    //         timerId = null;
    //         handleTimeUp();
    //     }
    // }, 1000);
});

onBeforeUnmount(() => {
    // if (timerId) {
    //     clearInterval(timerId);
    //     timerId = null;
    // }
});
// ----------------------------------------

// allAnswers = { '1': { '1.1': 'a', '1.2': 'confident', ... }, '2': {...}, ... }
const allAnswers = ref({});

// ensure slot for current question exists
watch(
    question,
    (q) => {
        if (!q) return;
        if (!allAnswers.value[q.id]) {
            allAnswers.value[q.id] = {};
        }
    },
    { immediate: true },
);

const modeLabel = computed(() => (props.mode === 'post' ? 'หลังเรียน' : 'ก่อนเรียน'));

const isFirst = computed(() => currentIndex.value === 0);
const isLast = computed(() => currentIndex.value === questionList.value.length - 1);

const validateCurrentQuestion = () => {
    const q = question.value;
    if (!q) return true;

    const qAnswers = allAnswers.value[q.id] || {};
    const missing = q.sections.filter((sec) => !qAnswers[sec.id]);

    // if (missing.length > 0) {
    //     alert('กรุณาตอบคำถามให้ครบทุกข้อก่อนไปต่อ');
    //     return false;
    // }
    return true;
};

const goPrev = () => {
    if (isTimeUp.value) return; // หมดเวลาแล้วห้ามกดย้อน
    if (isFirst.value) return;
    currentIndex.value -= 1;
};

const backToPractice = () => {
    if (isTimeUp.value) return;
    step.value = 'practice';
    // ถ้าอยากกลับไปข้อสุดท้าย:
    currentIndex.value = questionList.value.length - 1;
};

const missingItems = computed(() => {
    const result = [];

    for (const q of questionList.value) {
        const qAnswers = allAnswers.value[q.id] || {};
        for (const sec of q.sections) {
            if (!qAnswers[sec.id]) {
                result.push({
                    questionId: q.id,
                    mainNumber: q.mainNumber,
                    sectionId: sec.id,
                    prompt: sec.prompt,
                });
            }
        }
    }

    return result;
});

// กลุ่มเฉพาะ "ข้อใหญ่" ที่ยังมีคำถามย่อยขาดอยู่ (ไม่สนใจว่าขาดกี่ข้อย่อย)
const missingQuestions = computed(() => {
    const seen = new Set();
    const result = [];

    for (const item of missingItems.value) {
        if (!seen.has(item.questionId)) {
            seen.add(item.questionId);
            result.push({
                questionId: item.questionId,
                mainNumber: item.mainNumber,
            });
        }
    }

    // เรียงตามหมายเลขข้อ
    return result.sort((a, b) => a.mainNumber - b.mainNumber);
});

// true ถ้าตอบครบทุกข้อใหญ่ (และทุกข้อย่อย)
const isAllAnswered = computed(() => missingQuestions.value.length === 0);


const goToMissing = (item) => {
    if (isTimeUp.value) return;
    const idx = questionList.value.findIndex((q) => q.id === item.questionId);
    if (idx !== -1) {
        currentIndex.value = idx;
        step.value = 'practice';
    }
};

const goToFirstMissing = () => {
    const first = missingQuestions.value[0];
    if (!first) return;

    const idx = questionList.value.findIndex((q) => q.id === first.questionId);
    if (idx !== -1) {
        currentIndex.value = idx;
        step.value = 'practice';
    }
};



const submitAll = () => {
    console.log('✅ All answers:', JSON.stringify(allAnswers.value, null, 2));
    // TODO: call API / navigate to summary result page

    navigateTo('/srm', { replace: true })
};

const submitFromSummary = () => {
    if (!isAllAnswered.value && typeof window !== 'undefined') {
        const ok = window.confirm('ยังมีข้อที่ยังไม่ได้ตอบ ต้องการส่งแบบทดสอบเลยหรือไม่?');
        if (!ok) return;
    }
    submitAll();
};


const goNext = () => {
    if (isTimeUp.value) return;
    if (!validateCurrentQuestion()) return;

    if (!isLast.value) {
        currentIndex.value += 1;
    } else {
        // ทำครบทุกข้อแล้ว → ไป step summary ก่อนส่งจริง
        step.value = 'summary';
    }
};

</script>
