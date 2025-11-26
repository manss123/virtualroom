<template>
    <div class="w-full h-full flex justify-center text-[#FFC233] px-[130px] overflow-auto">
        <div class="w-full flex flex-col justify-start items-center max-w-[1660px]">

            <!-- HEADER -->
            <div class="flex w-full justify-between items-center mt-6">
                <div class="flex items-center">
                    <img class="w-[118px] h-auto" :src="getImageURL('images/cartoons/gear-calm.png')" alt="" />
                    <div class="text-[36px] ml-4">
                        แบบทดสอบวัดความรู้เรื่องเฟือง ({{ modeLabel }})
                    </div>
                </div>

                <div class="flex items-center gap-5">
                    <div class="text-[36px]">เวลาที่เหลือ:</div>
                    <div
                        class="flex items-center justify-center text-[36px] w-[250px] h-20 rounded-nw bg-[#FF0000] text-white font-bold">
                        {{ timeLeftText }}
                    </div>
                    <img class="w-[118px] h-auto" :src="getImageURL('images/cartoons/gear-time.png')" alt="" />
                </div>
            </div>

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
                                <img class="max-w-[980px] h-auto rounded-nw" :src="getImageURL(question.mainImage)"
                                    alt="" srcset="">
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
            <div v-else-if="step === 'summary'" class="relative w-full flex items-center justify-center pl-[20%]">
                <div class="w-full max-w-[1024px]">
                    <div class="w-full flex">
                        <div
                            class="w-full flex items-center justify-center text-[26px] rounded-nw shadow-sm shadow-[#FFC233] gap-3 p-5">
                            <div>
                                แจ้งสถานะการทำแบบทดสอบ
                            </div>
                        </div>
                    </div>

                    <div
                        class="relative w-full min-h-[500px] flex flex-col items-center justify-center bg-white rounded-nw shadow-md shadow-[#FFC233]">
                        <!-- หัวข้อหลัก: เปลี่ยนข้อความตาม isAllAnswered -->
                        <div class="text-[48px] font-bold text-center"
                            :class="isAllAnswered ? 'text-[#1CD725]' : 'text-[#D71C1C]'">
                            <template v-if="isAllAnswered">
                                ยินดีด้วย! <br />
                                ทำครบทุกข้อแล้วครับ!!
                            </template>
                            <template v-else>
                                เอ๊ะๆ! ทำแบบทดสอบ <br>
                                ยังไม่ครบทุกข้อนะครับ!!
                            </template>
                        </div>

                        <!-- ข้อความอธิบาย -->
                        <div v-if="isAllAnswered" class="text-[#342F35] text-[26px] font-medium text-center mt-8">
                            นักเรียนทำแบบทดสอบ{{ modeLabel }}ครบทุกข้อแล้ว <br />
                            สามารถไปต่อหรือกลับไปทบทวนคำตอบในเวลาที่เหลือได้ครับ
                        </div>

                        <div v-else class="text-[#342F35] text-[22px] font-medium text-center mt-8 px-6">
                            นักเรียนยังเหลือแบบทดสอบ จำนวน
                            <span class="font-bold text-[#FF0000]">
                                {{ missingQuestions.length }}
                            </span> ข้อ คือ ข้อ <br>
                            <span class="font-bold text-[#FF0000]">
                                {{missingQuestions.map(q => q.mainNumber).join(', ')}}
                            </span>
                        </div>


                        <!-- รายการข้อที่ยังไม่ได้ตอบ -->
                        <!-- <div v-if="!isAllAnswered"
                            class="mt-8 max-h-[220px] w-full px-10 overflow-y-auto text-[#342F35] text-[20px]">
                            <div class="font-semibold mb-3">
                                รายการข้อที่ยังไม่ได้ตอบ
                            </div>
                            <ul class="space-y-2">
                                <li v-for="item in missingItems" :key="`${item.questionId}-${item.sectionId}`"
                                    class="flex items-start justify-between bg-[#FFF7D6] rounded-nw px-4 py-2">
                                    <div>
                                        <div class="font-medium">
                                            ข้อที่ {{ item.mainNumber }} ({{ item.sectionId }})
                                        </div>
                                        <div class="text-[18px]">
                                            {{ item.prompt }}
                                        </div>
                                    </div>
                                    <button class="ml-4 text-[16px] underline text-[#B97530]"
                                        @click="goToMissing(item)">
                                        ไปที่ข้อนี้
                                    </button>
                                </li>
                            </ul>
                        </div> -->

                        <!-- ปุ่มด้านล่าง -->
                        <div class="absolute -bottom-7 flex left-0 w-full justify-evenly">
                            <!-- ถ้าตอบครบแล้ว: ย้อนกลับไปทบทวน -->
                            <!-- ถ้ายังไม่ครบ: ไปที่ข้อที่ยังไม่ตอบข้อแรก -->
                            <button @click="isAllAnswered ? backToPractice() : goToFirstMissing()" :class="[
                                'flex w-[300px] h-[80px] text-[26px] bg-[#9DA7A9] hover:bg-[#BDC3C9] text-black drop-shadow-xl rounded-[15px] items-center justify-center cursor-pointer',
                                isTimeUp ? 'opacity-40 cursor-not-allowed' : '',
                            ]" :disabled="isTimeUp">
                                {{ isAllAnswered ? 'ย้อนกลับไปทบทวน' : 'กลับไปทำข้อที่ยังไม่ครบ' }}
                            </button>

                            <button v-if="isAllAnswered" @click="submitFromSummary"
                                class="flex w-[300px] h-[80px] text-[26px] bg-[#FFC233] hover:bg-[#B97530] text-black hover:text-white drop-shadow-xl rounded-[15px] items-center justify-center cursor-pointer">
                                {{ isAllAnswered ? 'ส่งแบบทดสอบ' : 'ส่งแบบทดสอบ (ยังไม่ครบ)' }}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="absolute left-[14%] flex w-fit h-full items-center justify-end">
                    <img class="w-auto h-full pointer-events-none"
                        :src="isAllAnswered ? getImageURL('images/cartoons/gear-happy.png') : getImageURL('images/cartoons/gear-confused.png')"
                        alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { questions as defaultQuestions } from '@/config/testConfig';

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
const TOTAL_SECONDS = 60 * 60; // 60 minutes
const remainingSeconds = ref(TOTAL_SECONDS);
let timerId = null;

const timeLeftText = computed(() => {
    const m = Math.floor(remainingSeconds.value / 60);
    const s = remainingSeconds.value % 60;
    const mm = m.toString().padStart(2, '0');
    const ss = s.toString().padStart(2, '0');
    return `${mm} : ${ss}`;
});

const isTimeUp = computed(() => remainingSeconds.value <= 0);

const handleTimeUp = () => {
    console.log('⏰ Time is up! Auto submit (or show summary):', JSON.stringify(allAnswers.value, null, 2));
    // ถ้าอยาก auto-submit จริง ๆ:
    // submitAll();

    // หรือถ้าอยากให้เด็กเห็นหน้าสรุปก่อน:
    step.value = 'summary';
};

onMounted(() => {
    timerId = setInterval(() => {
        if (remainingSeconds.value > 0) {
            remainingSeconds.value -= 1;
        } else {
            if (timerId) clearInterval(timerId);
            timerId = null;
            handleTimeUp();
        }
    }, 1000);
});

onBeforeUnmount(() => {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
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
