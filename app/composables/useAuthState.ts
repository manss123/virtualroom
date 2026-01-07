// composables/useAuthState.ts
import { computed } from "vue";

type MeResponse = {
  uid: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
};

type ProgressState = {
  postTestDone?: boolean;
};

export function useAuthState() {
  // shared state across app
  const me = useState<MeResponse | null>("auth:me", () => null);
  const progress = useState<ProgressState | null>("auth:progress", () => null);

  const authStatus = computed(() => (me.value?.uid ? "authed" : "guest"));

  const displayName = computed(() => {
    const fn = me.value?.firstName ?? "";
    const ln = me.value?.lastName ?? "";
    const full = `${fn} ${ln}`.trim();
    return full || me.value?.email || "Student";
  });

  const postTestDone = computed(() => !!progress.value?.postTestDone);

  async function refreshAuth() {
    try {
      // IMPORTANT: $fetch uses current cookies immediately
      me.value = await $fetch<MeResponse>("/api/auth/me");
    } catch {
      me.value = null;
    }

    try {
      progress.value = await $fetch<ProgressState>("/api/progress");
    } catch {
      progress.value = null;
    }
  }

  function clearAuth() {
    me.value = null;
    progress.value = null;
  }

  return { me, progress, authStatus, displayName, postTestDone, refreshAuth, clearAuth };
}
