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

          <div v-if="isInGrace" class="mt-6 text-[#D71C1C] text-[22px] font-bold text-center">
            หมดเวลา 60 นาทีแล้ว! มีเวลาแก้ไขเพิ่มเติมอีก 5 นาทีเท่านั้น
          </div>

          <div v-else-if="isFinalTimeUp" class="mt-6 text-[#D71C1C] text-[22px] font-bold text-center">
            หมดเวลาแล้ว ระบบกำลังส่ง{{ kindLabel }}อัตโนมัติ...
          </div>

          <!-- ปุ่มด้านล่าง -->
          <div class="absolute -bottom-7 flex left-0 w-full justify-evenly">
            <!-- Back / Go missing -->
            <button @click="goPrev" :disabled="isFirst"
              class="flex w-[300px] h-[80px] text-[26px] bg-[#9DA7A9] hover:bg-[#BDC3C9] text-black drop-shadow-xl rounded-[15px] items-center justify-center cursor-pointer"
              :class="{ 'opacity-40 cursor-not-allowed': isFirst }">
              {{
                isAllAnswered ? "ย้อนกลับไปทบทวน" : "ย้อนกลับไป"
              }}
            </button>
            <!-- Submit: allow always (even incomplete), but disable after final -->
            <button @click="goNext"
              class="flex w-[300px] h-[80px] text-[26px] bg-[#FFC233] hover:bg-[#B97530] text-black hover:text-white drop-shadow-xl rounded-[15px] items-center justify-center cursor-pointer">
              {{ isLast ? "ส่งแบบทดสอบ" : "ไปต่อเลย" }}
            </button>
          </div>
        </div>

        <!-- small progress text (optional) -->
        <div class="mt-10 text-white text-lg">
          ข้อที่ {{ currentIndex + 1 }} / {{ questionList.length }}
        </div>
      </div>

      <div v-else class="mt-20 text-white text-xl">ไม่พบข้อคำถาม</div>
    </div>

    <!-- SUMMARY (reusable component) -->
    <AssessmentSummary v-else-if="step === 'summary'" :mode-label="modeLabel" kind-label="แบบทดสอบ"
      :is-all-answered="isAllAnswered" :missing-questions="missingQuestions" :is-main-time-up="isMainTimeUp"
      :is-final-time-up="isFinalTimeUp" :is-in-grace="isInGrace"
      :happy-image="getImageURL('images/cartoons/gear-happy.png')"
      :confused-image="getImageURL('images/cartoons/gear-confused.png')" @back="backToPractice"
      @goToFirstMissing="goToFirstMissing" @submit="submitFromSummary" />
  </AssessmentLayout>
</template>

<script setup>
import { questions as defaultQuestions } from "@/config/testConfig";
import { prePostTestAnswerKey } from "@/config/testAnswerKey";

import AssessmentHeader from "~/components/Tests/AssessmentHeader.vue";
import AssessmentLayout from "~/components/Tests/AssessmentLayout.vue";
import AssessmentSummary from "~/components/Tests/AssessmentSummary.vue";
import QuestionBlock from "~/components/Tests/QuestionBlock.vue";

import { useCountdown } from "~/composables/useCountdown";

const layoutRef = ref(null);

const scrollTop = async () => {
  await nextTick();
  layoutRef.value?.scrollToTop("smooth");
};

const { openModal } = useModal();

const openZoom = (src) => openModal("imageZoom", { src });

const { getImageURL } = useAssetUrl();

const props = defineProps({
  mode: { type: String, default: "pre" }, // 'pre' | 'post'
  questionListProp: { type: Array, default: () => [] },
});

const step = ref("practice"); // 'practice' | 'summary'

// ใช้ question list จาก prop หรือ default
const questionList = computed(() =>
  props.questionListProp.length ? props.questionListProp : defaultQuestions
);

const currentIndex = ref(0);
const question = computed(() => questionList.value[currentIndex.value]);

// ---------- TIMER (60 MINUTES) ----------
const MAIN_SECONDS = 60 * 60;
const GRACE_SECONDS = 5 * 60;

const {
  timeLeftText,
  isMainTimeUp,
  isFinalTimeUp,
  isInGrace,
  startedAtMs,
  finalEndAtMs,
  clearStorage,
} = useCountdown(MAIN_SECONDS, GRACE_SECONDS, {
  storageKey: `test_timer_${props.mode}`,
  onFinished() {
    // final deadline reached => auto-submit with missing=0
    autoSubmitWithMissingAsZero();
  },
});

watch(
  isMainTimeUp,
  (up) => {
    if (up) {
      step.value = "summary";
    }
  },
  { immediate: true }
);

const autoSubmitLocked = ref(false);

async function autoSubmitWithMissingAsZero() {
  if (autoSubmitLocked.value) return;
  autoSubmitLocked.value = true;

  // If user already submitted manually before final deadline, don't double-submit:
  // (Better: also enforce on server by checking if tests/pre already exists)
  try {
    const finishedAt = Date.now();
    const filledAnswers = buildAnswersWithMissingFilled();

    await $fetch(`/api/tests/${props.mode}`, {
      method: "POST",
      body: {
        answers: filledAnswers,
        startedAt: startedAtMs.value,
        finishedAt,
        timeUsedSeconds: Math.max(
          0,
          Math.round((finishedAt - startedAtMs.value) / 1000)
        ),
        autoSubmitted: true, // optional flag for teacher
      },
    });

    await $fetch("/api/progress", {
      method: "POST",
      body:
        props.mode === "pre" ? { preTestDone: true } : { postTestDone: true },
    });

    clearStorage(); // prevent re-auto-submit on refresh

    alert("หมดเวลา ระบบส่งแบบทดสอบอัตโนมัติแล้ว");

    await navigateTo(props.mode === "pre" ? "/srm" : `/fuzzy-result?mode=post`);
  } catch (err) {
    console.error("❌ auto submit failed:", err);
    // fallback: keep them on summary; they can refresh and it will retry when computeRemaining runs
    autoSubmitLocked.value = false;
  }
}

const allAnswers = ref({});

watch(
  question,
  (q) => {
    if (!q) return;
    if (!allAnswers.value[q.id]) {
      allAnswers.value[q.id] = {};
    }
  },
  { immediate: true }
);

const modeLabel = computed(() =>
  props.mode === "post" ? "หลังเรียน" : "ก่อนเรียน"
);

const isFirst = computed(() => currentIndex.value === 0);
const isLast = computed(
  () => currentIndex.value === questionList.value.length - 1
);

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

const backToPractice = () => {
  // allow only during grace
  if (!isInGrace.value) return;

  step.value = "practice";
  // jump to last question or first missing (your choice)
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
    step.value = "practice";
  }
};

function buildAnswersWithMissingFilled() {
  // deep clone so we don't mutate UI state unexpectedly
  const filled = JSON.parse(JSON.stringify(allAnswers.value || {}));

  for (const q of questionList.value) {
    const qid = q.id;
    if (!filled[qid]) filled[qid] = {};

    for (const sec of q.sections) {
      const sid = sec.id;
      if (!filled[qid][sid]) {
        // choose what "0" means for your UI:
        // - multiple choice: "" or "0"
        // - confidence: "not_confident" maybe
        filled[qid][sid] = ""; // treat as missing => wrong
      }
    }
  }
  return filled;
}

const submitAll = async () => {
  const finishedAt = Date.now();

  const payload = {
    answers: allAnswers.value,
    startedAt: startedAtMs.value,
    finishedAt,
    timeUsedSeconds: Math.max(
      0,
      Math.round((finishedAt - startedAtMs.value) / 1000)
    ),
  };

  console.log("Submitting test payload:", payload);

  try {
    const res = await $fetch(`/api/tests/${props.mode}`, {
      method: "POST",
      body: payload,
    });

    // ✅ set correct flag based on mode
    await $fetch("/api/progress", {
      method: "POST",
      body:
        props.mode === "pre" ? { preTestDone: true } : { postTestDone: true },
    });

    alert("บันทึกผลแบบทดสอบเรียบร้อยแล้ว");

    const router = useRouter();
    const { data: me } = await useFetch("/api/auth/me");
    const group = me.value?.experimentGroup ?? "A";

    await router.push(
      props.mode === "pre" ? "/srm" : `/fuzzy-result?mode=post`
    );
  } catch (err) {
    console.error("❌ submit test failed:", err);
    alert("บันทึกผลแบบทดสอบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
  }
};

const submitFromSummary = () => {
  if (isFinalTimeUp.value) return;

  if (!isAllAnswered.value && typeof window !== "undefined") {
    const ok = window.confirm(
      "ยังมีข้อที่ยังไม่ได้ตอบ ต้องการส่งแบบทดสอบเลยหรือไม่?"
    );
    if (!ok) return;
  }
  submitAll();
};

const goPrev = async () => {
  if (isFinalTimeUp.value) return;
  if (isFirst.value) return;
  currentIndex.value -= 1;
  await scrollTop();
};

const goNext = async () => {
  if (isFinalTimeUp.value) return;
  if (!validateCurrentQuestion()) return;

  if (!isLast.value) currentIndex.value += 1;
  else step.value = "summary";

  await scrollTop();
};
</script>
