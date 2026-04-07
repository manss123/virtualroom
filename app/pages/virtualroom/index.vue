<template>
  <div class="h-[100vh] w-full overflow-hidden fixed inset-0">
    <LearningTopBarVue :title="roomTitle" progressMode="room" :roomProgress="roomProgress" />

    <!-- 360 BG -->
    <ClientOnly>
      <MarzipanoViewer :key="`${viewerKey}-${showExtraVideos ? 1 : 0}`"
        :initial-scene-id="LEARNING_ROOMS[roomKey].sceneId" :room-key="roomKey" :completed-hotspots="completedHotspots"
        :show-extra-videos="showExtraVideos" @hotspotClick="handleHotspotClick" />
    </ClientOnly>

    <div v-if="showVideo && currentVideoId"
      class="fixed inset-0 z-50 bg-black/85 flex items-center justify-center flex-col">
      <div class="text-white text-lg lg:text-xl 2xl:text-5xl text-center mb-[26px]">
        {{ currentVideoLabel }}
      </div>
      <div class="w-[90vw] md:max-w-3xl lg:max-w-5xl xl:max-w-7xl aspect-video rounded-2xl overflow-hidden bg-black">
        <div id="yt-player" class="w-full h-full"></div>
      </div>

      <button
        class="z-10 mt-7 font-medium text-[26px] bg-[#FFC233] text-black rounded-nw px-10 py-4 text-sm cursor-pointer hover:bg-[#B97530] hover:text-white transition"
        @click="closeVideo">
        ไปต่อได้เลย
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import MarzipanoViewer from "~/components/MarzipanoViewer.vue";
import type { ProgressState } from "~/types/progress";
import type { HotspotDef } from "@/config/virtualScenes";
import LearningTopBarVue from "~/components/LearningTopBar.vue.vue";
import { LEARNING_ROOMS, type LearningRoomKey } from "~/config/learningRoom";
import { VIRTUAL_SCENES } from "@/config/virtualScenes";
import { QUIZZES } from "~/config/quizzes";

type StudentLevel = "LOW" | "AVERAGE" | "HIGH";

type LearningAction = "EXTRA" | "REVIEW" | "SKIP";

interface LearningPathItem {
  conceptId: "C1" | "C2" | "C3" | "C4";
  fuzzyLabel: StudentLevel;
  action: LearningAction;
}

const route = useRoute();
const roomKey = computed(
  () => (route.query.room as LearningRoomKey) || "intro1"
);

const roomTitle = computed(() => {
  const meta = LEARNING_ROOMS[roomKey.value];
  return meta ? `${meta.label}` : "ห้องเรียน";
});

const { data: progressData } = await useFetch<ProgressState>("/api/progress", {
  method: "GET",
});

// pre-test / learning path
const { data: preData } = await useFetch<{ learningPath: LearningPathItem[] }>(
  "/api/tests/pre",
  { method: "GET" }
);

// what concept this room belongs to (null for intro1/intro2)
const currentRoomMeta = computed(() => LEARNING_ROOMS[roomKey.value]);

const currentConceptLevel = computed<StudentLevel | null>(() => {
  const conceptId = currentRoomMeta.value?.conceptId;
  if (!conceptId) return null; // intro rooms, no level

  const item = preData.value?.learningPath?.find(
    (i) => i.conceptId === conceptId
  );
  return item?.fuzzyLabel ?? null;
});

// LOW -> must watch extra, AVERAGE -> no extra, HIGH -> usually won’t see this room
const showExtraVideos = computed(() => currentConceptLevel.value === "LOW");

const completedHotspots = computed(
  () => progressData.value?.completedHotspotsByRoom?.[roomKey.value] ?? []
);

watch(showExtraVideos, () => {
  viewerKey.value++;
});

const viewerKey = ref(0);

// video modal state
const showVideo = ref(false);
const currentVideoId = ref<string | null>(null);
const currentVideoHotspotId = ref<string | null>(null);

const router = useRouter();

// YouTube player instance
const ytPlayer = ref<any | null>(null);
const ytReady = ref(false);
const finishedYoutube = ref(false);

const currentVideoLabel = ref<string>(""); // NEW

const { openModal, onModalEvent } = useModal();

let offYoutubeEnded: (() => void) | null = null;
let offQuizAction: (() => void) | null = null;

onMounted(() => {
  offQuizAction = onModalEvent("quiz:action", async (p) => {
    if (p.action === "goHome") {
      if (p.hotspotId) await markHotspotDone(p.hotspotId);
      await router.push("/learning");
      return;
    }

    if (p.action === "goNext") {
      if (p.hotspotId) await markHotspotDone(p.hotspotId);

      // ✅ special case: intro2 finished -> reflection gate
      if (roomKey.value === "intro2") {
        const reflectionDone = !!progressData.value?.reflection?.submitted;
        if (!reflectionDone) {
          await router.push("/reflection");
        } else {
          await router.push("/learning");
        }
        return;
      }

      const next = getNextRoomKey(roomKey.value);
      if (!next) {
        await router.push("/learning");
        return;
      }

      await router.push({ path: "/virtualroom", query: { room: next } });
      return;
    }
  });


  offYoutubeEnded = onModalEvent("youtube:ended", async ({ hotspotId }) => {
    if (!hotspotId) return;
    await markHotspotDone(hotspotId);
  });
});

onBeforeUnmount(() => {
  offYoutubeEnded?.();
  offQuizAction?.();
});


const orderedRoomKeys = computed<LearningRoomKey[]>(() => {
  const lp = (preData.value?.learningPath ?? []) as LearningPathItem[];

  const conceptsInPath = lp
    .filter((i) => i.action === "EXTRA" || i.action === "REVIEW")
    .map((i) => i.conceptId) as LearningRoomKey[];

  return ["intro1", ...conceptsInPath, "intro2"];
});

function getNextRoomKey(current: LearningRoomKey) {
  const order = orderedRoomKeys.value;
  const idx = order.indexOf(current);
  if (idx === -1) return null;
  return order[idx + 1] ?? null;
}

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

async function markHotspotDone(hotspotId: string) {
  try {
    await $fetch("/api/progress", {
      method: "POST",
      body: { roomKey: roomKey.value, completeHotspotId: hotspotId },
    });
    const latest = await $fetch<ProgressState>("/api/progress");
    progressData.value = latest;

    await maybeCompleteRoom();

    viewerKey.value++;
  } catch (e) {
    console.error("Failed to update hotspot progress:", e);
  }
}

async function openVideo(hotspot: HotspotDef) {
  if (!hotspot.videoId) return;

  currentVideoId.value = hotspot.videoId;
  currentVideoHotspotId.value = hotspot.id;
  currentVideoLabel.value = hotspot.label || "วิดีโอการเรียนรู้"; // NEW
  showVideo.value = true;

  await nextTick();
  await loadYouTubeAPI();

  const w = window as any;

  if (!ytPlayer.value) {
    ytPlayer.value = new w.YT.Player("yt-player", {
      videoId: currentVideoId.value,
      width: "100%",
      height: "100%",
      playerVars: { autoplay: 1, rel: 0 },
      events: {
        onReady: (e: any) => {
          const iframe = e.target.getIframe();
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.display = "block";
        },
      },
    });

  } else {
    ytPlayer.value.loadVideoById(currentVideoId.value);
  }
}

function closeVideo() {
  if (ytPlayer.value) {
    ytPlayer.value.stopVideo();
    ytPlayer.value.destroy();
    ytPlayer.value = null;
  }

  showVideo.value = false;
  currentVideoId.value = null;
  currentVideoHotspotId.value = null;
  currentVideoLabel.value = "";
}

function openDownload(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => a.remove(), 100);
}

async function handleDocHotspot(hotspot: HotspotDef) {
  const isIntro = hotspot.roomKey === "intro1" || hotspot.roomKey === "intro2";
  const isLow = currentConceptLevel.value === "LOW";

  const urls =
    !isIntro && isLow
      ? (hotspot.docUrls?.length ? hotspot.docUrls : hotspot.docUrl ? [hotspot.docUrl] : [])
      : (hotspot.docUrl ? [hotspot.docUrl] : []);

  if (!urls.length) return;

  // Open downloads first (must stay synchronous with user gesture for Safari/iPad)
  urls.forEach(openDownload);

  await markHotspotDone(hotspot.id);
}

async function handleHotspotClick(payload: any) {
  const hotspot: HotspotDef | undefined = payload?.hotspot ?? payload; // supports old + new
  const trigger = payload?.trigger as "robot" | "download" | undefined;

  if (!hotspot) return;

  if (hotspot.type === "video") {
    openModal("youtubeVideo", {
      videoId: hotspot.videoId!,
      label: hotspot.label,
      hotspotId: hotspot.id,
    });
    return;
  }

  if (hotspot.type === "doc") {
    if (trigger === "robot") {
      openModal("roomIntro", { roomKey: hotspot.roomKey });
      return;
    }
    await handleDocHotspot(hotspot);
    return;
  }

  if (hotspot.type === "quiz") {
    const quizId = hotspot.roomKey;
    if (!QUIZZES[quizId]) return;

    openModal("quiz", {
      quizId,
      hotspotId: hotspot.id,
      roomKey: hotspot.roomKey,
    });
  }
}

let offQuizSubmitted: (() => void) | null = null;

onMounted(() => {
  offQuizSubmitted = onModalEvent("quiz:submitted", async (p) => {
    // p should include: quizId, roomKey, hotspotId, passed, correct, total, answers
    await $fetch("/api/progress", {
      method: "POST",
      body: {
        quiz: {
          quizId: p.quizId,
          roomKey: p.roomKey,
          hotspotId: p.hotspotId,
          passed: p.passed,
          correct: p.correct,
          total: p.total,
          answers: p.answers, // ✅ store all choices
        },
      },
    });

    if (p.passed && p.hotspotId) {
      await markHotspotDone(p.hotspotId);
      viewerKey.value++;
    }
  });

});

onBeforeUnmount(() => {
  offQuizSubmitted?.();
});



const isIntroRoom = computed(() => {
  // intro rooms have no conceptId in LEARNING_ROOMS meta (based on your logic)
  return !currentRoomMeta.value?.conceptId;
});

const requiredHotspotIds = computed(() => {
  // collect hotspots for this room from virtualScenes config
  const scenes = VIRTUAL_SCENES.filter((s) => s.roomKey === roomKey.value);
  const all = scenes.flatMap((s) => s.hotspots);

  // Intro: required = ALL videos + ALL docs + ALL quizzes
  if (isIntroRoom.value) {
    return all
      .filter(
        (h) => h.type === "video" || h.type === "doc" || h.type === "quiz"
      )
      .map((h) => h.id);
  }

  // Concept: based on your “personalized” rule:
  // - AVERAGE: only quiz required
  // - LOW: extra video + quiz required (main video optional)
  const showExtra = showExtraVideos.value;

  return all
    .filter((h) => {
      if (h.type === "doc") return true;
      if (h.type === "quiz") return true;
      if (h.type === "video") {
        if (h.isExtra) return showExtra;
        return true; // main videos required for everyone
      }
      return false;
    })
    .map((h) => h.id);
});

const roomProgress = computed(() => {
  const required = requiredHotspotIds.value;
  const doneSet = new Set(completedHotspots.value);

  const done = required.filter((id) => doneSet.has(id)).length;
  const total = required.length || 1;

  return { done, total };
});

async function maybeCompleteRoom() {
  const required = requiredHotspotIds.value;
  if (!required.length) return;

  const doneSet = new Set(completedHotspots.value);
  const allDone = required.every((id) => doneSet.has(id));
  if (!allDone) return;

  // already completed? do nothing
  const completedRooms = new Set(progressData.value?.completedRooms ?? []);
  if (completedRooms.has(roomKey.value)) return;

  await $fetch("/api/progress", {
    method: "POST",
    body: { completeRoomKey: roomKey.value },
  });

  const latest = await $fetch<ProgressState>("/api/progress");
  progressData.value = latest;
}


onBeforeUnmount(() => {
  if (ytPlayer.value && ytPlayer.value.destroy) {
    ytPlayer.value.destroy();
  }
});
</script>

<style>
/* Force the injected YouTube iframe to match container */
#yt-player iframe {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>
