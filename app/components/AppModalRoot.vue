<template>
  <teleport to="body">
    <div v-if="state.open" class="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
      @click="state.type === 'imageZoom' ? closeModal : null">
      <div class="relative max-w-6xl" @click.stop :class="state.type === 'imageZoom' ? 'w-fit' : 'w-[90vw]'">
        <button type="button" v-if="state.type === 'imageZoom'"
          class="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-black shadow flex items-center justify-center cursor-pointer"
          @click="closeModal" aria-label="Close">
          ✕
        </button>

        <!-- IMAGE ZOOM -->
        <div v-if="state.type === 'imageZoom'" class="max-w-[95vw] max-h-[90vh] overflow-auto rounded-lg bg-black">
          <img :src="(state.payload as any)?.src" alt="" class="block" />
        </div>

        <!-- YOUTUBE VIDEO -->
        <div v-else-if="state.type === 'youtubeVideo'" class="w-full flex flex-col items-center justify-center">
          <div class="text-white text-lg lg:text-xl 2xl:text-3xl text-center mb-6 w-full">
            {{ (state.payload as any)?.label || "วิดีโอการเรียนรู้" }}
          </div>

          <div class="bg-black rounded-2xl overflow-hidden aspect-video max-h-[65vh] relative w-full">
            <!-- YT injects iframe here -->
            <div ref="ytEl" class="w-full h-full"></div>
          </div>

          <button
            class="mt-6 font-medium text-[26px] bg-[#FFC233] text-black rounded-nw px-10 py-4 cursor-pointer hover:bg-[#B97530] hover:text-white transition w-[284px]"
            @click="closeModal">
            ไปต่อได้เลย
          </button>
        </div>

        <!-- ROOM INTRO MODAL (robot clicked) -->
        <div v-else-if="state.type === 'roomIntro'" class="w-[90vw] max-w-6xl">
          <div class="rounded-2xl overflow-hidden bg-white">
            <div class="bg-[#3b3b3b] text-[#FFC233] text-4xl font-semibold py-5 px-8 text-center">
              {{ roomIntro.title }}
            </div>

            <div class="p-8 grid grid-cols-12 gap-8 items-center">
              <!-- left robot image -->
              <div class="col-span-12 md:col-span-4 flex justify-center">
                <img src="/hotspots/robot.png" class="max-w-[280px] w-full h-auto" alt="Gyro Robot" />
              </div>

              <!-- right text -->
              <div class="col-span-12 md:col-span-8 text-[#3f3f3f] text-xl leading-relaxed whitespace-pre-line">
                {{ roomIntro.body }}
              </div>
            </div>

            <div class="pb-8 flex justify-center">
              <button
                class="mt-2 font-medium text-[22px] bg-[#FFC233] text-black rounded-nw px-10 py-4 cursor-pointer hover:bg-[#B97530] hover:text-white transition"
                @click="closeModal">
                เข้าใจแล้ว ไปต่อเลย
              </button>
            </div>
          </div>
        </div>


        <!-- QUIZ -->
        <div v-else-if="state.type === 'quiz'" class="w-[90vw] max-w-[1100px]">
          <quiz-modal :quiz-id="(state.payload as any)?.quizId" :hotspot-id="(state.payload as any)?.hotspotId"
            :room-key="(state.payload as any)?.roomKey" />
        </div>

      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useModal, emitModalEvent } from "~/composables/useModal";

const { state, closeModal } = useModal();

const ytEl = ref<HTMLElement | null>(null);
const ytPlayer = ref<any | null>(null);
const ytReady = ref(false);

function loadYouTubeAPI(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as any;

  if (ytReady.value || (w.YT && w.YT.Player)) {
    ytReady.value = true;
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      prev && prev();
      ytReady.value = true;
      resolve();
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
}

function destroyPlayer() {
  if (ytPlayer.value) {
    try {
      ytPlayer.value.stopVideo?.();
      ytPlayer.value.destroy?.();
    } catch { }
    ytPlayer.value = null;
  }
}

async function ensureYoutubePlayer(videoId: string, hotspotId?: string) {
  if (typeof window === "undefined") return;
  const w = window as any;

  await nextTick();
  await loadYouTubeAPI();
  await nextTick();

  if (!ytEl.value) return;

  // Re-create fresh each open (simple + avoids “stale iframe” issues)
  destroyPlayer();

  ytPlayer.value = new w.YT.Player(ytEl.value, {
    videoId,
    events: {
      onStateChange: (event: any) => {
        if (event.data === w.YT.PlayerState.ENDED) {
          emitModalEvent("youtube:ended", { videoId, hotspotId });
        }
      },
    },
  });
}

// ESC close
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape" && state.open) closeModal();
};

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  destroyPlayer();
});

// When modal changes, set up / tear down YT player
watch(
  () => [state.open, state.type, (state.payload as any)?.videoId] as const,
  async ([open, type, videoId]) => {
    if (!open || type !== "youtubeVideo" || !videoId) {
      destroyPlayer();
      return;
    }

    const hotspotId = (state.payload as any)?.hotspotId as string | undefined;
    await ensureYoutubePlayer(videoId, hotspotId);
  }
);

const ROOM_INTRO_TEXT: Record<string, { title: string; body: string }> = {
  intro1: {
    title: "ห้อง Intro 1",
    body: `🎉✨ สวัสดี ไจโรเอง ยินดีต้อนรับเข้าสู่ห้องเรียน Intro 1! ✨🎉

เราจะมาเริ่มต้นการผจญภัยในโลกของ “เฟือง” กันที่นี่แหละ! 🧠⚙️
ในห้องเรียนนี้ เป็นห้องเรียนสำคัญมากเลยนะ เพราะเราจะได้เรียนรู้พื้นฐานของเฟือง 🌀
รู้จักชนิดของเฟืองแต่ละแบบ และเรียนรู้วิธีใช้ ชุดเซ็ตเฟืองการเรียนรู้สำหรับวัดความเร็วรอบ
ซึ่งเป็นอุปกรณ์สุดเจ๋งที่นักเรียนจะต้องใช้ต่อในห้องเรียน 360 องศาด้วยนะ! 🌍

🤖✨ ขอให้นักเรียนทุกคนตั้งใจเรียน และลองฝึกใช้อุปกรณ์แต่ละอย่างให้คล่องเลยนะ
รับรองว่า พอเข้าใจแล้ว จะสนุกสุดๆ ไปกับการเรียนรู้เรื่องเฟืองแน่นอนเลย! 💪😄`,
  },
  C1: {
    title: "🎯 ห้อง Concept 1 — เฟืองส่งผ่าน (Idler Gear)",
    body: `สวัสดี~ วันนี้เราจะมารู้จัก “เฟืองส่งผ่าน” กันนะ ⚙️
ในห้องนี้ นักเรียนจะได้เรียนรู้ว่าเฟืองส่งผ่านคืออะไร 💭
มาดูกันว่าเมื่อต่อเฟืองหลายตัวเข้าด้วยกัน ทิศทางการหมุนจะเป็นยังไง 🔄
และยังจะได้ฝึกสังเกต “จำนวนรอบที่เฟืองหมุน” ของแต่ละตัวด้วย!
พร้อมไหม? ไปหมุนเฟืองด้วยกันเลย~ 😄` },
  C2: {
    title: "💪 ห้อง Concept 2 — ฟิสิกส์ของเฟืองและทอร์ก",
    body: `เย้~ มาต่อกันที่ห้องที่ 2 🤓
ในห้องนี้เราจะลงลึกเรื่อง ฟิสิกส์ที่ซ่อนอยู่ในเฟือง! ⚙️
นักเรียนจะได้เรียนรู้เรื่อง “แรงบิด” หรือ ทอร์ก (Torque) 🌀
พร้อมทั้งเข้าใจ “ที่มาของสูตรอัตราทดเฟือง” จากหลักการ การเคลื่อนที่แบบวงกลม 🧭
ฟังดูเท่ใช่ไหมล่ะ? มาเรียนรู้ไปพร้อมกันเลย! 🚀` },
  C3: {
    title: "⚙️ ห้อง Concept 3 — ขบวนเฟืองอย่างง่าย (Simple Gear Train)", body: `ยินดีต้อนรับเข้าสู่โลกของ “ขบวนเฟืองอย่างง่าย” จ้า! 😍
ในห้องนี้ เราจะมาดูกันว่าเฟืองหลายตัวต่อกันยังไง
ถึงจะทำงานได้ตามที่เราต้องการ 🛠️
นักเรียนจะได้ฝึก ประยุกต์ใช้ขบวนเฟืองอย่างง่าย
และลองทำ โจทย์ปัญหาจากสถานการณ์จริงในชีวิตประจำวัน เช่น
เครื่องปั่น มอเตอร์หรือแม้แต่ของเล่นก็มีเฟืองนะ! 🚲
มาทดลองคำนวณไปพร้อมๆ กันเลย! 📏📘` },
  C4: {
    title: "🔩 ห้อง Concept 4 — ขบวนเฟืองทดหลายชุด (Compound Gear Train)", body: `ว้าว~ มาถึงห้องที่ 4 แล้ว! 🎉
ในห้องนี้เราจะเรียนรู้ “ขบวนเฟืองทดหลายชุด” กัน 🧩
ดู แผนผังของขบวนเฟือง (Schematic) และวิธีการต่อเฟืองหลายชุดให้ทำงานร่วมกันได้ 💫
รวมถึงฝึก ประยุกต์ใช้งานจริง และ ทำโจทย์การคำนวณจากสถานการณ์ในชีวิตประจำวัน ด้วยนะ 🔍
พร้อมหมุนต่ออีกขั้นไปด้วยกันไหม~? 😄` },
  intro2: {
    title: "🌟 ห้อง Intro 2 — การวัดแรงดึงทอร์ก", body: `ฮัลโหล~ กลับมาพบกันอีกครั้งในห้อง Intro 2 🎬
หลังจากที่นักเรียนได้เรียนพื้นฐานเฟืองทั้งหมดไปแล้ว
ห้องนี้ก็สำคัญไม่แพ้กันเลยนะ! 💡

เราจะมาศึกษาวิธีใช้ ชุดเซ็ตเฟืองการเรียนรู้สำหรับวัดแรงดึงทอร์ก ⚙️💪
นักเรียนต้องดูวิดีโอสาธิตการใช้งานอุปกรณ์แต่ละชิ้นให้เข้าใจ
พร้อม จดบันทึกผลการทดลองแรงดึงและอัตราทดเฟือง
อย่าลืมคำนวณ ค่าความคลาดเคลื่อน ด้วยนะ! 🧮

ก่อนจะไปเข้าค่าย STEM 🎓
ขอให้นักเรียนทุกคน ทบทวนการใช้อุปกรณ์ให้เข้าใจอย่างถ่องแท้
เพราะเราจะได้นำความรู้นี้ไปใช้ในการแข่งขันสุดสนุกในวันค่าย! 🎉🔥` },
};

const roomIntro = computed(() => {
  const rk = (state.payload as any)?.roomKey as string | undefined;
  return (rk && ROOM_INTRO_TEXT[rk]) || {
    title: "ไจโรมีอะไรจะบอก!",
    body: "ยินดีต้อนรับเข้าสู่บทเรียน 🙂",
  };
});

</script>
