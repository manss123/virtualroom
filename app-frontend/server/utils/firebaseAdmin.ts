// server/utils/firebaseAdmin.ts
import { initializeApp, getApps, cert, AppOptions } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const isProd = process.env.NODE_ENV === "production";

if (!getApps().length) {
  let options: AppOptions = {};

  if (isProd) {
    const json = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!json) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is missing");
    }
    const serviceAccount = JSON.parse(json);
    options = {
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id, // 👈 explicit
    };
  } else {
    // 🧪 DEV + EMULATOR
    process.env.FIREBASE_AUTH_EMULATOR_HOST ??= "127.0.0.1:9099";
    process.env.FIRESTORE_EMULATOR_HOST ??= "127.0.0.1:8080";

    const projectId =
      process.env.FB_ADMIN_PROJECT_ID ||
      process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID ||
      "virtual360-room";

    options = {
      projectId, // 👈 THIS is what Firestore was missing
      // credential is optional for emulator
    };
  }

  initializeApp(options);
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();
