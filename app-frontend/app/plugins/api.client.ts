import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
import { ofetch, type $Fetch } from 'ofetch'

export default defineNuxtPlugin(() => {
  const { public: { apiBase } } = useRuntimeConfig()

  const api = ofetch.create({
    baseURL: apiBase,
    credentials: 'include',
    retry: 0,
  })

  return { provide: { api } }
})

declare module 'nuxt/app' {
  interface NuxtApp { $api: $Fetch }
}
declare module 'vue' {
  interface ComponentCustomProperties { $api: $Fetch }
}
