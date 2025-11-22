import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to) => {
  // whitelist หน้า public (เช่น หน้า login/register)
  const publicPages = new Set(['/'])
  if (publicPages.has(to.path)) return

  const { ensure, user } = useAuth()
  const ok = await ensure()
  if (!ok) return navigateTo('/')
})