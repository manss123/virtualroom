<template>
  <div class="h-[100vh] w-full overflow-hidden fixed inset-0">
    <LearningTopBarVue
      :title="roomTitle"
      progressMode="room"
      :roomProgress="roomProgress"
    />

    <!-- 360 BG -->
    <ClientOnly>
      <MarzipanoViewer
        :key="viewerKey"
        :initial-scene-id="roomKey"
        :room-key="roomKey"
        :completed-hotspots="completedHotspots"
        :show-extra-videos="showExtraVideos"
        @hotspotClick="handleHotspotClick"
      />
    </ClientOnly>

    <div
      v-if="showVideo && currentVideoId"
      class="fixed inset-0 z-50 bg-black/85 flex items-center justify-center flex-col"
    >
      <div class="text-white text-lg lg:text-xl 2xl:text-5xl text-center mb-[26px]">
        {{ currentVideoLabel }}
      </div>
      <div
        class="bg-black rounded-2xl overflow-hidden w-[90vw] md:max-w-3xl lg:max-w-5xl xl:max-w-7xl aspect-video relative"
      >
        <!-- Player container (YT API will inject iframe here) -->
        <div id="yt-player" class="w-full h-full"></div>
      </div>
      <button
        class="z-10 mt-7 font-medium text-[26px] bg-[#FFC233] text-black rounded-nw px-10 py-4 text-sm cursor-pointer hover:bg-[#B97530] hover:text-white transition"
        @click="closeVideo"
      >
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

const viewerKey = ref(0);

// video modal state
const showVideo = ref(false);
const currentVideoId = ref<string | null>(null);
const currentVideoHotspotId = ref<string | null>(null);

// YouTube player instance
const ytPlayer = ref<any | null>(null);
const ytReady = ref(false);
const finishedYoutube = ref(false);

const currentVideoLabel = ref<string>(""); // NEW

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
      events: {
        onStateChange: (event: any) => {
          if (
            event.data === w.YT.PlayerState.ENDED &&
            currentVideoHotspotId.value
          ) {
            markHotspotDone(currentVideoHotspotId.value);
            finishedYoutube.value = true;
          }
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

async function handleHotspotClick(hotspot: HotspotDef) {
  if (hotspot.type === "video") {
    await openVideo(hotspot);
  } else if (hotspot.type === "doc" && hotspot.docUrl) {
    window.open(hotspot.docUrl, "_blank");
    await markHotspotDone(hotspot.id);
  } else if (hotspot.type === "quiz") {
    // open quiz modal...
    // when user passes/completes quiz:
    // await markHotspotDone(hotspot.id);
  }
}


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
      if (h.type === "quiz") return true;
      if (h.type === "video" && h.isExtra && showExtra) return true;
      // doc in concept rooms: decide if you want it required or optional
      // if you want required docs too, add:
      // if (h.type === "doc") return true;

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

onBeforeUnmount(() => {
  if (ytPlayer.value && ytPlayer.value.destroy) {
    ytPlayer.value.destroy();
  }
});
</script>
