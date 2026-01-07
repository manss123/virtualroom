// plugins/firebase.client.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

export default defineNuxtPlugin(() => {
  const config = {
    apiKey: useRuntimeConfig().public.firebaseApiKey,
    authDomain: useRuntimeConfig().public.firebaseAuthDomain,
    projectId: useRuntimeConfig().public.firebaseProjectId,
  };

  const app = getApps().length ? getApps()[0] : initializeApp(config);

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  // ✅ DEV: connect emulators
  if (import.meta.dev) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(firestore, "127.0.0.1", 8080);
  }

  return {
    provide: {
      firebase: { auth, firestore },
    },
  };
});
