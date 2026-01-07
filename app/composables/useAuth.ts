import { useNuxtApp } from "#app";
import {
  signInWithEmailAndPassword,
  getIdToken,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuthState } from "./useAuthState";

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

type CompleteProfilePayload = {
  firstName: string;
  lastName: string;
  sex: "ชาย" | "หญิง" | "";
  age: number;
  grade: string;
  school: string;
  classCode: string;
  pdpa: boolean;
};

function extractApiCode(err: any): string | undefined {
  // Nuxt $fetch errors often look like: err.data = { statusCode, statusMessage, data: { code } }
  return err?.data?.data?.code || err?.data?.code || err?.cause?.data?.data?.code;
}

export function useFirebaseSession() {
  const nuxtApp = useNuxtApp();

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

  const $firebase = nuxtApp.$firebase as { auth: any; firestore: any } | undefined;
  if (!$firebase) throw new Error("Firebase plugin not initialized.");

  const { auth } = $firebase;

  async function registerWithProfile(payload: RegisterPayload) {
  const { email, password, ...profile } = payload;

  // 1) ask server to create user + profile
  await $fetch("/api/auth/register", {
    method: "POST",
    body: { email, password, ...profile },
  });

  // 2) sign in on client (you already have email/password)
  const { user } = await signInWithEmailAndPassword(auth, email, password);

  // 3) attach session cookie
  const idToken = await getIdToken(user, true);
  await $fetch("/api/auth/session", { method: "POST", body: { idToken } });

  const { refreshAuth } = useAuthState();
  await refreshAuth();


  return user;
}

async function attachSession(user: any) {
    const idToken = await getIdToken(user, true);
    await $fetch("/api/auth/session", { method: "POST", body: { idToken } });

    const { refreshAuth } = useAuthState();
    await refreshAuth();
  }

  async function loginWithGoogleAndAttachSession() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      // ✅ best on desktop
      const { user } = await signInWithPopup(auth, provider);
      await attachSession(user);
      return user;
    } catch (e: any) {
      // 🔁 fallback for popup-blocked browsers (often Safari / strict settings)
      if (
        e?.code === "auth/popup-blocked" ||
        e?.code === "auth/popup-closed-by-user" ||
        e?.code === "auth/cancelled-popup-request"
      ) {
        await signInWithRedirect(auth, provider);
        return null;
      }
      throw e;
    }
  }

  async function completeGoogleRedirectIfAny() {
    const result = await getRedirectResult(auth);
    if (!result?.user) return null;

    await attachSession(result.user);
    return result.user;
  }

  async function loginAndAttachSession(email: string, password: string) {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await getIdToken(user, true);
    await $fetch("/api/auth/session", { method: "POST", body: { idToken } });

    const { refreshAuth } = useAuthState()
    await refreshAuth();

    return user;
  }

  async function completeProfile(payload: CompleteProfilePayload) {
    // user must already have session cookie (after google sign-in)
    await $fetch("/api/auth/profile", {
      method: "POST",
      body: payload,
    });

    const { refreshAuth } = useAuthState();
    await refreshAuth();
  }

  async function logoutSession() {
    await $fetch("/api/auth/logout", { method: "POST" });
    await auth.signOut();

    const { refreshAuth } = useAuthState();
    await refreshAuth();
  }

  async function fetchCurrentProfile() {
    // optional: you can fetch from your own endpoint using cookie instead of firestore client
    return null;
  }

  return {
    registerWithProfile,
    loginAndAttachSession,
    loginWithGoogleAndAttachSession,
    completeGoogleRedirectIfAny,
    completeProfile, // ✅ NEW
    logoutSession,
    fetchCurrentProfile,
  };
}
