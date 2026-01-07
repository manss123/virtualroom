import { useAuthState } from "~/composables/useAuthState";

// plugins/auth-init.client.ts
export default defineNuxtPlugin(async () => {
  const { refreshAuth } = useAuthState();
  await refreshAuth();
});
