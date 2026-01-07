// app/config/roomDetails.ts
import type { LearningRoomKey } from "@/config/learningRoom";

export type RoomDetailItem = {
  title: string;     // e.g. "ประเภทของเฟือง: เฟืองในและเฟืองนอก"
  minutes: number;   // 3
  url?: string;      // youtube
};

export type RoomDetail = {
  header: string;           // e.g. "รายละเอียดการเรียนห้อง Intro 1"
  items: RoomDetailItem[];
  lowItems?: RoomDetailItem[];
};

export const ROOM_DETAILS: Record<LearningRoomKey, RoomDetail> = {
  intro1: {
    header: "รายละเอียดการเรียนห้อง Intro 1",
    items: [
      {
        title: "ประเภทของเฟือง: เฟืองในและเฟืองนอก",
        minutes: 3,
        url: "https://youtu.be/MwCzvLWSgA4",
      },
      {
        title: "วิธีใช้ชุด Learning Gear Set เพื่อวัดความเร็วรอบ (RPM) ของชุดเฟือง",
        minutes: 5,
        url: "https://youtu.be/5Gwqrs_dKcE",
      },
    ],
  },

  C1: {
    header: "รายละเอียดการเรียนห้อง Concept 1",
    items: [
      {
        title:
          "เฟืองส่งผ่าน (Idler gear), การทดลองที่ 1 เฟืองสีน้ำเงิน, ความรู้เพิ่มเติม, โจทย์ท้าทายสมอง 1–2",
        minutes: 7,
        url: "https://youtu.be/VnI_daJAZfo",
      },
      {
        title:
          "การทดลองที่ 2 เฟืองสีส้ม (การเชื่อมต่อเฟืองส่งผ่านและทิศทางการหมุน), โจทย์ 3–4, เกร็ดความรู้",
        minutes: 9,
        url: "https://youtu.be/xXiu8KOXEeQ",
      },
    ],
    lowItems: [
      { title: "คลิปเสริมคอนเซปที่ 1", minutes: 22, url: "https://youtu.be/KplDJOm33hs" },
    ],
  },

  C2: {
    header: "รายละเอียดการเรียนห้อง Concept 2",
    items: [
      { title: "ฟิสิกส์ที่เกี่ยวข้องกับเฟือง: แรงบิด", minutes: 5, url: "https://youtu.be/rBrYVYjAPvs" },
      { title: "อัตราส่วนตัวแปรที่เกี่ยวข้องกับเฟือง", minutes: 9, url: "https://youtu.be/KN2NN1Jp_dE" },
      { title: "ระยะพิตช์ของเฟือง + การทดลองที่ 3: Circular Pitch (CP)", minutes: 9, url: "https://youtu.be/O-jnI4XjSO4" },
      { title: "การเคลื่อนที่เชิงเส้นและการเคลื่อนที่เชิงมุม", minutes: 9, url: "https://youtu.be/-T8w1uovgLw" },
      { title: "โจทย์ท้าทายสมองที่ 5", minutes: 9, url: "https://youtu.be/MHH1bzsO72A" },
    ],
    lowItems: [
      { title: "คลิปเสริมคอนเซปที่ 2", minutes: 28, url: "https://youtu.be/Nn5a83I30sI" },
    ],
  },

  C3: {
    header: "รายละเอียดการเรียนห้อง Concept 3",
    items: [
      { title: "แนะนำกล่องควบคุมความเร็วและขบวนเฟือง", minutes: 5, url: "https://youtu.be/fm7EiHeXeOE" },
      { title: "ขบวนเฟืองอย่างง่าย + ทดลองที่ 4 + เขียนแผนผัง + โจทย์ 6", minutes: 9, url: "https://youtu.be/jQLllS-4290" },
      { title: "การทดลองที่ 5 การคำนวณตัวแปรของขบวนเฟืองอย่างง่าย", minutes: 15, url: "https://youtu.be/FURCfJ3Cd-0" },
      { title: "โจทย์ท้าทายสมองที่ 7", minutes: 8, url: "https://youtu.be/k67eox20jjo" },
      { title: "การประยุกต์ใช้: ขบวนเฟืองอย่างง่าย", minutes: 6, url: "https://youtu.be/4z55JtzmZBk" },
    ],
    lowItems: [
      { title: "คลิปเสริมคอนเซปที่ 3", minutes: 18, url: "https://youtu.be/GuGWXCLPH4o" },
    ],
  },

  C4: {
    header: "รายละเอียดการเรียนห้อง Concept 4",
    items: [
      { title: "ขบวนเฟืองทดหลายชุด + ทดลองที่ 6 + เขียนแผนผัง + โจทย์ 8", minutes: 7, url: "https://youtu.be/5LDi-4HBMag" },
      { title: "การทดลองที่ 7 การคำนวณตัวแปรของขบวนเฟืองทดหลายชุด", minutes: 17, url: "https://youtu.be/7CfLjRf4F1k" },
      { title: "โจทย์ท้าทายความคิดที่ 9", minutes: 8, url: "https://youtu.be/SbfXmupwlwI" },
      { title: "การประยุกต์ใช้: ขบวนเฟืองทดหลายชุด", minutes: 8, url: "https://youtu.be/NwdLJURLzO8" },
    ],
    lowItems: [
      { title: "คลิปเสริมคอนเซปที่ 4", minutes: 19, url: "https://youtu.be/ojgcZZnYNUo" },
    ],
  },

  intro2: {
    header: "รายละเอียดการเรียนห้อง Intro 2",
    items: [
      { title: "วิธีใช้ชุด Learning Gear Set เพื่อวัดค่าทอร์ก", minutes: 3, url: "https://youtu.be/GsSK-IkfrEI" },
      { title: "ทดลองที่ 8 เก็บผลแรงดึงจากเฟืองขับ + Percent error", minutes: 27, url: "https://youtu.be/zQhMvjfrUvA" },
    ],
  },
};
