// middleware/guest.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const { ensure, user } = useAuth();
  await ensure();
  if (to.path === "/" && user.value)
    return navigateTo("/pdpa", { replace: true });
});
