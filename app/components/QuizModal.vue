<template>
  <div v-if="quiz" class="rounded-nw shadow-xl overflow-visible">
    <!-- STEP: QUIZ -->
    <template v-if="step === 'quiz'">
      <div class="w-full text-white font-bold text-center py-4 text-xl">
        <div class="text-center text-3xl font-bold">{{ quiz.title }}</div>
      </div>

      <div class="flex w-full items-stretch">
        <div class="flex items-center justify-center bg-white rounded-nw min-w-[130px] min-h-[130px]">
          <div class="text-3xl">
            {{ index + 1 }} / {{ quiz.items.length }}
          </div>
        </div>

        <div class="flex flex-1 items-center justify-start rounded-nw bg-[#342F35] text-white py-5">
          <div class="w-full flex flex-col items-center justify-center">
            <div class="text-center text-[26px]">
              <div v-html="renderKatex(item.question)"></div>
            </div>

            <div v-if="item.image" class="flex justify-center mt-4 mb-6">
              <img :src="getImageURL(item.image)" class="max-w-6/12 max-h-[550px] rounded" />
            </div>
          </div>
        </div>
      </div>

      <div class="p-8 bg-white rounded-nw relative flex flex-col justify-center items-center w-full overflow-visible">
        <button type="button"
          class="absolute -left-8 px-4 py-2 rounded-full bg-[#342F35] text-amber-400 border-white border-2"
          :class="index !== 0 ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'" @click="prev"
          :disabled="index === 0">
          ◀
        </button>

        <button type="button"
          class="absolute -right-8 px-4 py-2 rounded-full bg-[#342F35] text-amber-400 border-white border-2"
          :class="index !== quiz.items.length - 1 ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'" @click="next"
          :disabled="index === quiz.items.length - 1">
          ▶
        </button>

        <div class="grid grid-cols-2 gap-6 w-10/12">
          <button v-for="opt in item.options" :key="opt.value" type="button"
            :class="[optionClasses(opt.value, 'flex-col w-full min-h-[120px] h-fit p-4')]"
            @click="answers[item.id] = opt.value">
            <!-- IMAGE OPTION -->
            <template v-if="opt.image">
              <img :src="getImageURL(opt.image)" :alt="opt.alt || opt.text || `option ${opt.value}`"
                class="max-h-[220px] w-auto object-contain select-none pointer-events-none" draggable="false" />
              <!-- optional small label under image -->
              <div v-if="opt.text" class="mt-2 text-sm text-gray-700">
                <span v-html="renderKatex(opt.text)"></span>
              </div>
            </template>

            <!-- TEXT OPTION (fallback) -->
            <template v-else>
              <span v-html="renderKatex(opt.text || '')"></span>
            </template>
          </button>

        </div>
      </div>

      <div class="mt-8 flex justify-center gap-4">
        <button type="button" class="px-10 py-4 rounded-nw bg-[#9DA7A9] text-black cursor-pointer" @click="close">
          กลับไปเรียนใหม่
        </button>

        <button type="button" class="px-10 py-4 rounded-nw bg-[#FFC233] text-black"
          :class="!isAllAnswered ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#B97530] hover:text-white cursor-pointer'"
          :disabled="!isAllAnswered" @click="submit">
          ส่งคำตอบ
        </button>
      </div>

      <div v-if="!isAllAnswered" class="mt-3 text-center text-sm text-white">
        *กรุณาตอบให้ครบทุกข้อก่อนส่งคำตอบ
      </div>
    </template>

    <!-- STEP: RESULT -->
    <template v-else>
      <div class="relative w-[1100px] max-w-[92vw] overflow-visible">
        <!-- header bar -->
        <div class="bg-[#3a3a3a] text-[#FFC233] text-center py-4 font-bold text-2xl rounded-nw">
          Quiz Feedback
        </div>

        <!-- robot (optional) -->
        <img :src="result?.passed ? '/images/cartoons/gear-happy.png' : '/images/cartoons/gear-sad.png'"
          class="absolute -left-10 -bottom-8 w-[420px] pointer-events-none" alt="" />

        <div class="px-12 py-14 text-center bg-white rounded-nw">
          <div class="text-4xl font-extrabold mb-4" :class="result?.passed ? 'text-[#1CD725]' : 'text-red-600'">
            {{ result?.passed ? 'ยินดีด้วย! ผ่าน Quiz แล้ว!!' : 'เอ๊ะ...เหมือนว่ายังต้องกลับไปทำใหม่นะ' }}
          </div>

          <div class="text-2xl font-medium text-gray-800">
            ได้คะแนน {{ result?.correct }} / {{ result?.total }}
          </div>

          <div v-if="result?.passed" class="font-medium text-xl mt-5">
            นักเรียนทำแบบฝึกหัดผ่านเกณฑ์การทดสอบบทนี้แล้ว <br>
            สามารถไปบทเรียนต่อหรือกลับไปที่หน้าสารบัญได้ครับ
          </div>
          <div v-else class="font-medium text-xl mt-5">
            นักเรียนทำแบบฝึกหัดยังไม่ผ่านเกณฑ์การทดสอบบทนี้ <br>
            สามารถกลับไปทบทวนบทเรียนใหม่หรือทำแบบฝึกหัดใหม่อีกครั้ง
          </div>

          <div class="mt-10 flex justify-center gap-6">
            <!-- NOT PASS -->
            <template v-if="!result?.passed">
              <button class="px-10 py-4 rounded-nw bg-[#9DA7A9] text-black cursor-pointer" @click="close">
                กลับไปเรียนใหม่
              </button>
              <button class="px-10 py-4 rounded-nw bg-[#FFC233] text-black" @click="retry">
                กลับไปทำใหม่
              </button>
            </template>

            <!-- PASS -->
            <template v-else>
              <button class="px-10 py-4 rounded-nw bg-[#9DA7A9] text-black cursor-pointer" @click="goHome">
                กลับไปหน้าสารบัญ
              </button>
              <button class="px-10 py-4 rounded-nw bg-[#FFC233] text-black" @click="goNext">
                ไปต่อเลย
              </button>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { QUIZZES } from "@/config/quizzes";
import { useModal, emitModalEvent } from "~/composables/useModal";
import katex from "katex";

const props = defineProps<{ quizId: string; hotspotId?: string; roomKey?: string }>();
const { closeModal } = useModal();
const { getImageURL } = useAssetUrl();

const quiz = computed(() => QUIZZES[props.quizId]);
const index = ref(0);
const answers = reactive<Record<string, string>>({});
const result = ref<{ passed: boolean; correct: number; total: number } | null>(null);

const step = computed(() => (result.value ? "result" : "quiz"));
const item = computed(() => quiz.value.items[index.value]);

const isAllAnswered = computed(() => {
  const q = quiz.value;
  if (!q) return false;
  return q.items.every((it: any) => !!answers[it.id]);
});

function prev() {
  if (index.value > 0) index.value--;
}
function next() {
  if (quiz.value && index.value < quiz.value.items.length - 1) index.value++;
}

const optionClasses = (value: string, extra = "") =>
  [
    "flex items-center justify-center rounded-nw shadow-md shadow-[#00000040] cursor-pointer",
    "bg-[#EFF7F7] hover:bg-[#bdcece]",
    extra,
    answers[item.value.id] === value && "!bg-[#FFC233] !text-black",
  ]
    .filter(Boolean)
    .join(" ");

function submit() {
  if (!quiz.value) return;
  if (!isAllAnswered.value) return;

  const total = quiz.value.items.length;
  let correct = 0;
  for (const q of quiz.value.items) {
    if (answers[q.id] === q.answer) correct++;
  }

  const passed = correct >= quiz.value.passCorrect;
  result.value = { passed, correct, total };

  emitModalEvent("quiz:submitted", {
    quizId: quiz.value.id,
    roomKey: props.roomKey,
    hotspotId: props.hotspotId,
    passed,
    correct,
    total,
    answers: JSON.parse(JSON.stringify(answers)),
  });

}

function renderKatex(input: string) {
  // render $$...$$ blocks as display math
  return input.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    return katex.renderToString(math, {
      displayMode: true,
      throwOnError: false,
    });
  })
  // render $...$ blocks as inline math (optional)
  .replace(/\$([^\$]+?)\$/g, (_, math) => {
    return katex.renderToString(math, {
      displayMode: false,
      throwOnError: false,
    });
  });
}

function goHome() {
  closeModal();
  emitModalEvent("quiz:action", {
    action: "goHome",
    quizId: props.quizId,
    hotspotId: props.hotspotId,
    roomKey: props.roomKey,
    passed: true,
  });
}

function goNext() {
  closeModal();
  emitModalEvent("quiz:action", {
    action: "goNext",
    quizId: props.quizId,
    hotspotId: props.hotspotId,
    roomKey: props.roomKey,
    passed: true,
  });
}

function retry() {
  Object.keys(answers).forEach((k) => delete answers[k]);
  index.value = 0;
  result.value = null;
}


function close() {
  closeModal();
  emitModalEvent("quiz:action", {
    action: "close",
    quizId: props.quizId,
    hotspotId: props.hotspotId,
    roomKey: props.roomKey,
  });
}
</script>
