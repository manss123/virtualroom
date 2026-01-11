export default defineNuxtRouteMiddleware(async (to) => {
  // Only guard teacher pages
  if (!to.path.startsWith("/teacher")) return;

  // Ask server for the current user (trust server, not client state)
  const me = await $fetch<any>("/api/auth/me").catch(() => null);

  // Your current "teacher list" logic (replace with role later if you add roles)
  const teacherEmails = new Set([
    "chinapat2535@gmail.com",
    "monamorn.research@gmail.com",
    "virtual360room@gmail.com",
  ]);

  const email = String(me?.email ?? "").toLowerCase();
  const isTeacher = teacherEmails.has(email);

  if (!isTeacher) {
    // redirect students away
    return navigateTo("/dashboard");
  }
});
