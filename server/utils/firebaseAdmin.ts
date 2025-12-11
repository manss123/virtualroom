// server/utils/firebaseAdmin.ts
import {
  initializeApp,
  getApps,
  cert,
  AppOptions,
  applicationDefault,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const isProd = process.env.NODE_ENV === "production";

if (!getApps().length) {
  let options: AppOptions = {};

  if (isProd) {
    // --- PRODUCTION / NITRO START / APP HOSTING ---
    const json = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (json) {
      // ✅ Use explicit service account from env (old behaviour)
      try {
        const serviceAccount = JSON.parse(json);
        options = {
          credential: cert(serviceAccount),
          projectId: serviceAccount.project_id,
        };
      } catch (err) {
        console.error(
          "[firebaseAdmin] Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY",
          err
        );
        throw err;
      }
    } else {
      // ✅ No explicit key → fall back to Application Default Credentials
      console.warn(
        "[firebaseAdmin] FIREBASE_SERVICE_ACCOUNT_KEY is missing. " +
          "Falling back to applicationDefault() credentials."
      );

      options = {
        credential: applicationDefault(),
      };

      const projectId =
        process.env.FB_ADMIN_PROJECT_ID ||
        process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID;
      if (projectId) {
        options.projectId = projectId;
      }
    }
  } else {
    // --- DEV / EMULATOR BRANCH (unchanged idea) ---
    process.env.FIREBASE_AUTH_EMULATOR_HOST ??= "127.0.0.1:9099";
    process.env.FIRESTORE_EMULATOR_HOST ??= "127.0.0.1:8080";

    const projectId =
      process.env.FB_ADMIN_PROJECT_ID ||
      process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID ||
      "virtual360-room";

    options = {
      projectId,
      // credential omitted → fine for emulator
    };

    console.log(
      "[firebaseAdmin] Init in DEV with emulator. projectId =",
      projectId
    );
  }

  initializeApp(options);
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();
