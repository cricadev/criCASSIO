// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt"
  ],
  colorMode: {
    classSuffix: ''
  },
  routeRules: {
    '/': {
      redirect: '/calculator'
    }

  }
})