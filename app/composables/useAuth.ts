// app/composables/useAuth.ts
import { useNuxtApp } from "#app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getIdToken,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  sex: "ชาย" | "หญิง" | "";
  age: number;
  grade: string;
  school: string;
  classCode: string;
  pdpa: boolean;
};

export function useFirebaseSession() {
  const nuxtApp = useNuxtApp();

  // ⛔️ บน server ยังไม่มี Firebase web SDK → คืน stub ฟังก์ชัน
  if (import.meta.server) {
    return {
      async registerWithProfile() {
        throw new Error("useFirebaseSession() is client-side only");
      },
      async loginAndAttachSession() {
        throw new Error("useFirebaseSession() is client-side only");
      },
      async logoutSession() {},
      async fetchCurrentProfile() {
        return null;
      },
    };
  }

  const $firebase = nuxtApp.$firebase as
    | {
        auth: any;
        firestore: any;
      }
    | undefined;

  if (!$firebase) {
    throw new Error(
      "Firebase plugin not initialized. Did you create plugins/firebase.client.ts?"
    );
  }

  const { auth, firestore } = $firebase;

  /** สร้าง user + profile ใน Firestore + แนบ session cookie */
  async function registerWithProfile(payload: RegisterPayload) {
    const { email, password, ...profile } = payload;

    try {
      // 1) ตรวจสอบ classCode ก่อน (อย่าเพิ่งสร้าง user)
      const classRef = doc(firestore, "classGroups", profile.classCode);
      const classSnap = await getDoc(classRef);

      if (!classSnap.exists()) {
        const err: any = new Error("Invalid class code");
        err.code = "classCode/invalid";
        throw err;
      }

      const classData = classSnap.data() as {
        experimentGroup?: "A" | "B";
        name?: string;
        grade?: string;
        school?: string;
      };

      if (!classData.experimentGroup) {
        const err: any = new Error("Class group missing experimentGroup");
        err.code = "classCode/misconfigured";
        throw err;
      }

      // 2) สร้างผู้ใช้ใน Firebase Auth
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 3) บันทึก profile ใน Firestore (collection: students)
      const ref = doc(firestore, "students", user.uid);
      await setDoc(ref, {
        ...profile,
        email,
        classCode: profile.classCode,
        experimentGroup: classData.experimentGroup, // ⬅ กลุ่ม A / B ติดไว้ที่ student
        classGroupId: classRef.id, // ⬅ ไว้อ้างอิงย้อนกลับ (optional)
        classGroupName: classData.name ?? null, // optional: ชื่อห้อง
        createdAt: serverTimestamp(),
      });

      // 4) แนบ session ให้ server (cookie ผ่าน API route)
      const idToken = await getIdToken(user, true);
      await $fetch("/api/auth/session", {
        method: "POST",
        body: { idToken },
      });

      return user;
    } catch (e) {
      const err = e as any;
      console.error("[registerWithProfile] error:", err);
      // โยน error ต่อไปให้ Register.vue ตัดสินใจแสดงข้อความ
      throw err;
    }
  }

  /** login ปกติ + แนบ session ให้ Nuxt */
  async function loginAndAttachSession(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await getIdToken(user, true);
    await $fetch("/api/auth/session", { method: "POST", body: { idToken } });
    return user;
  }

  async function logoutSession() {
    await $fetch("/api/auth/logout", { method: "POST" });
    await auth.signOut();
  }

  async function fetchCurrentProfile() {
    const user = auth.currentUser;
    if (!user) return null;
    const snap = await getDoc(doc(firestore, "students", user.uid));
    return snap.exists() ? snap.data() : null;
  }

  return {
    registerWithProfile,
    loginAndAttachSession,
    logoutSession,
    fetchCurrentProfile,
  };
}
