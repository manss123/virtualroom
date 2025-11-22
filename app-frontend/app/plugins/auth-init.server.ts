export default defineNuxtPlugin(async (nuxtApp) => {
  const { user, ready } = useAuth();
  const config = useRuntimeConfig();
  if (ready.value) return;
  try {
    const headers = useRequestHeaders(["cookie"]); // ส่ง cookie ไป backend
    const r = await $fetch(`${config.public.apiBase}/auth/me`, {
      headers,
      credentials: "include",
    });
    user.value = r?.user ?? null;
  } catch {
    user.value = null;
  } finally {
    ready.value = true;
  }
});
