// config/virtualScenes.ts
import type { LearningRoomKey } from "@/config/learningRoom";

export type HotspotType = "video" | "quiz" | "doc" | "link";

export type StudentLevel = "LOW" | "AVERAGE" | "HIGH";

export interface HotspotDef {
  id: string; // unique id per hotspot (for progress)
  roomKey: LearningRoomKey; // "intro1" | "C1" | ...
  yaw: number;
  pitch: number;
  type: HotspotType;
  label: string; // text under icon or tooltip
  order?: number; // used for linear unlock (1,2,3,...)
  toSceneId?: string; // for type === "link"

  videoId?: string; // for YouTube
  docUrl?: string; // for doc download

  // NEW: graphic button
  icon?: string; // default icon
  iconDone?: string; // when student finished
  iconLocked?: string; // when locked
  width?: number; // optional pixel width

  html?: string;

  isExtra?: boolean;
}

export interface SceneDef {
  id: string; // marzipano sceneId: "intro1" | "concept1" | ...
  roomKey: LearningRoomKey; // mapping back to learning room
  image: string;
  init: { yaw: number; pitch: number; fov: number };
  hotspots: HotspotDef[];
}

const FOV_INITIAL = (120 * Math.PI) / 180;

export const VIRTUAL_SCENES: SceneDef[] = [
  // Home
  {
    id: "home",
    roomKey: "home",
    image: "/panos/home.jpg",
    init: { yaw: 0, pitch: 0, fov: FOV_INITIAL },
    hotspots: [],
  },
  // INTRO 1
  {
    id: "intro1",
    roomKey: "intro1",
    image: "/panos/intro1.jpg",
    init: { yaw: -2.948, pitch: 0.268, fov: FOV_INITIAL },
    hotspots: [
      {
        id: "intro1-doc",
        roomKey: "intro1",
        yaw: -2.981, // click at robot’s feet with DEBUG_PLACEMENT on
        pitch: 0.144,
        type: "doc",
        label: "ดาวน์โหลดเอกสารที่นี่",
        order: 0,
        docUrl: "/docs/intro-1.pdf",
        html: `
    <div class="hotspot-doc-card">
      <div class="hotspot-doc-bubble">
        คลิกไจโรสิ,<br />มีอะไรจะบอก!
      </div>
      <div class="hotspot-doc-robot"></div>
      <div class="hotspot-doc-panel">
        <div class="hotspot-doc-title">
          ก่อนเข้าเรียน!!<br />มีเอกสารหรือยังเอ่ย?
        </div>
        <button class="hotspot-doc-btn" data-hotspot-click>
          ดาวน์โหลดเอกสารที่นี่
        </button>
      </div>
    </div>
  `,
      },
      {
        id: "intro1-v1",
        roomKey: "intro1",
        yaw: -1.608,
        pitch: -0.213,
        type: "video",
        label: "Video 1: Intro 1.1 Type of gear: Internal and external gear",
        order: 1,
        videoId: "63VA7Rlv2Q4",
      },
      {
        id: "intro1-v2",
        roomKey: "intro1",
        yaw: -0.142,
        pitch: -0.19,
        type: "video",
        label:
          "Video 2: Intro 1.2 How to use the Learning Gear Set for Measuring Gear Train RPM",
        order: 2,
        videoId: "03XPXYKA4Ng",
      },
      {
        id: "intro1-quiz",
        roomKey: "intro1",
        yaw: 0.9,
        pitch: 0.2,
        type: "quiz",
        label: "Quiz: Intro 1",
        order: 3,
      },
    ],
  },
  // CONCEPT 1 (example)
  {
    id: "concept1",
    roomKey: "C1",
    image: "/panos/concept1.jpg",
    init: { yaw: 0, pitch: 0, fov: FOV_INITIAL },
    hotspots: [
      {
        id: "c1-v-main",
        roomKey: "C1",
        yaw: -0.3,
        pitch: -0.18,
        type: "video",
        label: "Video 3: Concept 1.1",
        order: 1,
        videoId: "MAIN_VIDEO_ID",
        // isExtra: false  (default)
      },
      {
        id: "c1-v-extra",
        roomKey: "C1",
        yaw: 0.9,
        pitch: -0.18,
        type: "video",
        label: "Video 4: Extra Practice",
        order: 2,
        videoId: "EXTRA_VIDEO_ID",
        isExtra: true, // 👈 only for LOW level
      },
      {
        id: "c1-quiz",
        roomKey: "C1",
        yaw: 1.7,
        pitch: -0.05,
        type: "quiz",
        label: "Brain Challenge: Concept 1",
        order: 3,
      },
    ],
  },

  // CONCEPT 2 (example)
  {
    id: "concept2",
    roomKey: "C2",
    image: "/panos/concept2.jpg",
    init: { yaw: 0, pitch: 0, fov: FOV_INITIAL },
    hotspots: [
      {
        id: "c2-v1",
        roomKey: "C2",
        yaw: -1.2,
        pitch: -0.1,
        type: "video",
        label: "Video 5: Concept 2.1",
        order: 1,
      },
      {
        id: "c2-v2",
        roomKey: "C2",
        yaw: -0.4,
        pitch: -0.1,
        type: "video",
        label: "Video 6: Concept 2.2",
        order: 2,
      },
      {
        id: "c2-v3",
        roomKey: "C2",
        yaw: 0.4,
        pitch: -0.1,
        type: "video",
        label: "Video 7: Concept 2.3",
        order: 3,
      },
      {
        id: "c2-v4",
        roomKey: "C2",
        yaw: 1.2,
        pitch: -0.1,
        type: "video",
        label: "Video 8: Concept 2.4",
        order: 4,
      },
      {
        id: "c2-brain",
        roomKey: "C2",
        yaw: 1.7,
        pitch: -0.05,
        type: "quiz",
        label: "Brain Challenge 5",
        order: 5,
      },
      {
        id: "c2-doc",
        roomKey: "C2",
        yaw: 2.2,
        pitch: 0.1,
        type: "doc",
        label: "ดาวน์โหลดเอกสาร",
      },
    ],
  },

  // … concept3, concept4, intro2 etc
];
