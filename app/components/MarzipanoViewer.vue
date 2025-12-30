<!-- components/MarzipanoViewer.vue -->
<template>
  <div ref="el" class="viewer-wrap w-full h-full bg-black rounded-2xl overflow-hidden" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {
  VIRTUAL_SCENES,
  type HotspotDef,
  type SceneDef,
} from "@/config/virtualScenes";

const { getImageURL } = useAssetUrl();

const props = defineProps<{
  initialSceneId?: string;
  roomKey?: string; // "intro1" | "C2" | ...
  completedHotspots?: string[];
  showExtraVideos?: boolean;
}>();

const emit = defineEmits<{
  (e: "hotspotClick", hotspot: HotspotDef): void;
}>();

const el = ref<HTMLDivElement | null>(null);
const deg2rad = (d: number) => (d * Math.PI) / 180;

const FOV_INITIAL = deg2rad(120);
const FOV_MIN = deg2rad(100);
const FOV_MAX = deg2rad(120);

let goToScene: (id: string) => void;
let currentSceneId: string | null = null;

const DEBUG_PLACEMENT = true;

const HOTSPOT_PERSPECTIVE = {
  perspective: { radius: 1000 }, // tweak 800–2000 to taste
};

onMounted(async () => {
  const mod = await import("marzipano");
  const M = (mod as any).default ?? mod;
  if (!el.value) return;

  const limiter = M.util.compose(
    M.RectilinearView.limit.traditional(4096, FOV_MAX),
    M.RectilinearView.limit.pitch(deg2rad(-50), deg2rad(50)),
    M.RectilinearView.limit.hfov(FOV_MIN, FOV_MAX)
  );

  const viewer = new M.Viewer(el.value, {
    controls: { mouseViewMode: "drag" },
  });

  const scenes = new Map<
    string,
    { def: SceneDef; scene: any; view: any; hotspotContainer: any }
  >();

  function buildScene(def: SceneDef) {
    const source = M.ImageUrlSource.fromString(def.image);
    const geometry = new M.EquirectGeometry([{ width: 4000 }]);
    const view = new M.RectilinearView(def.init, limiter);
    const scene = viewer.createScene({ source, geometry, view });
    const hotspotContainer = scene.hotspotContainer();

    const completed = new Set(props.completedHotspots ?? []);
    const showExtra = props.showExtraVideos ?? true;
    // ------- PERSONALIZED FILTERING -------
    // hide extra videos if showExtra is false
    const visibleHotspots = def.hotspots.filter((h) => {
      if (!showExtra && h.type === "video" && h.isExtra) return false;
      return true;
    });

    type HState = "done" | "current" | "locked" | "active";


    const isIntro = def.roomKey === "intro1" || def.roomKey === "intro2";

    // which hotspots are in the linear flow?
    const isLinearStep = (h: HotspotDef) => {
      if (isIntro)
        return h.type === "doc" || h.type === "video" || h.type === "quiz";

      // concept rooms: keep your personalized rule
      if (h.type === "quiz") return true;
      if (h.type === "video" && h.isExtra && showExtra) return true;
      return false;
    };

    // ✅ steps in order
    const stepHotspots = visibleHotspots
      .filter((h) => isLinearStep(h) && typeof h.order === "number")
      .sort((a, b) => a.order! - b.order!);

    let maxDoneIndex = -1;
    stepHotspots.forEach((h, idx) => {
      if (completed.has(h.id)) maxDoneIndex = Math.max(maxDoneIndex, idx);
    });

    const currentStepIndex = Math.min(
      maxDoneIndex + 1,
      stepHotspots.length - 1
    );

    const getHotspotState = (h: HotspotDef): HState => {
      const idx = stepHotspots.findIndex((s) => s.id === h.id);

      // not part of steps -> never locked
      if (idx === -1) return completed.has(h.id) ? "done" : "active";

      if (completed.has(h.id)) return "done";
      if (idx === currentStepIndex) return "current";
      return "locked";
    };

    // ----- create DOM hotspots -----
    // inside buildScene, replace the current btn block with:
    visibleHotspots.forEach((h) => {
      const state = getHotspotState(h);

      const wrapper = document.createElement("div");
      wrapper.className = "mz-hotspot";

      const inner = document.createElement("div");
      inner.className = "mz-hotspot-inner";
      wrapper.appendChild(inner);

      // 1) CUSTOM HTML (robot card) – unchanged
      if (h.html && h.type === "doc") {
        inner.innerHTML = h.html;

        const clickTarget =
          (inner.querySelector("[data-hotspot-click]") as HTMLElement) ?? inner;

        if (state !== "locked") {
          clickTarget.addEventListener("click", () => {
            emit("hotspotClick", h); // ✅ parent will open + mark
          });
        } else {
          clickTarget.style.pointerEvents = "none";
          clickTarget.style.opacity = "0.5";
        }

        hotspotContainer.createHotspot(
          wrapper,
          { yaw: h.yaw, pitch: h.pitch },
          HOTSPOT_PERSPECTIVE
        );

        return;
      }

      // 2) VIDEO TV SCREEN WITH YOUTUBE THUMBNAIL
      if (h.type === "video" && h.videoId) {
        const state = getHotspotState(h);

        const tv = document.createElement("div");
        tv.className = "mz-tv-frame";
        tv.setAttribute("data-state", state);

        const thumb = document.createElement("img");
        thumb.className = "mz-tv-thumb";
        thumb.alt = h.label;
        thumb.src = `https://img.youtube.com/vi/${h.videoId}/hqdefault.jpg`;
        tv.appendChild(thumb);

        // status badge (top-left)
        const badge = document.createElement("div");
        badge.className = "mz-tv-badge";
        badge.setAttribute("data-state", state);

        const icon = document.createElement("div");
        icon.className = "mz-tv-badge-icon";
        icon.textContent =
          state === "done" ? "✓" : state === "current" ? "▶" : "🔒";

        badge.appendChild(icon);
        tv.appendChild(badge);

        // center overlay only when CURRENT
        if (state === "current") {
          const overlay = document.createElement("div");
          overlay.className = "mz-tv-center-play";
          overlay.textContent = "▶";
          tv.appendChild(overlay);
        }

        // lock behavior
        if (state === "locked") {
          tv.classList.add("is-locked");
          tv.style.pointerEvents = "none";
        } else {
          tv.addEventListener("click", () => emit("hotspotClick", h));
        }

        inner.appendChild(tv);
        hotspotContainer.createHotspot(wrapper, { yaw: h.yaw, pitch: h.pitch }, HOTSPOT_PERSPECTIVE);
        return;
      }


      // 3) OTHER TYPES – fall back to your existing button style
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "mz-hotspot-btn";
      btn.setAttribute("data-type", h.type);
      btn.setAttribute("data-state", state);

      const img = document.createElement("img");
      img.src = getIconSrc(h, state);
      img.alt = h.label;
      img.className = "mz-hotspot-img";
      if (h.width) img.style.width = `${h.width}px`;
      btn.appendChild(img);

      const caption = document.createElement("div");
      caption.textContent = h.label;
      caption.className = "mz-hotspot-caption";
      btn.appendChild(caption);

      if (state !== "locked") {
        btn.addEventListener("click", () => emit("hotspotClick", h));
      } else {
        btn.disabled = true;
      }

      inner.appendChild(btn);

      hotspotContainer.createHotspot(wrapper, { yaw: h.yaw, pitch: h.pitch });
    });

    scenes.set(def.id, { def, scene, view, hotspotContainer });
  }

  VIRTUAL_SCENES.forEach(buildScene);

  const initialId = props.initialSceneId || VIRTUAL_SCENES[0]?.id;
  const start = scenes.get(initialId)!;
  start.scene.switchTo({ transitionDuration: 0 });
  currentSceneId = initialId;

  if (DEBUG_PLACEMENT && el.value) {
    el.value.addEventListener("click", (ev: MouseEvent) => {
      if (!currentSceneId) return;
      const entry = scenes.get(currentSceneId);
      if (!entry) return;

      const rect = el.value!.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;

      const coords = entry.view.screenToCoordinates({ x, y });
      console.log(
        "[HOTSPOT DEBUG]",
        "scene:",
        currentSceneId,
        "yaw:",
        coords.yaw.toFixed(3),
        "pitch:",
        coords.pitch.toFixed(3)
      );
    });
  }

  goToScene = (id: string) => {
    const next = scenes.get(id);
    if (!next) return;
    next.view.setParameters(next.def.init);
    next.scene.switchTo({ transitionDuration: 800 });
    currentSceneId = id;
  };
});

// helper: fallback icons per type (optional)
const DEFAULT_ICONS: Record<string, string> = {
  // video: "/hotspots/tv-orange.png",
  // quiz: "/hotspots/quiz.png",
  // doc: "/hotspots/doc-card.png",
};

function getIconSrc(h: HotspotDef, state: "active" | "done" | "locked") {
  if (state === "done" && h.iconDone) return h.iconDone;
  if (state === "locked" && h.iconLocked) return h.iconLocked;
  if (h.icon) return h.icon;
  return DEFAULT_ICONS[h.type] || "/hotspots/default.png";
}

// if route query changes (room=...), switch scene
watch(
  () => props.initialSceneId,
  (id) => {
    if (id && goToScene && id !== currentSceneId) goToScene(id);
  }
);
</script>

<style>
.mz-hotspot {
  will-change: transform;
  /* Marzipano will apply transform / left / top here */
  position: absolute;
}

/* This is the visual card anchored to the 3D point */
.mz-hotspot-inner {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  /* bottom-center anchor */
  transform-origin: 50% 100%;
  /* scale from feet */
  pointer-events: auto;
}

/* ===== TV badge style ===== */
.mz-tv-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

/* circle icon (color changes with state) */
.mz-tv-circle {
  width: 70px;
  height: 70px;
  border-radius: 9999px;
  border: 4px solid #ffffff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
}

/* unlocked */
.mz-hotspot-btn[data-type="video"][data-state="active"] .mz-tv-circle {
  background: #ffc233;
  /* orange */
}

/* done */
.mz-hotspot-btn[data-type="video"][data-state="done"] .mz-tv-circle {
  background: #22c55e;
  /* green */
}

/* locked */
.mz-hotspot-btn[data-type="video"][data-state="locked"] .mz-tv-circle {
  background: #9ca3af;
  /* gray */
}

/* pill label under circle */
.mz-tv-label {
  padding: 4px 14px;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  text-align: center;
  font-size: 11px;
  min-width: 140px;
}

.mz-tv-kind {
  font-weight: 700;
  font-size: 11px;
}

.mz-tv-title {
  margin-top: 2px;
  font-size: 10px;
}

/* ===== Doc card (bottom-right robot-style) ===== */
.mz-doc-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 16px;
  background: rgba(250, 250, 250, 0.9);
  color: #111827;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
}

.mz-doc-text {
  font-size: 12px;
  text-align: center;
  font-weight: 600;
}

.mz-doc-button {
  margin-top: 4px;
  padding: 8px 20px;
  border-radius: 9999px;
  background: #4b8170;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
}

/* locked docs (if you ever lock them) */
.mz-hotspot-btn[data-type="doc"][data-state="locked"] .mz-doc-button {
  background: #9ca3af;
}

.hotspot-doc-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 260px;
  pointer-events: auto;
}

/* speech bubble */
.hotspot-doc-bubble {
  padding: 8px 12px;
  border-radius: 16px;
  background: #ffffff;
  /* background-image: url('../../public/hotspots/text-bubble.png'); */
  color: #f97316;
  /* orange text like design */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
}

/* robot placeholder (you can use bg-image) */
.hotspot-doc-robot {
  width: 539px;
  height: 596px;
  background-image: url("/hotspots/robot.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

/* bottom panel */
.hotspot-doc-panel {
  width: 100%;
  padding: 12px 16px 16px;
  border-radius: 18px;
  background: #e5e5e5;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  text-align: center;
}

.hotspot-doc-title {
  color: #3f3f3f;
  margin-bottom: 12px;
}

.hotspot-doc-btn {
  width: 100%;
  padding: 10px 14px;
  border-radius: 9999px;
  border: none;
  background: #2f8d7f;
  color: #ffffff;
  cursor: pointer;
}

.hotspot-doc-btn:hover {
  filter: brightness(1.05);
}

.mz-hotspot {
  position: absolute;
  /* Marzipano will still manage transforms */
  will-change: transform;
  pointer-events: none;
  /* inner takes events */
}

/* Anchor child so bottom-center sits on the yaw/pitch point */
.mz-hotspot-inner {
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, -100%);
  /* bottom center to the hotspot point */
  transform-origin: 50% 100%;
  pointer-events: auto;
}

.mz-tv-frame {
  position: relative;
  width: 720px;
  /* tweak to match TV size */
  height: 420px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
  cursor: pointer;
}

.mz-tv-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mz-tv-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  background: radial-gradient(circle,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.4) 100%);
  pointer-events: none;
  /* click passes through to tv frame */
}

.mz-tv-frame {
  position: relative;
  width: 720px;
  height: 420px;
  border-radius: 12px;
  overflow: visible;
  box-shadow: 0 10px 25px rgba(0,0,0,0.35);
  cursor: pointer;
}

.mz-tv-frame.is-locked {
  filter: grayscale(0.8) brightness(0.6);
}

/* top-center badge */
.mz-tv-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);

  width: 56px;
  height: 56px;
  border-radius: 9999px;
  border: 3px solid white;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 8px 20px rgba(0,0,0,0.35);
}


.mz-tv-badge[data-state="done"] { background: #22c55e; }
.mz-tv-badge[data-state="current"] { background: #FFC233; }
.mz-tv-badge[data-state="locked"] { background: #9ca3af; }
.mz-tv-badge[data-state="active"] { background: #FFC233; }

.mz-tv-badge-icon {
  color: #111;
  font-weight: 900;
  font-size: 20px;
}

/* big play overlay center (only for current step) */
.mz-tv-center-play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  color: white;
  text-shadow: 0 0 10px rgba(0,0,0,0.7);
  /* background: radial-gradient(circle, rgba(0,0,0,0) 35%, rgba(0,0,0,0.45) 100%); */
  pointer-events: none;
}

</style>
