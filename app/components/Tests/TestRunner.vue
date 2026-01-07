<template>
  <AssessmentLayout ref="layoutRef">
    <!-- HEADER -->
    <AssessmentHeader :title="`แบบทดสอบวัดความรู้เรื่องเฟือง (${modeLabel})`" :time-text="timeLeftText"
      :left-icon="getImageURL('images/cartoons/gear-calm.png')"
      :right-icon="getImageURL('images/cartoons/gear-time.png')" />

    <!-- MAIN QUESTION + BLOCKS -->
    <div v-if="step === 'practice'">
      <div v-if="question" class="w-full flex flex-col items-center justify-start mt-5">
        <div class="w-full flex">
          <div
            class="flex flex-1 items-center justify-center w-[120px] max-w-[120px] min-h-[120px] rounded-nw bg-white text-black text-[52px] shadow-md shadow-[#FFC233]">
            {{ question.mainNumber }}
          </div>
          <div
            class="flex flex-col flex-1 items-center justify-center text-[26px] rounded-nw shadow-sm shadow-[#FFC233] gap-3 p-5">
            <div>
              {{ question.mainText }}
            </div>
            <div v-if="question.mainImage" class="w-full h-fit flex items-center justify-center">
              <img class="max-w-[980px] h-auto rounded-nw cursor-zoom-in" :src="getImageURL(question.mainImage)" alt=""
                @click="openZoom(getImageURL(question.mainImage))" />
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

    <!-- SUMMARY (reusable component) -->
    <AssessmentSummary v-else-if="step === 'summary'" :mode-label="modeLabel" kind-label="แบบทดสอบ"
      :is-all-answered="isAllAnswered" :missing-questions="missingQuestions" :is-time-up="isTimeUp"
      :happy-image="getImageURL('images/cartoons/gear-happy.png')"
      :confused-image="getImageURL('images/cartoons/gear-confused.png')" @back="backToPractice"
      @goToFirstMissing="goToFirstMissing" @submit="submitFromSummary" />

  </AssessmentLayout>
</template>

<script setup>
import { questions as defaultQuestions } from '@/config/testConfig';
import { prePostTestAnswerKey } from '@/config/testAnswerKey';

import AssessmentHeader from '~/components/Tests/AssessmentHeader.vue';
import AssessmentLayout from '~/components/Tests/AssessmentLayout.vue';
import AssessmentSummary from '~/components/Tests/AssessmentSummary.vue';
import QuestionBlock from '~/components/Tests/QuestionBlock.vue';

import { useCountdown } from '~/composables/useCountdown';

const layoutRef = ref(null);

const scrollTop = async () => {
  await nextTick();
  layoutRef.value?.scrollToTop("smooth");
};

const { openModal } = useModal();

const openZoom = (src) => openModal("imageZoom", { src });

// ====== 4-tier → SC/LK → score ======

const CODE_SCORE = {
  SC: 7,
  LK1: 6,
  FP: 5,
  LK2: 4,
  FN: 3,
  LK3: 2,
  MSC: 1,
  LK4: 0,
};

/**
 * EXACT translation of your Excel IF logic.
 * Input: D,E,F,G ∈ {0,1}
 */
function classifyFromFlags(D, E, F, G) {
  if (D === 1 && E === 1 && F === 1 && G === 1) return 'SC';

  if (D === 1 && E === 1 && F === 1 && G === 0) return 'LK1';
  if (D === 1 && E === 0 && F === 1 && G === 1) return 'LK1';
  if (D === 1 && E === 0 && F === 1 && G === 0) return 'LK1';

  if (D === 1 && E === 1 && F === 0 && G === 1) return 'FP';

  if (D === 1 && E === 1 && F === 0 && G === 0) return 'LK2';
  if (D === 1 && E === 0 && F === 0 && G === 1) return 'LK2';
  if (D === 1 && E === 0 && F === 0 && G === 0) return 'LK2';

  if (D === 0 && E === 1 && F === 1 && G === 1) return 'FN';

  if (D === 0 && E === 1 && F === 1 && G === 0) return 'LK3';
  if (D === 0 && E === 0 && F === 1 && G === 1) return 'LK3';
  if (D === 0 && E === 0 && F === 1 && G === 0) return 'LK3';

  if (D === 0 && E === 1 && F === 0 && G === 1) return 'MSC';

  return 'LK4';
}

/**
 * TODO: Implement this from your 4-tier design.
 * It should derive the D,E,F,G flags (0/1) from a student's
 * raw answer for ONE section.
 *
 * You have everything you need in:
 *   - section: metadata of this sub-question
 *   - studentAnswer: value from allAnswers[questionId][sectionId]
 *   - correctAnswer: value from prePostTestAnswerKey[sectionId]
 *
 * For now this stub only distinguishes "correct vs incorrect" (D).
 */
function computeFlagsForQuestion(question, qAnswers) {
  const baseId = String(question.id);      // e.g. 1
  const id1 = `${baseId}.1`;              // 1.1
  const id2 = `${baseId}.2`;              // 1.2 (confidence)
  const id3 = `${baseId}.3`;              // 1.3
  const id4 = `${baseId}.4`;              // 1.4 (confidence)

  const ans1 = qAnswers[id1];
  const ans3 = qAnswers[id3];
  const conf1 = qAnswers[id2];
  const conf3 = qAnswers[id4];

  const correct1 = prePostTestAnswerKey[id1];
  const correct3 = prePostTestAnswerKey[id3];

  // ถ้าไม่มีเฉลย (เช่นบางข้อไม่มี 1.3) ก็จะได้ 0 อัตโนมัติ
  const D = correct1 ? (ans1 === correct1 ? 1 : 0) : 0;
  const E = correct3 ? (ans3 === correct3 ? 1 : 0) : 0;

  // แปลง 'confident' / 'not_confident' → 1 / 0
  const F = conf1 === 'confident' ? 1 : 0;
  const G = conf3 === 'confident' ? 1 : 0;

  return { D, E, F, G };
}

// ====== Concept mapping (T_jk) ======

// conceptId -> list of sectionIds (e.g. '1.1', '2.3', ...)
// MUST match the matrix in your Excel.
const CONCEPT_CONFIG = {
  C1: [1, 2, 4, 5, 6, 7],
  C2: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
  C3: [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17],
  C4: [3, 13, 14, 16],
};


// ====== Fuzzy membership for LOW / AVERAGE / HIGH ======

const FUZZY_PARAMS = {
  // TODO: set these from your sheet (for scores in 0–7)
  alpha: 0,
  beta: 3.5,
  gamma: 7,
};

function lowMembership(x, p = FUZZY_PARAMS) {
  const { alpha, beta, gamma } = p;
  if (x <= alpha) return 1;
  if (x <= beta) return 1 - 2 * Math.pow((x - alpha) / (gamma - alpha), 2);
  if (x <= gamma) return 2 * Math.pow((x - gamma) / (gamma - alpha), 2);
  return 0;
}

function averageMembership(x, p = FUZZY_PARAMS) {
  const { alpha, beta, gamma } = p;
  const mid1 = (alpha + beta) / 2;
  const mid2 = (beta + gamma) / 2;

  if (x <= alpha) return 0;
  if (x <= mid1) return 2 * Math.pow((x - alpha) / (beta - alpha), 2);
  if (x <= beta) return 1 - 2 * Math.pow((x - beta) / (beta - alpha), 2);
  if (x <= mid2) return 1 - 2 * Math.pow((x - beta) / (gamma - beta), 2);
  if (x <= gamma) return 2 * Math.pow((x - gamma) / (gamma - beta), 2);
  return 0;
}

function highMembership(x, p = FUZZY_PARAMS) {
  const { alpha, beta, gamma } = p;
  if (x <= alpha) return 0;
  if (x <= beta) return 2 * Math.pow((x - alpha) / (gamma - alpha), 2);
  if (x <= gamma) return 1 - 2 * Math.pow((x - gamma) / (gamma - alpha), 2);
  return 1;
}

/** Score_{i,k} = mean S_ij over items in each concept */
function computeConceptScores(itemScores) {
  const conceptScores = {};

  for (const [conceptId, questionIds] of Object.entries(CONCEPT_CONFIG)) {
    let sum = 0;
    let count = 0;

    for (const qId of questionIds) {
      const s = itemScores[qId];
      if (typeof s === 'number') {
        sum += s;
        count += 1;
      }
    }
    conceptScores[conceptId] = count > 0 ? sum / count : 0;
  }
  return conceptScores;
}


/** Compute fuzzy LOW/AVG/HIGH for each concept */
function computeFuzzyProfile(conceptScores) {
  const profile = {};

  for (const [conceptId, score] of Object.entries(conceptScores)) {
    const low = lowMembership(score);
    const avg = averageMembership(score);
    const high = highMembership(score);

    const max = Math.max(low, avg, high);
    let label = 'LOW';
    if (max === high) label = 'HIGH';
    else if (max === avg) label = 'AVERAGE';

    profile[conceptId] = { score, low, avg, high, label };
  }

  return profile;
}

const { getImageURL } = useAssetUrl();

const props = defineProps({
  mode: { type: String, default: 'pre' }, // 'pre' | 'post'
  questionListProp: { type: Array, default: () => [] },
});

const step = ref('practice'); // 'practice' | 'summary'

// ใช้ question list จาก prop หรือ default
const questionList = computed(() =>
  props.questionListProp.length ? props.questionListProp : defaultQuestions,
);

const currentIndex = ref(0);
const question = computed(() => questionList.value[currentIndex.value]);

// ---------- TIMER (60 MINUTES) ----------
const { timeLeftText, isTimeUp } = useCountdown(60 * 60, {
  onFinished() {
    // หมดเวลา → ไปหน้าสรุป
    step.value = 'summary';
  },
});

// ใช้ timestamp ง่าย ๆ สำหรับคำนวณ timeUsedSeconds (ไม่ต้องไปยุ่งกับ useCountdown ภายใน)
const startedAt = ref(Date.now());
onMounted(() => {
  startedAt.value = Date.now();
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

const modeLabel = computed(() =>
  props.mode === 'post' ? 'หลังเรียน' : 'ก่อนเรียน',
);

const isFirst = computed(() => currentIndex.value === 0);
const isLast = computed(() => currentIndex.value === questionList.value.length - 1);

const validateCurrentQuestion = () => {
  const q = question.value;
  if (!q) return true;

  // ถ้าอยากบังคับให้ตอบครบทุก section ของข้อปัจจุบัน → uncomment ส่วนนี้
  // const qAnswers = allAnswers.value[q.id] || {};
  // const missing = q.sections.filter((sec) => !qAnswers[sec.id]);
  // if (missing.length > 0) {
  //   alert('กรุณาตอบคำถามให้ครบทุกข้อก่อนไปต่อ');
  //   return false;
  // }

  return true;
};

const goPrev = async () => {
  if (isTimeUp.value) return;
  if (isFirst.value) return;
  currentIndex.value -= 1;

  await scrollTop();
};

const backToPractice = () => {
  if (isTimeUp.value) return;
  step.value = 'practice';
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

// กลุ่มเฉพาะ "ข้อใหญ่" ที่ยังมีคำถามย่อยขาดอยู่ (ไว้ใช้กับ AssessmentSummary)
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

  return result.sort((a, b) => a.mainNumber - b.mainNumber);
});

const isAllAnswered = computed(() => missingQuestions.value.length === 0);

const goToFirstMissing = () => {
  const first = missingQuestions.value[0];
  if (!first) return;

  const idx = questionList.value.findIndex((q) => q.id === first.questionId);
  if (idx !== -1) {
    currentIndex.value = idx;
    step.value = 'practice';
  }
};

const submitAll = async () => {
  const finishedAt = Date.now();

  const payload = {
    answers: allAnswers.value,
    startedAt: startedAt.value,
    finishedAt,
  };

  try {
    const res = await $fetch(`/api/tests/${props.mode}`, {
      method: "POST",
      body: payload,
    });

    // ✅ set correct flag based on mode
    await $fetch("/api/progress", {
      method: "POST",
      body: props.mode === "pre"
        ? { preTestDone: true }
        : { postTestDone: true },
    });

    alert("บันทึกผลแบบทดสอบเรียบร้อยแล้ว");

    const router = useRouter();
    const { data: me } = await useFetch("/api/auth/me");
    const group = me.value?.experimentGroup ?? "A";

    await router.push(props.mode === "pre" ? "/srm" : `/fuzzy-result?mode=post`);
  } catch (err) {
    console.error("❌ submit test failed:", err);
    alert("บันทึกผลแบบทดสอบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  }
};

const submitFromSummary = () => {
  if (!isAllAnswered.value && typeof window !== 'undefined') {
    const ok = window.confirm(
      'ยังมีข้อที่ยังไม่ได้ตอบ ต้องการส่งแบบทดสอบเลยหรือไม่?',
    );
    if (!ok) return;
  }
  submitAll();
};

const goNext = async () => {
  if (isTimeUp.value) return;
  if (!validateCurrentQuestion()) return;

  if (!isLast.value) {
    currentIndex.value += 1;
  } else {
    step.value = 'summary';
  }

  await scrollTop();
};
</script>
