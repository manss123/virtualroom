<template>
  <teleport to="body">
    <div v-if="state.open" class="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4"
      @click="state.type === 'imageZoom' ? closeModal : null">
      <div class="relative w-[90vw] max-w-6xl" @click.stop>
        <button type="button" v-if="state.type === 'imageZoom'"
          class="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-black shadow flex items-center justify-center cursor-pointer"
          @click="closeModal" aria-label="Close">
          ✕
        </button>

        <!-- IMAGE ZOOM -->
        <div
          v-if="state.type === 'imageZoom'"
          class="max-w-[95vw] max-h-[90vh] overflow-auto rounded-lg bg-black"
        >
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

        <!-- QUIZ -->
        <div v-else-if="state.type === 'quiz'" class="w-[90vw] max-w-[1100px]">
          <quiz-modal :quiz-id="(state.payload as any)?.quizId" :hotspot-id="(state.payload as any)?.hotspotId" :room-key="(state.payload as any)?.roomKey" />
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
</script>
