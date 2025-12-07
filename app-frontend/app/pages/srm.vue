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
                    เราต้องการทราบวิธีการเรียนและการทำงานที่นักเรียนใช้เมื่อส่งงานให้ครู ก่อนตอบคำถามแต่ละข้อ <br />
                    ให้นักเรียนนึกถึงวิธีการเรียนที่ตนเองใช้ และวิธีการทำงานที่ปฏิบัติเมื่อได้รับมอบหมายจากครู <br />
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
                    (Knowledge of Cognition) และการควบคุมการรู้คิด (Regulation of Cognition)
                </div>
            </div>

            <!-- TAB: ส่วนที่ 1 / 2 -->
            <div class="w-full flex items-center justify-between gap-[10px] text-black mt-[120px] mb-1">
                <button v-for="sec in questionnaireSections" :key="sec.id" @click="activeSectionId = sec.id" :class="[
                    'w-full text-center rounded-nw shadow-lg shadow-[#FFC233] py-5 text-[26px] font-medium cursor-pointer',
                    activeSectionId === sec.id
                        ? 'bg-white text-black'
                        : 'bg-transparent text-white',
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
                    <div v-for="item in cat.items" :key="item.id" class="w-full flex flex-col mt-6">
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

        <!-- SUMMARY STEP (ใช้ AssessmentSummary.vue ร่วมกับหน้า Test.vue) -->
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

const { getImageURL } = useAssetUrl();

/* ---------- STEP ---------- */
const step = ref('practice');

/* ---------- TIMER (60 MINUTES) ---------- */
const { timeLeftText, isTimeUp } = useCountdown(60 * 60, {
    onFinished() {
        // หมดเวลา → ไปหน้าสรุปอัตโนมัติ
        step.value = 'summary';
    },
});

/* ---------- SCALE OPTIONS (5 ระดับ) ---------- */
const SCALE_OPTIONS = [
    { value: 1, label: 'ไม่เห็นด้วยอย่างมาก', icon: 'images/cartoons/1.png' },
    { value: 2, label: 'ไม่เห็นด้วย', icon: 'images/cartoons/2.png' },
    { value: 3, label: 'ไม่แน่ใจ', icon: 'images/cartoons/3.png' },
    { value: 4, label: 'เห็นด้วย', icon: 'images/cartoons/4.png' },
    { value: 5, label: 'เห็นด้วยอย่างมาก', icon: 'images/cartoons/5.png' },
];

/* ---------- QUESTIONNAIRE CONFIG ---------- */
/**
 * globalNo = เลขข้อรวมทั้งฉบับ (1–36)
 */
const questionnaireSections = [
    {
        id: 'koc',
        tabTitle: '1. Knowledge of Cognition',
        categories: [
            {
                id: 'koc_dk',
                title:
                    '1. ความรู้เกี่ยวกับข้อเท็จจริงที่จำเป็นต้องมี (Declarative Knowledge)',
                items: [
                    {
                        id: 'koc_1',
                        globalNo: 1,
                        text: 'ฉันรู้ว่าฉันเรียนเก่งเรื่องใด อ่อนเรื่องใด',
                    },
                    {
                        id: 'koc_2',
                        globalNo: 2,
                        text: 'ฉันรู้ว่าอะไรเป็นสิ่งสำคัญที่สุดที่ควรเรียนรู้',
                    },
                    {
                        id: 'koc_3',
                        globalNo: 3,
                        text:
                            'ในการเรียนแต่ละครั้ง ฉันรู้ว่าครูคาดหวังให้ฉันเรียนรู้อะไรบ้าง',
                    },
                    {
                        id: 'koc_4',
                        globalNo: 4,
                        text: 'ฉันจำข้อมูลต่าง ๆ ได้ดี',
                    },
                    {
                        id: 'koc_5',
                        globalNo: 5,
                        text: 'ฉันสามารถควบคุมตัวเองให้เรียนรู้ได้',
                    },
                    {
                        id: 'koc_6',
                        globalNo: 6,
                        text:
                            'ฉันสามารถประเมินตัวฉันเองได้ว่าเรียนรู้ได้ดีแค่ไหน',
                    },
                    {
                        id: 'koc_7',
                        globalNo: 7,
                        text: 'ฉันเรียนบางเรื่องได้ดีเมื่อฉันสนใจในสิ่งนั้น',
                    },
                ],
            },
            {
                id: 'koc_pk',
                title:
                    '2. ความรู้เกี่ยวกับกระบวนการทำงาน (Procedural Knowledge)',
                items: [
                    {
                        id: 'koc_8',
                        globalNo: 8,
                        text:
                            'ฉันพยายามใช้วิธีการทำงานที่เคยใช้สำเร็จในอดีต',
                    },
                    {
                        id: 'koc_9',
                        globalNo: 9,
                        text:
                            'ในการแก้ปัญหา ฉันรู้ว่าวิธีการที่ฉันใช้จะเกิดผลลัพธ์เฉพาะๆ ใดบ้าง',
                    },
                    {
                        id: 'koc_10',
                        globalNo: 10,
                        text:
                            'ในระหว่างเรียน ฉันรู้ตัวว่าตัวเองกำลังเรียนด้วยวิธีการใด',
                    },
                    {
                        id: 'koc_11',
                        globalNo: 11,
                        text:
                            'ฉันเป็นคนที่เลือกใช้วิธีการเรียนที่เหมาะสมได้โดยไม่ต้องมีใครบอก',
                    },
                ],
            },
            {
                id: 'koc_ck',
                title:
                    '3. ความรู้เกี่ยวกับเงื่อนไขการทำงานให้สำเร็จ (Conditional Knowledge)',
                items: [
                    {
                        id: 'koc_12',
                        globalNo: 12,
                        text:
                            'ฉันเรียนได้ดีเมื่อฉันรู้อะไรบางอย่าง ของสิ่งนั้นแล้ว',
                    },
                    {
                        id: 'koc_13',
                        globalNo: 13,
                        text:
                            'ฉันใช้วิธีการเรียนหลากหลายวิธี ขึ้นอยู่กับสถานการณ์',
                    },
                    {
                        id: 'koc_14',
                        globalNo: 14,
                        text:
                            'เมื่อไม่มีอารมณ์ที่จะเรียน ฉันสามารถกระตุ้นให้ตัวเองเรียนได้',
                    },
                    {
                        id: 'koc_15',
                        globalNo: 15,
                        text:
                            'ฉันใช้จุดแข็งชดเชยจุดอ่อนทางการเรียนของฉัน',
                    },
                    {
                        id: 'koc_16',
                        globalNo: 16,
                        text:
                            'ในการแก้ปัญหาที่ครูสั่งฉันรู้ว่า วิธีการแก้ปัญหาที่ฉันใช้จะสำเร็จมากที่สุดเมื่อใด',
                    },
                ],
            },
        ],
    },
    {
        id: 'roc',
        tabTitle: '2. Regulation of Cognition',
        categories: [
            {
                id: 'roc_pl',
                title: '1. การวางแผน (Planning)',
                items: [
                    {
                        id: 'roc_17',
                        globalNo: 17,
                        text:
                            'ในขณะเรียน ฉันวางจังหวะการเรียนเรื่องต่าง ๆ ให้มีเวลามากพอไม่รีบร้อน',
                    },
                    {
                        id: 'roc_18',
                        globalNo: 18,
                        text:
                            'ก่อนลงมือทำงาน ฉันคิดก่อนว่าจะต้องรู้อะไรก่อน จึงจะทำสำเร็จ',
                    },
                    {
                        id: 'roc_19',
                        globalNo: 19,
                        text:
                            'ก่อนลงมือทำงานฉันจะตั้งเป้าหมาย ความสำเร็จไว้ก่อน',
                    },
                    {
                        id: 'roc_20',
                        globalNo: 20,
                        text:
                            'ก่อนทำงาน ฉันตั้งคำถามตัวเองก่อนว่าวัสดุอุปกรณ์ที่ต้องใช้มีอะไร ใช้อย่างไร',
                    },
                    {
                        id: 'roc_21',
                        globalNo: 21,
                        text:
                            'ในการแก้ปัญหาที่ครูสั่ง ฉันคิดหาวิธีหลายๆ วิธี แล้วเลือกวิธีที่ดีที่สุด',
                    },
                    {
                        id: 'roc_22',
                        globalNo: 22,
                        text:
                            'ฉันอ่านคำสั่งอย่างละเอียดก่อนเริ่มทำงานที่ครูมอบหมาย',
                    },
                    {
                        id: 'roc_23',
                        globalNo: 23,
                        text:
                            'ฉันแบ่งเวลาทำงานเพื่อให้ทำงานให้ดีที่สุด',
                    },
                ],
            },
            {
                id: 'roc_cm',
                title: '2. การกำกับความเข้าใจ (Comprehension Monitoring)',
                items: [
                    {
                        id: 'roc_24',
                        globalNo: 24,
                        text:
                            'ฉันถามตัวเองอยู่เสมอว่าทำงานเสร็จตามเป้าหมายหรือยัง',
                    },
                    {
                        id: 'roc_25',
                        globalNo: 25,
                        text:
                            'ในการแก้ไขปัญหาฉันคิดหาวิธีการที่หลากหลาย',
                    },
                    {
                        id: 'roc_26',
                        globalNo: 26,
                        text:
                            'ในระหว่างทำงาน เมื่อมีทางเลือกหลายทางฉันถามตัวเองว่าจะเลือกทางไหนดี',
                    },
                    {
                        id: 'roc_27',
                        globalNo: 27,
                        text:
                            'ฉันชอบใช้เวลาทบทวนเรื่องราวต่าง ๆ เพื่อให้เกิดความเข้าใจมากขึ้น',
                    },
                    {
                        id: 'roc_28',
                        globalNo: 28,
                        text:
                            'ฉันประเมินข้อดีและข้อเสียของวิธีที่ฉันใช้เรียน',
                    },
                    {
                        id: 'roc_29',
                        globalNo: 29,
                        text:
                            'ในระหว่างเรียน ฉันหาเวลาทบทวนความรู้ความเข้าใจของฉัน',
                    },
                    {
                        id: 'roc_30',
                        globalNo: 30,
                        text:
                            'ในการเรียนเรื่องใหม่ๆ ฉันถามตัวเองว่าเรียนได้ดีแค่ไหน',
                    },
                ],
            },
            {
                id: 'roc_es',
                title:
                    '3. กลยุทธ์การประเมินความสำเร็จของงาน (Evaluation Strategies)',
                items: [
                    {
                        id: 'roc_31',
                        globalNo: 31,
                        text:
                            'ฉันรู้คุณภาพของงานที่ฉันทำเสร็จแล้ว',
                    },
                    {
                        id: 'roc_32',
                        globalNo: 32,
                        text:
                            'หลังจากทำงานเสร็จแล้วฉันถามตัวเองว่ามีวิธีการอื่นที่ง่ายกว่านี้อีกมั้ย',
                    },
                    {
                        id: 'roc_33',
                        globalNo: 33,
                        text:
                            'เมื่อทำงานเสร็จฉันจดสรุปสิ่งที่ได้เรียนรู้จากการทำงานนั้น',
                    },
                    {
                        id: 'roc_34',
                        globalNo: 34,
                        text:
                            'เมื่อทำงานเสร็จฉันถามตัวเองว่างานที่ทำเสร็จบรรลุเป้าหมายหรือไม่',
                    },
                    {
                        id: 'roc_35',
                        globalNo: 35,
                        text:
                            'ในการทำงาน ฉันถามตัวเองว่าได้ลองใช้วิธีการที่เป็นไปได้ครบถ้วนแล้วหรือยัง',
                    },
                    {
                        id: 'roc_36',
                        globalNo: 36,
                        text:
                            'เมื่อทำงานที่ครูสั่งเสร็จแล้ว ฉันถามตัวเองว่าฉันเกิดการเรียนรู้จากงานได้เท่ากับที่คาดหวังไว้หรือยัง',
                    },
                ],
            },
        ],
    },
];

/* ---------- STATE ---------- */

const activeSectionId = ref('koc');

const activeSection = computed(() =>
    questionnaireSections.find((s) => s.id === activeSectionId.value),
);

// answers[itemId] = 1..5
const answers = ref({});

/* flatten items for validation */
const allItems = computed(() => {
    const out = [];
    for (const sec of questionnaireSections) {
        for (const cat of sec.categories) {
            for (const item of cat.items) {
                out.push({ id: item.id, globalNo: item.globalNo });
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

    // หา section ที่มี item นี้ เพื่อสลับแท็บไปถูกด้าน
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

const submitAll = () => {
    console.log('✅ SRM answers:', JSON.stringify(answers.value, null, 2));
    // TODO: call API / navigate to result page
};

const submitFromSummary = () => {
    if (!isAllAnswered.value && typeof window !== 'undefined') {
        const ok = window.confirm(
            'ยังมีข้อที่ยังไม่ได้ตอบ ต้องการส่งแบบประเมินเลยหรือไม่?',
        );
        if (!ok) return;
    }
    submitAll();
};
</script>
