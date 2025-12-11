import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

export default defineNitroPlugin(() => {
  if (!getApps().length) {
    initializeApp({ credential: applicationDefault() });
  }
});
