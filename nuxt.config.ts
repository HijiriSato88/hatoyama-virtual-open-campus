// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/base.css'],
  runtimeConfig: {
    public: {
      unityBaseUrl: process.env.NUXT_PUBLIC_UNITY_BASE_URL || ''
    }
  }
})
