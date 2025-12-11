// middleware/auth.ts (route middleware)
export default defineNuxtRouteMiddleware(async (_to, _from) => {
  try {
    await $fetch("/api/auth/me");
  } catch {
    return navigateTo("/"); // หรือหน้า Login
  }
});
