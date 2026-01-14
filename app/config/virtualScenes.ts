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
  docUrls?: string[];  

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
      <div class="hotspot-doc-robot" data-hotspot-robot></div>
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
        label: "บทนำ 1.1 ประเภทของเฟือง: เฟืองในและเฟืองนอก",
        order: 1,
        videoId: "MwCzvLWSgA4",
      },
      {
        id: "intro1-v2",
        roomKey: "intro1",
        yaw: -0.142,
        pitch: -0.24,
        type: "video",
        label:
          "บทนำ 1.2 วิธีใช้ชุด Learning Gear Set เพื่อวัดความเร็วรอบ (RPM) ของชุดเฟือง",
        order: 2,
        videoId: "5Gwqrs_dKcE",
      },
      {
        id: "intro1-quiz",
        roomKey: "intro1",
        yaw: 0.9,
        pitch: 0.2,
        type: "quiz",
        label: "Quiz: Intro 1",
        order: 3,
        html: `
        <div class="hotspot-quiz-card">
          <button type="button" class="hotspot-quiz-btn" data-hotspot-click>
            พร้อมทำแบบฝึกหัดแล้ว!!
          </button>
        </div>
      `,

      },
    ],
  },
  // CONCEPT 1 (example)
  {
    id: "concept1",
    roomKey: "C1",
    image: "/panos/concept1.jpg",
    init: { yaw: -1.668, pitch: 0.021, fov: FOV_INITIAL },
    hotspots: [
      {
        id: "c1-doc",
        roomKey: "C1",
        yaw:  -1.667,
        pitch: -0.206,
        type: "doc",
        label: "ดาวน์โหลดเอกสารที่นี่",
        order: 0,
        docUrl: "/docs/concept-1.pdf",
        docUrls: ["/docs/concept-1.pdf", "/docs/Poorly 1.pdf"],
        html: `
    <div class="hotspot-doc-card">
      <div class="hotspot-doc-bubble">
        คลิกไจโรสิ,<br />มีอะไรจะบอก!
      </div>
      <div class="hotspot-doc-robot" data-hotspot-robot></div>
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
        id: "c1-v1",
        roomKey: "C1",
        yaw: -0.746,
        pitch: -0.152,
        type: "video",
        label: "แนวคิด 1.1 เฟืองส่งผ่าน (Idler gear), การทดลองที่ 1 เฟืองสีน้ำเงิน (เฟืองส่งผ่าน), และความรู้เพิ่มเติม, โจทย์ท้าทายสมองที่ 1–2",
        order: 1,
        videoId: "VnI_daJAZfo",
      },
      {
        id: "c1-v2",
        roomKey: "C1",
        yaw: 0.772,
        pitch: -0.187,
        type: "video",
        label:
          "การทดลองที่ 2 เฟืองสีส้ม (การเชื่อมต่อเฟืองส่งผ่านและทิศทางการหมุน) โจทย์ท้าทายสมองที่ 3–4, เสริมเกร็ดความรู้",
        order: 2,
        videoId: "xXiu8KOXEeQ",
      },
      {
        id: "c1-extra-1",
        roomKey: "C1",
        yaw: 1.646,
        pitch: 0.133,
        type: "video",
        label: "Extra Video ...",
        order: 3,
        videoId: "KplDJOm33hs",
        html: `
        <div class="hotspot-quiz-card">
          <button type="button" class="hotspot-extra-quiz-btn" data-hotspot-click>
            เริ่มติวโจทย์ เสริมทักษะ
          </button>
        </div>
      `,
        isExtra: true,
      },
      {
        id: "c1-quiz",
        roomKey: "C1",
        yaw: 2.564,
        pitch: 0.133,
        type: "quiz",
        label: "Quiz: Concept 1",
        order: 4,
        html: `
        <div class="hotspot-quiz-card">
          <button type="button" class="hotspot-quiz-btn" data-hotspot-click>
            พร้อมทำแบบฝึกหัดแล้ว!!
          </button>
        </div>
      `,
      },
    ],
  },

  // CONCEPT 2 (example)
  {
    id: "concept2",
    roomKey: "C2",
    image: "/panos/concept2.jpg",
    init: { yaw: -0.024, pitch: 0.059, fov: FOV_INITIAL },
    hotspots: [
      {
        id: "c2-doc",
        roomKey: "C2",
        yaw:  0.030,
        pitch: -0.204,
        type: "doc",
        label: "ดาวน์โหลดเอกสารที่นี่",
        order: 0,
        docUrl: "/docs/concept-2.pdf",
        docUrls: ["/docs/concept-2.pdf", "/docs/Poorly 2.pdf"],
        html: `
    <div class="hotspot-doc-card">
      <div class="hotspot-doc-bubble">
        คลิกไจโรสิ,<br />มีอะไรจะบอก!
      </div>
      <div class="hotspot-doc-robot" data-hotspot-robot></div>
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
        id: "c2-v1",
        roomKey: "C2",
        yaw: 0.986,
        pitch: -0.280,
        type: "video",
        label: "แนวคิด 2.1 ฟิสิกส์ที่เกี่ยวข้องกับเฟือง: หัวข้อแรงบิด",
        order: 1,
        videoId: "rBrYVYjAPvs",
      },
      {
        id: "c2-v2",
        roomKey: "C2",
        yaw: 1.804,
        pitch: -0.240,
        type: "video",
        label:
          "แนวคิด 2.2 อัตราส่วนตัวแปรที่เกี่ยวข้องกับเฟือง",
        order: 2,
        videoId: "KN2NN1Jp_dE",
      },
      {
        id: "c2-v3",
        roomKey: "C2",
        yaw: -2.993,
        pitch: -0.214,
        type: "video",
        label:
          "แนวคิด 2.3 ชุดการเรียนรู้ ระยะพิตช์ของเฟือง การทดลองที่ 3: พิตช์วงกลม (Circular Pitch: CP)",
        order: 3,
        videoId: "O-jnI4XjSO4",
      },
      {
        id: "c2-v4",
        roomKey: "C2",
        yaw: -1.770,
        pitch: -0.183,
        type: "video",
        label:
          "แนวคิด 2.4 การเคลื่อนที่เชิงเส้นและการเคลื่อนที่เชิงมุม",
        order: 4,
        videoId: "-T8w1uovgLw",
      },
      {
        id: "c2-v5",
        roomKey: "C2",
        yaw: -1.012,
        pitch: -0.238,
        type: "video",
        label:
          "โจทย์ท้าทายสมองที่ 5",
        order: 5,
        videoId: "MHH1bzsO72A",
      },
      {
        id: "c2-extra-1",
        roomKey: "C2",
        yaw: -0.446,
        pitch: 0.027,
        type: "video",
        label: "Extra Video ...",
        order: 6,
        videoId: "Nn5a83I30sI",
        html: `
        <div class="hotspot-quiz-card">
          <button type="button" class="hotspot-extra-quiz-btn" data-hotspot-click>
            เริ่มติวโจทย์ เสริมทักษะ
          </button>
        </div>
      `,
        isExtra: true,
      },
      {
        id: "c2-quiz",
        roomKey: "C2",
        yaw: -0.446,
        pitch: 0.227,
        type: "quiz",
        label: "Quiz: Concept 2",
        order: 7,
        html: `
        <div class="hotspot-quiz-card">
          <button type="button" class="hotspot-quiz-btn" data-hotspot-click>
            พร้อมทำแบบฝึกหัดแล้ว!!
          </button>
        </div>
      `,
      },
    ],
  },
  {
    id: "concept3",
    roomKey: "C3",
    image: "/panos/concept3.jpg",
    init: { yaw: -0.024, pitch: 0.059, fov: FOV_INITIAL },
    hotspots: [
      {
        id: "c3-doc",
        roomKey: "C3",
        yaw:  0.030,
        pitch: -0.204,
        type: "doc",
        label: "ดาวน์โหลดเอกสารที่นี่",
        order: 0,
        docUrl: "/docs/concept-3.pdf",
        docUrls: ["/docs/concept-3.pdf", "/docs/Poorly 3.pdf"],
        html: `
    <div class="hotspot-doc-card">
      <div class="hotspot-doc-bubble">
        คลิกไจโรสิ,<br />มีอะไรจะบอก!
      </div>
      <div class="hotspot-doc-robot" data-hotspot-robot></div>
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
        id: "c3-v1",
        roomKey: "C3",
        yaw: 0.786,
        pitch: -0.250,
        type: "video",
        label: "แนวคิด 3.1 แนะนำกล่องควบคุมความเร็วและขบวนเฟือง",
        order: 1,
        videoId: "fm7EiHeXeOE",
      },
      {
        id: "c3-v2",
        roomKey: "C3",
        yaw: 1.654,
        pitch: -0.220,
        type: "video",
        label:
          "แนวคิด 3.2 ขบวนเฟืองอย่างง่าย, การทดลองที่ 4 เฟืองสีม่วง (ขบวนเฟืองอย่างง่าย), การเขียนแผนผังของขบวนเฟืองอย่างง่าย, โจทย์ท้าทายสมองที่ 6",
        order: 2,
        videoId: "jQLllS-4290",
      },
      {
        id: "c3-v3",
        roomKey: "C3",
        yaw: -3.113,
        pitch: -0.214,
        type: "video",
        label:
          "การทดลองที่ 5 การคำนวณตัวแปรที่เกี่ยวข้องกับขบวนเฟืองอย่างง่าย",
        order: 3,
        videoId: "FURCfJ3Cd-0",
      },
      {
        id: "c3-v4",
        roomKey: "C3",
        yaw: -1.650,
        pitch: -0.183,
        type: "video",
        label:
          "โจทย์ท้าทายสมองที่ 7",
        order: 4,
        videoId: "k67eox20jjo",
      },
      {
        id: "c3-v5",
        roomKey: "C3",
        yaw: -0.760,
        pitch: -0.238,
        type: "video",
        label:
          "การประยุกต์ใช้: ขบวนเฟืองอย่างง่าย",
        order: 5,
        videoId: "4z55JtzmZBk",
      },
      {
        id: "c3-extra-1",
        roomKey: "C3",
        yaw: -2.348,
        pitch: 0.328,
        type: "video",
        label: "Extra Video ...",
        order: 6,
        videoId: "GuGWXCLPH4o",
        html: `
        <div class="hotspot-quiz-card">
          <button type="button" class="hotspot-extra-quiz-btn" data-hotspot-click>
            เริ่มติวโจทย์ เสริมทักษะ
          </button>
        </div>
      `,
        isExtra: true,
      },
      {
        id: "c3-quiz",
        roomKey: "C3",
        yaw: -1.709,
        pitch: 0.524,
        type: "quiz",
        label: "Quiz: Concept 3",
        order: 7,
        html: `
        <div class="hotspot-quiz-card">
          <button type="button" class="hotspot-quiz-btn" data-hotspot-click>
            พร้อมทำแบบฝึกหัดแล้ว!!
          </button>
        </div>
      `,
      },
    ],
  },
  {
    id: "concept4",
    roomKey: "C4",
    image: "/panos/concept4.jpg",
    init: { yaw: -0.024, pitch: 0.059, fov: FOV_INITIAL },
    hotspots: [
      {
        id: "c4-doc",
        roomKey: "C4",
        yaw:  0.030,
        pitch: -0.204,
        type: "doc",
        label: "ดาวน์โหลดเอกสารที่นี่",
        order: 0,
        docUrl: "/docs/concept-4.pdf",
        docUrls: ["/docs/concept-4.pdf", "/docs/Poorly 4.pdf"],
        html: `
    <div class="hotspot-doc-card">
      <div class="hotspot-doc-bubble">
        คลิกไจโรสิ,<br />มีอะไรจะบอก!
      </div>
      <div class="hotspot-doc-robot" data-hotspot-robot></div>
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
        id: "c4-v1",
        roomKey: "C4",
        yaw: 0.686,
        pitch: -0.250,
        type: "video",
        label: "แนวคิด 4.1 ขบวนเฟืองทดหลายชุด, การทดลองที่ 6 เฟืองสีเขียว (ขบวนเฟืองทดหลายชุด), การเขียนแผนผังของขบวนเฟืองทดหลายชุด, โจทย์ท้าทายสมองที่ 8",
        order: 1,
        videoId: "5LDi-4HBMag",
      },
      {
        id: "c4-v2",
        roomKey: "C4",
        yaw: 1.654,
        pitch: -0.220,
        type: "video",
        label:
          "การทดลองที่ 7 การคำนวณตัวแปรที่เกี่ยวข้องกับขบวนเฟืองทดหลายชุด",
        order: 2,
        videoId: "7CfLjRf4F1k",
      },
      {
        id: "c4-v3",
        roomKey: "C4",
        yaw: -1.800,
        pitch: -0.183,
        type: "video",
        label:
          "โจทย์ท้าทายความคิดที่ 9",
        order: 3,
        videoId: "SbfXmupwlwI",
      },
      {
        id: "c4-v4",
        roomKey: "C4",
        yaw: -0.720,
        pitch: -0.238,
        type: "video",
        label:
          "การประยุกต์ใช้: ขบวนเฟืองทดหลายชุด",
        order: 4,
        videoId: "NwdLJURLzO8",
      },
      {
        id: "c4-extra-1",
        roomKey: "C4",
        yaw: 2.481,
        pitch: 0.357,
        type: "video",
        label: "Extra Video ...",
        order: 5,
        videoId: "ojgcZZnYNUo",
        html: `
        <div class="hotspot-quiz-card">
          <button type="button" class="hotspot-extra-quiz-btn" data-hotspot-click>
            เริ่มติวโจทย์ เสริมทักษะ
          </button>
        </div>
      `,
        isExtra: true,
      },
      {
        id: "c4-quiz",
        roomKey: "C4",
        yaw: -2.500,
        pitch: 0.312,
        type: "quiz",
        label: "Quiz: Concept 4",
        order: 6,
        html: `
        <div class="hotspot-quiz-card">
          <button type="button" class="hotspot-quiz-btn" data-hotspot-click>
            พร้อมทำแบบฝึกหัดแล้ว!!
          </button>
        </div>
      `,
      },
    ],
  },
  {
    id: "intro2",
    roomKey: "intro2",
    image: "/panos/intro2.jpg",
    init: { yaw: -1.427, pitch: 0.059, fov: FOV_INITIAL },
    hotspots: [
      {
        id: "intro2-doc",
        roomKey: "intro2",
        yaw:  -1.708,
        pitch: -0.101,
        type: "doc",
        label: "ดาวน์โหลดเอกสารที่นี่",
        order: 0,
        docUrl: "/docs/intro-2.pdf",
        html: `
    <div class="hotspot-doc-card">
      <div class="hotspot-doc-bubble">
        คลิกไจโรสิ,<br />มีอะไรจะบอก!
      </div>
      <div class="hotspot-doc-robot" data-hotspot-robot></div>
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
        id: "intro2-v1",
        roomKey: "intro2",
        yaw: -0.556,
        pitch: -0.210,
        type: "video",
        label: "บทนำ 2.1 วิธีการใช้ชุด Learning Gear Set เพื่อวัดค่าของชุดเฟือง สำหรับวัดค่าทอร์ก",
        order: 1,
        videoId: "GsSK-IkfrEI",
      },
      {
        id: "intro2-v2",
        roomKey: "intro2",
        yaw: 0.586,
        pitch: -0.230,
        type: "video",
        label:
          "การทดลองเก็บผลแรงดึงจากเฟืองขับ การทดลองที่ 8, ค่าเปอร์เซ็นความแตกต่าง (Percent error)",
        order: 2,
        videoId: "zQhMvjfrUvA",
      },
      {
        id: "intro2-quiz",
        roomKey: "intro2",
        yaw: 2.991,
        pitch: 0.183,
        type: "quiz",
        label: "Quiz: Intro 2",
        order: 3,
        html: `
        <div class="hotspot-quiz-card">
          <button type="button" class="hotspot-quiz-btn" data-hotspot-click>
            พร้อมทำแบบฝึกหัดแล้ว!!
          </button>
        </div>
      `,
      },
    ],
  },

];
