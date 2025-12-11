// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/ui"],
  css: ["~/assets/css/tailwind.css"],
  ssr: true,
  nitro: {
    preset: 'node-server'
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:4000",
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId:
        process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_MESUREMENT_ID,
    },
    firebaseAdmin: {
      projectId: process.env.FB_ADMIN_PROJECT_ID,
      clientEmail: process.env.FB_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FB_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100..900;1,100..900&display=swap",
        },
      ],
    },
  },
});
