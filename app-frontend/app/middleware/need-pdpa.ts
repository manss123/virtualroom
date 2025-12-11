// // middleware/need-pdpa.ts
// import { useAuth } from "~/composables/useAuth";

// export default defineNuxtRouteMiddleware(async (to) => {
//   const { ensure, user } = useAuth();
//   const ok = await ensure();
//   if (!ok) return navigateTo("/", { replace: true });

//   if (!user.value?.pdpaAccepted && to.path !== "/pdpa") {
//     return navigateTo("/pdpa", { replace: true });
//   }
// });
